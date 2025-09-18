import express from "express";
import cors from "cors";
import aiRoute from "./routes/AI.js"
import profileRoute from "./routes/Profile.js"
import sessionsRoute from "./routes/Sessions.js"


const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

//ai route for getting interview questions and reviewing answers
app.use("/ai", aiRoute);

//profiles route for managing user profiles in supabase
app.use("/profiles", profileRoute);

//sessions route for  managing practice interview sessions in supabase
app.use("/interview-sessions", sessionsRoute);

// Start server
app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
