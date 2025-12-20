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
const feedbackSchema = z.object({
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    suggestions: z.array(z.string()),
    tone: z.array(z.string()),
    scores: z.object({
        clarity: z.number(),
        relevance: z.number(),
        confidence: z.number(),
        structure: z.number(),
        impact: z.number(),
        conciseness: z.number(),
    }),
    scoresSummary: z.string(),
    deliveryTone: z.object({
        positive: z.number(),
        neutral: z.number(),
        negative: z.number(),
        summary: z.string()
    }),
    skillsDetected: z.array(z.string()),
    overallSummary: z.string()
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
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const send = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    try {
        const { questionCount, role, jobDescription } = req.query;
  
        if (!questionCount || !role) {
            return res.status(400).json({ error: "Missing questionCount or role" });
        }
        
        send({ status: "started", message: "Started Question Generation..." });

        let prompt = "";
        let outputFormat = "Return as a JSON object ex: questions: [ Question1, Question2, Questions3, etc]"

        //if user is looking for general interview questions
        if (role === "general") {
        prompt = `Generate ${questionCount} behavioral and situational interview questions for a general interview. The questions should be clear, professional, and have some variance. ${outputFormat}`;
        } 
        else {
            prompt = jobDescription
                //role and job description provided
                ? `Generate ${questionCount} interview questions for a ${role} tailored to this job description: ${jobDescription}. Each question should be professional and clear. ${outputFormat}`
                //only role provided
                : `Generate ${questionCount} interview questions for a ${role}. Each question should be professional and clear. ${outputFormat}`;
        }

        const stream = await client.chat.completions.create({
            model: "gpt-5-nano",
            messages: [
                { role: "system", content: "You are an AI assitant that has generated thousands of interview questions to help users land their dream roles." },
                { role: "user", content: prompt }
            ],
            response_format: {type: "json_object"},
            stream: true
        });

        let fullText = ""
        let generatedQuestionCount = 0

        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            //write the content to the stream if it exists
            if (content) {
                res.write(`data: ${JSON.stringify({ content })}\n\n`);
                //used to count the number of questions generated so far to display on the frontend
                //questions are ended with ",\n while the last question in the array doesnt have the comma
                if (content.includes("\",\n") || content.includes("\"\n")) {
                    generatedQuestionCount += 1
                    send({ 
                        status: "questionComplete", 
                        message: `Question ${generatedQuestionCount} complete`
                    })
                }
                fullText += content;
            }
        }
        const parsed = JSON.parse(fullText);
        res.write(`data: ${JSON.stringify({ status: "complete", questions: parsed.questions })}\n\n`);
        res.end();

    } catch (err) {
        console.error("Interview Question API error:", err);
        res.status(500).json({ error: "Something went wrong" });
        res.end();
    }
}

// analyzing user answers to interview questions
export async function analyzeAnswer(req,res) {
    try {
        const { question, answer } = req.body;

        if (!question || !answer) {
            return res.status(400).json({ error: "Missing question or answer" });
        }
        // having issues with this returning the exact zod schema everytime, so i decided to hardcode
        // the schema into the prompt since it works way more often this way.
        const prompt = `Analyze the following interview answer:
            Question: "${question}"
            Answer: "${answer}"
            Please return the answer feedback as a JSON Object conforming to the following schema: 
            
            {
                "strengths": [string, string, string],
                "weaknesses": [string, string, string],
                "suggestions": [string, string, string],
                "tone": [string, string, ...],
                "scores": {
                    "clarity": number,
                    "relevance": number,
                    "confidence": number,   
                    "structure": number,
                    "impact": number,
                    "conciseness": number,
                },
                "scoresSummary": string;
                "deliveryTone": {
                    "positive": number,
                    "neutral": number,
                    "negative": number,
                    "summary: string
                }
                "skillsDetected": [string, string, ...],
                "overallSummary": string
            }

            Each element in the Tone array should only be single words such as "confident", "hesitant", "casual", "professional", "enthusiastic", etc. Multiple items per array are allowed.

            Strengths, weaknesses, and suggestions arrays should have up to 3 items each, with each item being exactly one concise sentence.  
            - Strengths: highlight what is clear, well-structured, or effective in the answer itself.  
            - Weaknesses: focus only on parts of the answer that are unclear, incomplete, or could be improved — not the candidate's personality.  
            - Suggestions: provide actionable advice to improve the answer's clarity, structure, or persuasiveness.  

            For each attribute in **scores**, select a number between 1 and 10 based solely on the content of the answer for clarity, relevance, confidence, structure, impact, and conciseness.
            - **Clarity:** Measures how easy the answer is to understand and whether ideas are expressed in a clear, logical way.  
            Example: 10 = highly articulate and easy to follow, 1 = confusing or vague.

            - **Relevance:** Evaluates how directly the response addresses the question and stays on topic.  
            Example: 10 = fully focused on the question, 1 = mostly irrelevant or off-track.

            - **Confidence:** Reflects how assertive, composed, and self-assured the answer sounds in tone and wording.  
            Example: 10 = speaks with authority and conviction, 1 = uncertain or hesitant.

            - **Structure:** Measures the organization of the response — how well it follows a logical order (e.g., situation → action → result).  
            Example: 10 = well-structured with smooth flow, 1 = disorganized or scattered.

            - **Impact:** Evaluates how memorable, persuasive, or powerful the overall answer is.  
            Example: 10 = leaves a strong impression or clear takeaway, 1 = bland or forgettable.

            - **Conciseness:** Measures how well the candidate avoids rambling and stays on point while still providing enough detail.  
            Example: 10 = concise and to the point if the answer requires it. Can be wordy if the answer requires elaboration. 1 = overly wordy, repetitive, or unfocused.

            After assigning the scores, include a short "scoresSummary" string (1-2 sentences) that briefly explains the candidate's overall performance based on only the scores.  
            For example: “The answer was clear and confident but lacked depth and strong impact.”

            For **skillsDetected**, list both soft and hard skills that can be reasonably inferred from the answer (e.g., teamwork, leadership, data analysis, communication). If there are none though, this can be an empty array. 

            For deliveryTone, assign percentage values (0-100) to positive, neutral, and negative tones based on how the answer sounds overall. Values are allowed to be 0 as long as  they all add up to 100. The three values should together total 100%.
            - summary: one sentence summarizing how the answer was delivered — for example, “The delivery felt upbeat and confident” or “The tone was uncertain but polite.” and something to potentially improve if needed.`

        const response = await client.chat.completions.create({
            model: "gpt-5-nano",
            messages: [
                { role: "system", content: "You are an AI interview coach that analyzes responses to interview questions." },
                { role: "user", content: prompt }
            ],
            response_format: {type: "json_object"}
        });
        const content = response.choices[0].message.content;
        const analysis = feedbackSchema.parse(JSON.parse(content));  
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
                "suggestions": [string, string, string, string, string, string]
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