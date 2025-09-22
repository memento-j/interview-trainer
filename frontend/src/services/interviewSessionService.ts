import axios from "axios";

export async function createInterviewSession({
    user,
    session,
    role,
    selectedOption,
    questionSource,
    aiQuestionCount,
    providedQuestions,
}: {
    user: any;
    session: any;
    role: string;
    selectedOption: string;
    questionSource: string;
    aiQuestionCount: string;
    providedQuestions: string[];
}) {
    //if there is a user, store in db 
    if (user) {
        //if the user wants their questions to be AI generated, then generate the questions and store session in db
        if (questionSource === "ai-generated") {
            //generate questions
            const aiResponse = await axios.post("http://localhost:8080/ai/interview-questions", {
                questionCount: aiQuestionCount,
                role: selectedOption === "general" ? "general" : role,
                });
            const generatedQuestions = aiResponse.data.questions;
            //create interview sesson in  db using the generated questions and role
            const dbResponse = await axios.post("http://localhost:8080/interview-sessions",
                {
                    questions: generatedQuestions,
                    role: selectedOption === "general" ? "general" : role,
                },
                {
                    headers: { Authorization: `Bearer ${session?.access_token}` },
                }
            );
            //return the created interview session's session ID 
            return { sessionId: dbResponse.data };
        } 
        //simply store the session in db
        else {
            //create interview sesson in db using the provided questions and role
            const dbResponse = await axios.post("http://localhost:8080/interview-sessions",
                {
                    questions: providedQuestions,
                    role: selectedOption === "general" ? "general" : role,
                },
                {
                    headers: { Authorization: `Bearer ${session?.access_token}` },
                }
            );
            //return the created interview session's session ID 
            return { sessionId: dbResponse.data };
        }
    } 
    //if no user, store the interview session in local storage instead
    else {
        //generate questions and store the questions and role in local storage
        if (questionSource === "ai-generated") {
            //generate questions
            const aiResponse = await axios.post("http://localhost:8080/ai/interview-questions", {
                questionCount: aiQuestionCount,
                role: selectedOption === "general" ? "general" : role,
            });
            const generatedQuestions = aiResponse.data.questions;
            //now store in local storage
            const interviewSession = {
                role: selectedOption === "general" ? "general" : role,
                questions: generatedQuestions,
                answers: [],
                feedback: [],
            };
            localStorage.setItem("interview_session", JSON.stringify(interviewSession));
            return { sessionId: "" };
        } 
        //simply store the provided questions and role in local storage
        else {
            const interviewSession = {
                role: selectedOption === "general" ? "general" : role,
                questions: providedQuestions,
                answers: [],
                feedback: [],
            };
            localStorage.setItem("interview_session", JSON.stringify(interviewSession));
            return { sessionId: ""};
        }
    }
}