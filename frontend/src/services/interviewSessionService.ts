import axios from "axios";

export async function createInterviewSession(
    user: any,
    session: any,
    role: string,
    selectedOption: string,
    questionSource: string,
    aiQuestionCount: string,
    providedQuestions: string[],
    sessionName: string
) {
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
                    name: sessionName,
                    role: selectedOption === "general" ? "general" : role,
                },
                {
                    headers: { Authorization: `Bearer ${session?.access_token}` },
                }
            );
            //return the created interview session's session ID 
            return dbResponse.data;
        } 
        //simply store the session in db
        else {
            //create interview sesson in db using the provided questions and role
            const dbResponse = await axios.post("http://localhost:8080/interview-sessions",
                {
                    questions: providedQuestions,
                    name: sessionName,
                    role: selectedOption === "general" ? "general" : role,
                },
                {
                    headers: { Authorization: `Bearer ${session?.access_token}` },
                }
            );
            //return the created interview session's session ID 
            return dbResponse.data;
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
            return "";
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
            return "";
        }
    }
}

//get answer analysis, and pushes the answer and feedback to the database or localstorage
export async function handleAnswerSubmit(
    user: any,
    session: any,
    sessionID: string,
    answer: string,
    questionText: string,
    questionId: string
) {
    //analyze answer
    const aiResponse = await axios.post("http://localhost:8080/ai/answer-analysis", {
       question: questionText,
       answer: answer
    });
    const feedback = aiResponse.data;
    
    //update session in db with the answer and feedback
    if (user) {
        const updateDbResponse = await axios.patch(`http://localhost:8080/interview-sessions/${sessionID}/progress`, 
            {
                answer,
                feedback,
                questionId
            },
            {
                headers: { Authorization: `Bearer ${session?.access_token}` },
            }
        );
        console.log(updateDbResponse.data);
        console.log(updateDbResponse.status);
    }
    //update session in local storagee
    else {
        const oldSession = JSON.parse(localStorage.getItem("interview_session") || "");
        //appends new answer and feedback
        const updatedSession = {
            ...oldSession,
            answers: [...oldSession.answers, answer],
            feedback: [...oldSession.feedback, feedback]
        }
        localStorage.setItem("interview_session", JSON.stringify(updatedSession))
    }

}