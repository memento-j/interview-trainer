import OpenAI from "openai";
import dotenv from "dotenv";
import { z } from 'zod';
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SR_KEY);
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Schemas for open ai output
const questionsSchema = z.object({
    questions: z.array(z.string())
});
const feedbackSchema = z.object({
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    suggestions: z.array(z.string()),
    tone: z.array(z.string()),
    scores: z.object({
        clarity: z.number(),
        relevance: z.number(),
        confidence: z.number()
    }),
});
const userAnalysisSchema = z.object({
    totalSessions: z.number(),
    totalAnswers: z.number(),
    overallAverages: z.object({
        clarity: z.number(),
        relevance: z.number(),
        confidence: z.number(),
    }),
    toneInsights: z.object({
        mostCommonTone: z.string(),
        mostCommonCount: z.number(),
        frequencies: z.record(z.string(), z.number()),
    }),
    mostCommonStrengths: z.array(z.string()),
    mostCommonWeaknesses: z.array(z.string()),
    suggestions: z.array(z.string()),
});

//getting interview questions
export async function createQuestions(req,res) {
    try {
        const { questionCount, role } = req.body;
  
        if (!questionCount || !role) {
            return res.status(400).json({ error: "Missing questionCount or role" });
        }
        let prompt = "";

        //if user is looking for general interview questions
        if (role == "general") {
            prompt = `Generate ${questionCount} behavioral and situational interview questions for a general interview. The questions should be clear, professional and have some variance. Please return the questions as a JSON Object conforming to the following schema: ${JSON.stringify(questionsSchema.shape)}`
        } 
        //otherwise, the prompt will be role-specific
        else {
            prompt = `Generate ${questionCount} interview questions for a ${role}. The questions should be clear and professional and include a mix of behavioral, situational, and technical (if applicable) questions related to the role. All of these questions must be able to only be answered verbally. Please return the questions as a JSON Object conforming to the following schema: ${JSON.stringify(questionsSchema.shape)}`
        }  

        const response = await client.chat.completions.create({
            model: "gpt-5-nano",
            messages: [
                { role: "system", content: "You are an AI that generates interview questions." },
                { role: "user", content: prompt }
            ],
            response_format: {type: "json_object"}
        });
        const content = response.choices[0].message.content;
        const data = JSON.parse(content);                  
        const questions = data.questions;
        res.status(200).json({ questions });

    } catch (err) {
        console.error("Interview Question API error:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
}

// analyzing user answers to interview questions
export async function analyzeAnswer(req,res) {
    try {
        const { question, answer } = req.body;

        if (!question || !answer) {
            return res.status(400).json({ error: "Missing question or answer" });
        }

        const prompt = `Analyze the following interview answer:
            Question: "${question}"
            Answer: "${answer}"
            Please return the answer feedback as a JSON Object conforming to the following schema: ${JSON.stringify(feedbackSchema.shape)}
            Tone should only be single words in each array such as "confident", "hesitant", "casual", "professional", "enthusiastic", etc. Multiple items per array are allowed.
            Strengths, weaknesses, and suggestions arrays should have up to 3 items each, with each item being exactly one concise sentence. 
            - Strengths: highlight what is clear, well-structured, or effective in the answer itself.
            - Weaknesses: focus only on parts of the answer that are unclear, incomplete, or could be improved, not the candidate's personality.
            - Suggestions: provide actionable advice to improve the answer's clarity, structure, or persuasiveness.
            For each attribute in scores, select a number between 1 and 10 based solely on the content of the answer for clarity, relevance, and confidence.`

        const response = await client.chat.completions.create({
            model: "gpt-5-nano",
            messages: [
                { role: "system", content: "You are an AI interview coach that analyzes responses to interview questions." },
                { role: "user", content: prompt }
            ],
            response_format: {type: "json_object"}
        });
        const content = response.choices[0].message.content;
        const analysis = JSON.parse(content);  
        console.log(analysis);
        res.status(200).json({ analysis });
    } catch (err) {
        console.error("Interview Question Feedback API error:", err);
        res.status(500).json({ error: "Something went wrong" });        
    }
}

async function getStoredAnalysis(userId) {
    const { data: profileAnalysis, error } = await supabase
        .from("profiles")
        .select("totalSessions, totalAnswers, overallAverages, toneInsights, mostCommonStrengths, mostCommonWeaknesses, suggestions")
        .eq("id", userId)
        .single();

    if (error) {
        console.log("error getting profile analysis", error);
        throw error;
    }

    return {
        totalSessions: profileAnalysis.totalSessions,
        totalAnswers: profileAnalysis.totalAnswers,
        overallAverages: profileAnalysis.overallAverages,
        toneInsights: profileAnalysis.toneInsights,
        mostCommonStrengths: profileAnalysis.mostCommonStrengths,
        mostCommonWeaknesses: profileAnalysis.mostCommonWeaknesses,
        suggestions: profileAnalysis.suggestions,
    };
}

async function getSessionsCounts(userId) {
    //count the number of sessions for this user id
    const { count: interviewSessionCount, error: interviewSessionError } = await supabase
        .from("interview_sessions")
        .select("*", { count: "exact" })
        .eq("userId", userId);

    if (interviewSessionError) {
        console.error(interviewSessionError);
    }

    //get the profiles.totalSessions row
    const { data: profilesSessionCount, error: profilesError } = await supabase
        .from("profiles")
        .select("totalSessions")
        .eq("id", userId)
        .single()

    if (profilesError) {
        console.error(profilesError);
    }

    return { 
        interviewSessionCount: interviewSessionCount, 
        profilesSessionCount: profilesSessionCount.totalSessions 
    }
}

//getting user analytics based on their completed sessions
export async function analyzeUserSessions(req,res) {
    try {
        const { userSessions, userId } = req.body;
        const { interviewSessionCount, profilesSessionCount } = await getSessionsCounts(userId);

        //profile analysis is currently available in the db, 
        // AND the interviewsession table session count matches the profiles table session count 
        if (profilesSessionCount !== null && interviewSessionCount === profilesSessionCount) {
            const analysis = await getStoredAnalysis(userId);
            return res.status(200).json(analysis);    
        }
        
        //gets only the data needed for each session to reduce the tokens used per request
        const releventSessionsDataList = userSessions.map(session => ({
            sessionName: session.sessionData.name,
            date: session.sessionData.created_at,
            results: session.resultsData.map(r => ({
                question: r.question,
                answer: r.answer,
                scores: r.scores,
                strengths: r.strengths,
                weaknesses: r.weaknesses,
                tone: r.tone
            }))
        }));
        // having issues with this returning the exact zod schema everytime, so i decided to hardcode
        // the schema into the prompt since it works way more often this way.
        const prompt = 
            `Analyze this user's past mock interview sessions and produce insights.

            User session data (JSON):
            ${JSON.stringify(releventSessionsDataList, null, 2)}

            Please return a JSON object that exactly matches the following schema:
            {
                "totalSessions": number,
                "totalAnswers": number,
                "overallAverages": {
                    "clarity": number,
                    "relevance": number,
                    "confidence": number
                },
                toneInsights: {
                    "mostCommonTone": string,
                    "mostCommonCount": number,
                    "frequencies": { "<tone>": number }
                },
                "mostCommonStrengths": [string, string, string],
                "mostCommonWeaknesses": [string, string, string],
                "suggestions": [string, string, string, string, string]
            }

            Do not include any extra keys or explanation. Return only valid JSON.`;

        const response = await client.chat.completions.create({
            model: "gpt-5-mini",
            messages: [
                { role: "system", content: "You are an expert analytics engine for mock interview performance." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" }
        });

        const analysis = userAnalysisSchema.parse(JSON.parse(response.choices[0].message.content));
        
        //store new analysis for this user profile in db
        const { error: profileUpdateError } = await supabase
            .from("profiles")
            .update({
                totalSessions: analysis.totalSessions,
                totalAnswers: analysis.totalAnswers,
                overallAverages: analysis.overallAverages,
                toneInsights: analysis.toneInsights,
                mostCommonStrengths: analysis.mostCommonStrengths,
                mostCommonWeaknesses: analysis.mostCommonWeaknesses,
                suggestions: analysis.suggestions,
                updatedAt: new Date().toISOString(),
            })
            .eq("id", userId)

        if (profileUpdateError) {
            console.log("error adding analysis to profiles table", profileUpdateError);
        }
        res.status(200).json(analysis);
    } catch (error) {
        console.error("User sessions analysis API error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
}