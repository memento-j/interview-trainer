import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Initialize OpenAI client
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

//getting interview
router.post("/interview-questions", async (req, res) => {
    try {
        const { questionCount, role } = req.body;
  
        if (!questionCount || !role) {
            return res.status(400).json({ error: "Missing questionCount or role" });
        }
        let prompt = "";

        //if user is looking for general interview questions
        if (role == "general") {
            prompt = `Generate ${questionCount} behavioral and situational interview questions for a general interview. The questions should be clear and professional. 
            Please provide your output strictly in JSON with this format:
            {
                "questions": [
                    "first question text",
                    "second question text",
                    "third question text"
                ]
            }
            Do not include anything else—no explanations, no numbering, just valid JSON.` 
        } 
        //otherwise, the prompt will be role-specific
        else {
            prompt = `Generate ${questionCount} interview questions for a ${role}. The questions should be clear and professional and include a mix of behavioral, situational, and technical (if applicable) questions related to the role. All of these questions must be able to only be answered verbally. Please provide your output strictly in JSON with this format:
            {
                "questions": [
                    "first question text",
                    "second question text",
                    "third question text"
                ]
            }
            Do not include anything else—no explanations, no numbering, just valid JSON.` 
        }  

        const response = await client.chat.completions.create({
            model: "gpt-5-nano",
            messages: [
                { role: "system", content: "You are an AI that generates interview questions." },
                { role: "user", content: prompt }
            ]
        });
        const content = response.choices[0].message.content;
        const data = JSON.parse(content);                  
        const questions = data.questions;
        console.log(questions);
        res.status(200).json({ questions });

    } catch (err) {
        console.error("Interview Question API error:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

// analyzing user answers to interview questions
router.post("/answer-analysis", async (req, res) => {
    try {
        const { question, answer } = req.body;
  
        if (!question || !answer) {
            return res.status(400).json({ error: "Missing question or answer" });
        }

        const prompt = `Analyze the following interview answer:
            Question: "${question}"
            Answer: "${answer}"

            Provide feedback in exactly 6 fields in valid JSON. The tone can be multiple things not only 1, and each category (strengths, weaknesses, suggestions, summary) should have 3 lines. 
            Example:
            {
                "strengths": ["...", "...", "..."],
                "weaknesses": ["...", "...", "..."],
                "tone": ["confident", "hesitant", "casual", "professional", "enthusiastic", "other"],
                "suggestions": ["...", "...", "..."],
                "scores": {
                    "clarity": 0-10,
                    "relevance": 0-10,
                    "confidence": 0-10
                }
                "summary": ["...", "...", "..."]
            }
            Do not include explanations outside of the JSON.`

        const response = await client.chat.completions.create({
            model: "gpt-5-nano",
            messages: [
                { role: "system", content: "You are an AI interview coach that analyzes responses to interview questions." },
                { role: "user", content: prompt }
            ]
        });
        const content = response.choices[0].message.content;
        const analysis = JSON.parse(content);  
        console.log(analysis);
        res.status(200).json({ analysis });

    } catch (err) {
        console.error("Interview Question Feedback API error:", err);
        res.status(500).json({ error: "Something went wrong" });        
    }
});

export default router;