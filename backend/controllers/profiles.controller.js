import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SR_KEY);

// GET profile by ID
export async function getProfile(req, res) {  
  const { id } = req.params;
  
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
};

// UPDATE profile (username, first name , last name) based on the ID
export async function updateProfile(req, res) {
  const { id } = req.params;
  const { username, fname, lname } = req.body;

  if (!username || !fname || !lname) {
    return res.status(400).json({ error: "Missing username, first name, or last name" });
  }

  const { error } = await supabase
    .from("profiles")
    .update({ username: username, firstName: fname, lastName: lname, updatedAt: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(204).end();
};

// DELETE a profile based on the id
export async function deleteProfile(req, res) {
  const { id } = req.params;

  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(204).end();
};