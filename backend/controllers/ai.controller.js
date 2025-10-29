import OpenAI from "openai";
import dotenv from "dotenv";
import { z } from 'zod';

dotenv.config();

// Initialize OpenAI client
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Schemas for output
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