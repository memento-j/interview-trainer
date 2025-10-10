import express from "express";
import cors from "cors";
import aiRouter from "./routes/ai.routes.js"
import profileRouter from "./routes/profiles.routes.js"
import sessionsRouter from "./routes/sessions.routes.js"
import preLoadedQuestionsRouter from "./routes/preloadedQuestions.routes.js";

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

//ai route for getting interview questions and reviewing answers
app.use("/ai", aiRouter);

//profiles route for managing user profiles in supabase
app.use("/profiles", profileRouter);

//sessions route for  managing practice interview sessions in supabase
app.use("/interview-sessions", sessionsRouter);

//route get retrieving preloaded questions from supabase
app.use("/preloaded-questions", preLoadedQuestionsRouter);

// Start server
app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
