import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SR_KEY);

//creates interview session only using the questions 
export async function createSession(req,res) {
    //questions is string array "questions": ["...", "..."]
    const { questions, role, name } = req.body;

    if (!questions || !req.user.id || !role ) {
        return res.status(400).json({ error: "Missing role, questions, or userID" });
    }
    //add session to sessions table
    const { data, error } = await supabase
        .from("interviewSessions")
        .insert({ 
            user_id: req.user.id,
            name: name,
            role: role,
            session_data: {
                questions: questions,
                answers: [],
                feedback: []
            }
         })
        .select()   
    //add session to user's interview sessions      

    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ sessionID: data[0].id });
}

//get an indivdual session
export async function getSession(req,res) {
    const { id } = req.params;

    const { data, error } = await supabase  
        .from("interviewSessions")  
        .select()
        .eq("id", id)
        .single()

    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
    
    return res.status(200).json(data);
}

//get all sessions created by a user
export async function getUserSessions(req,res) {
    const { data, error } = await supabase  
        .from("interviewSessions")  
        .select()
        .eq("userId", req.user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
}

//for appending information session_data (answers and feedback)
export async function updateSession(req,res) {
    const { id } = req.params;
    const { answer, feedback } = req.body;

    //ensures there is at least one of the fields present
    if (!answer || !feedback) {
        return res.status(400).json({ error: "No progress data for the interview session provided" });
    }

    //get the current session data
    const { data, error } = await supabase
        .from("interviewSessions")
        .select("session_data")
        .eq("id", id)
        .single();

    if (error) {
        return res.status(500).json({ error: error.message });
    }   

    //append the new data to the current session in a new object with the updated session info
    const updatedSession = {
        ...data.session_data,
        //.filter(Boolean) removes any null/undefined/false values in case that specific field is not provided
        answers: [...data.session_data.answers, answer].filter(Boolean),
        feedback: [...data.session_data.feedback, feedback].filter(Boolean),
    };
    
    //update the interview session data in the DB
    const { data: updatedData, error: updateError } = await supabase
        .from("interviewSessions")
        .update({ session_data: updatedSession })
        .eq("id", id)
        .select();

    if (updateError) {
        return res.status(500).json({ error: updateError.message });
    } 

    return res.status(200).json(updatedData[0]);

}

//delete interview session
export async function deleteSession(req,res) {
    const { id } = req.params;
    const { error } = await supabase
        .from("interviewSessions")
        .delete()
        .eq("id", id)
  
    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.status(204).end()
}