import express from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SR_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
const router = express.Router();

// created an SQL trigger in Supabase that automatically creates a profile when a user is created,
// so there is no need for a post route

//get profile by id
router.get("/:id", async (req,res) => {
    const { id } = req.params;

    const { data, error } = await supabase  
        .from("profiles")  
        .select()
        .eq("id", id)
        .single()

    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
    
    return res.status(200).json(data);
});

//update profile (username, first name , last name) based on the id 
router.patch("/:id", async (req,res) => {
    const { id } = req.params;
    const { username, fname, lname } = req.body;

    if (!username || !fname || !lname) {
        return res.status(400).json({ error: "Missing username, first name, or last name" });
    }

    const { error } = await supabase
        .from("profiles")
        .update({ username: username, first_name: fname, last_name: lname })
        .eq("id", id)

    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.status(204).end();
});

//delete a profile based on the id
router.delete("/:id", async (req,res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from("profiles")  
        .delete()  
        .eq("id", id)

    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    return res.status(204).end()
});

export default router;