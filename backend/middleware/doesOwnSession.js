import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SR_KEY
);

export async function doesOwnSession(req, res, next) { 
    //get the user sessionid from either params or the body   
    let { sessionId } = req.params;
    //if there is no valid id, return error
    if (!sessionId) {
        return res.status(400).json({ error: "Missing sessionID in request" });
    }

    //get the user id for the session
    const { data, error } = await supabase
        .from("interview_sessions")
        .select("userId")
        .eq("id", sessionId)
        .single();

    if (error) {
        console.error("Supabase error", error);
        return res.status(500).json({ error: questionError.message });
    }

    if (!data) {
        return res.status(404).json({ error: "Session not found" });
    }
    
    //compare the retrieved user id with the current authenticated user making the request
    if  (req.user.id !== data.userId) {
        return res.status(403).json({ error: "Forbidden: not your session" });
    }
    
    next();
}