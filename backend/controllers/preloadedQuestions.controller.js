import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SR_KEY);

export async function getPreLoadedQuestions(req, res) {
    const { data , error } = await supabase
    .from("preloaded_questions")
    .select("*")  

    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
    
    res.status(200).json(data);
}