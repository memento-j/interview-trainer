import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SR_KEY);

//creates interview session only using the questions 
export async function createSession(req,res) {
    //questions is string array "questions": ["...", "..."]
    const { questions, role, name } = req.body;

    if (!questions || !req.user.id || !role || !name ) {
        return res.status(400).json({ error: "Missing role, name, questions, or userID" });
    }
    //add session to sessions table
    const { data: sessionData, error: sessionError } = await supabase
        .from("interview_sessions")
        .insert({ 
            userId: req.user.id,
            name: name,
            role: role,
         })
        .select()  
    
    if (sessionError) {
        console.error(sessionError);
        return res.status(500).json({ error: sessionError.message });
    }

    const sessionId = sessionData[0].id;
    let questionIds = [];
    //add questions to questions table
    for (const question of questions) {
        const { data: questionData, error: questionError } = await supabase
            .from("questions")
            .insert({
                userId: req.user.id, 
                sessionId: sessionId,
                question,
            })
            .select();
    
        if (questionError) {
            console.error(questionError);
            return res.status(500).json({ error: questionError.message });
        }
    
        questionIds.push(questionData[0].id);
    }    
    return res.status(201).json({ sessionID: sessionId,  questionIDs: questionIds });
}

//get an indivdual session data
export async function getSessionData(req,res) {
    const { sessionId } = req.params;

    //session information
    const { data: sessionData, error: sessionError } = await supabase  
        .from("interview_sessions")  
        .select()
        .eq("sessionId", sessionId)

    if (sessionError) {
        console.error(sessionError);
        return res.status(500).json({ error: sessionError.message });
    }

    //questions information
    const { data: questionsData, error: questionsError } = await supabase  
        .from("questions")  
        .select()
        .eq("sessionId", sessionId)
        .order('createdat', { ascending: true })

    if (questionsError) {
        console.error(questionsError);
        return res.status(500).json({ error: questionsError.message });
    }

    //results information (answeers and feedback)
    const { data: resultsData, error: resultsError } = await supabase  
        .from("results")  
        .select()
        .eq("sessionId", sessionId)
        .order('createdat', { ascending: true })

    if (resultsError) {
        console.error(resultsError);
        return res.status(500).json({ error: resultsError.message });
    }

    return res.status(200).json({ sessionData, questionsData, resultsData });
}

//get all sessions created by a user
export async function getUserSessionsData(req,res) {

    //get all sessions
    const { data: sessionData, error: sessionError } = await supabase  
        .from("interview_sessions")  
        .select()
        .eq("userId", req.user.id) 
        .order('created_at', { ascending: false })
    if (sessionError) {
        console.error(sessionError);
        return res.status(500).json({ error: sessionError.message });
    }
    
    const userSessionsData = [];

    //using the session ids, get the questions and results data for each session 
    for (let i = 0; i < sessionData.length; i++) {
        //questions information
        const { data: questionsData, error: questionsError } = await supabase  
            .from("questions")  
            .select()
            .eq("sessionId", sessionData[i].id)
            .order('createdat', { ascending: true })

        if (questionsError) {
            console.error(questionsError);
            return res.status(500).json({ error: questionsError.message });
        }

        //results information (answeers and feedback)
        const { data: resultsData, error: resultsError } = await supabase  
            .from("results")  
            .select()
            .eq("sessionId", sessionData[i].id)
            .order('createdat', { ascending: true })

        if (resultsError) {
            console.error(resultsError);
            return res.status(500).json({ error: resultsError.message });
        }

        const currentSession = {
            "sessionData" : sessionData[i],
            "questionsData": questionsData,
            "resultsData": resultsData
        }

        userSessionsData.push(currentSession);
    }

    return res.status(200).json( { userSessionsData } );
}

//for appending information session_data (answers and feedback)
export async function updateSession(req,res) {
    const { sessionId } = req.params;
    const { userId, questionId, answer, feedback } = req.body;

    //ensures there is at least one of the fields present
    if (!answer || !feedback  || !questionId || !userId) {
        return res.status(400).json({ error: "No progress data for the interview session provided" });
    }

    //get question text
    const { data: questionData, error: questionError } = await supabase
        .from("questions")
        .select()
        .eq("id", questionId)
    
    if (questionError) {
        console.error(questionError);
        return res.status(500).json({ error: questionError.message });
    }
    const question = questionData[0].question;

    // destructuring feedback from ai
    const { analysis: 
        {
          strengths,
          weaknesses,
          suggestions,
          tone,
          scores
        }
      } = feedback;
    
    //add result (sessionid, userid, question text, answer text, feedback (strengths, weaknesses, etc.))
    const { data: resultsData, error: resultsError } = await supabase
        .from("results")
        .insert({
            sessionId,
            userId,
            question,
            answer,
            strengths,
            weaknesses,
            suggestions,
            tone,
            scores
        })
        .select();

    if (resultsError) {
        console.error(resultsError);
        return res.status(500).json({ error: resultsError.message });
    }
    return res.status(200).json(resultsData);
}

//delete interview session
export async function deleteSession(req,res) {
    const { sessionId } = req.params;
    const { error } = await supabase
        .from("interview_sessions")
        .delete()
        .eq("id", sessionId)
  
    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.status(204).end()
}