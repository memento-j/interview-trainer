import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SR_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
const router = express.Router();

/* 
interview sessions data is stored in json:
* will be ordered by index (ex: index 0 has first question, reponse, and feedback)

"session_data" : 
    {
        "questions": ["...", "..."]
        "responses": ["...", "..."]
        "feedback": ["...", "..."]
    }
*/

//creates interview session only using the questions 
router.post("/", async (req,res) => {
    //questions is string array "questions": ["...", "..."]
    const { questions, userID } = req.body;

    if (!questions || !userID) {
        return res.status(400).json({ error: "Missing questions or userID" });
    }

    const { data, error } = await supabase
        .from("interview_sessions")
        .insert({ 
            user_id: userID,
            session_data: {
                questions: questions,
                answers: [],
                feedback: []
            }
         })
        .select()        

    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ sessionID: data[0].id });
});

//get an indivdual session
router.get("/:id", async (req,res) => {
    const { id } = req.params;

    const { data, error } = await supabase  
        .from("interview_sessions")  
        .select()
        .eq("id", id)
        .single()

    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
    
    return res.status(200).json(data);
});

//get all sessions created by a user
router.get("/user/:userID", async (req,res) => {
    const { userID } = req.params;
    
    const { data, error } = await supabase  
        .from("interview_sessions")  
        .select()
        .eq("user_id", userID)
        .order('created_at', { ascending: false })

    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
    
    return res.status(200).json(data);
});

//for allowing the user to update the name of their interview session
router.patch("/:id/name", async (req,res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    if (!name) {
        return res.status(400).json({ error: "Missing name" });
    }
  
    const { data, error } = await supabase
        .from("interview_sessions")
        .update({ name: name })
        .eq("id", id)
        .select();
  
    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
  
    return res.status(200).json(data[0]);
  });

//for appending information session_data (answers and feedback)
router.patch("/:id/progress", async (req,res) => {
    const { id } = req.params;
    const { answer, feedback } = req.body;

    //ensures there is at least one of the fields present
    if (!answer || !feedback) {
        return res.status(400).json({ error: "No progress data for the interview session provided" });
    }

    //get the current session data
    const { data, error } = await supabase
        .from("interview_sessions")
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
        .from("interview_sessions")
        .update({ session_data: updatedSession })
        .eq("id", id)
        .select();

    if (updateError) {
        return res.status(500).json({ error: updateError.message });
    } 

    return res.status(200).json(updatedData[0]);

});

//delete interview session
router.delete("/:id", async (req,res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from("interview_sessions")
        .delete()
        .eq("id", id)
  
    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.status(204).end()
});

export default router;