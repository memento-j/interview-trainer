import axios from "axios";
import { useState } from "react";

export default function useInterviewSession() {
    const [ startedSessionCreation, setStartedSessionCreation] = useState<boolean>(false);
    const [ completedSessionCreation, setCompletedSessionCreation] = useState<boolean>(false);

    async function createInterviewSession(
        user: any,
        session: any,
        role: string,
        selectedOption: string,
        questionSource: string,
        generatedQuestions: string[],
        selectedPremadeQuestions: string[],
        providedQuestions: string[],
        sessionName: string,
        jobDescription: string
    ) {
        setStartedSessionCreation(true);
        switch (questionSource) {
            case "ai-generated":
                //create interview sesson in  db using the generated questions and role
                const aiGeneratedResponse = await axios.post(`/interview-sessions`,
                    {
                        questionType: questionSource,
                        questions: generatedQuestions,
                        name: user ? sessionName : "non-user-session",
                        role: selectedOption === "general" ? "general" : role,
                        userID: user ? user.id : null
                    },
                    //only provide headers when there is a user
                    user ? 
                        {
                            headers: { Authorization: `Bearer ${session?.access_token}` },
                        } 
                    : 
                        {}
                );
                setCompletedSessionCreation(true);
                //return the created interview session's session ID 
                return aiGeneratedResponse.data;

            case "preloaded":
                //remove extra text surrounding the question if this is question repractice
                let cleanQuestions: string[] = []
                if (role === "Question Repractice") {
                        cleanQuestions = selectedPremadeQuestions.map((question) => {
                        const questionText = question.charAt(0) === "❗" ? question.split("❗")[1].split("-")[0].trim() : question.split("-")[0].trim();
                        return questionText;
                    })                
                }
                //create interview sesson in db using the provided questions and role
                const preloadedResponse = await axios.post(`/interview-sessions`,
                    {
                        questionType: questionSource,
                        questions: role === "Question Repractice" ? cleanQuestions : selectedPremadeQuestions,
                        name: user ? sessionName : "non-user-session",
                        role: selectedOption === "general" ? "general" : role,
                        userID: user ? user.id : null
                    },
                    //only provide headers when there is a user
                    user ? 
                        {
                            headers: { Authorization: `Bearer ${session?.access_token}` },
                        } 
                    : 
                        {}
                );
                setCompletedSessionCreation(true);
                //return the created interview session's session ID 
                return preloadedResponse.data;

            case "provided":
                //create interview sesson in db using the provided questions and role
                const providedResponse = await axios.post(`/interview-sessions`,
                    {
                        questionType: questionSource,
                        questions: providedQuestions,
                        name: user ? sessionName : "non-user-session",
                        role: selectedOption === "general" ? "general" : role,
                        userID: user ? user.id : null
                    },
                    //only provide headers when there is a user
                    user ? 
                        {
                            headers: { Authorization: `Bearer ${session?.access_token}` },
                        } 
                    : 
                        {}
                );
                setCompletedSessionCreation(true);
                //return the created interview session's session ID 
                return providedResponse.data;

            case "job-description":
                //create interview sesson in  db using the generated questions and role
                const jobDescriptionResponse = await axios.post(`/interview-sessions`,
                    {
                        questionType: questionSource,
                        questions: generatedQuestions,
                        name: user ? sessionName : "non-user-session",
                        role,
                        jobDescription,
                        userID: user ? user.id : null
                    },
                    //only provide headers when there is a user
                    user ? 
                        {
                            headers: { Authorization: `Bearer ${session?.access_token}` },
                        } 
                    : 
                        {}
                );
                setCompletedSessionCreation(true);
                //return the created interview session's session ID 
                return jobDescriptionResponse.data;
        }
    }

    //get answer analysis, and pushes the answer and feedback to the database or localstorage
    async function handleAnswerSubmit(
        user: any,
        session: any,
        sessionID: string,
        answer: string,
        questionText: string,
        questionId: string
    ) {
        //analyze answer
        const aiResponse = await axios.post(`/ai/answer-analysis`, {
        question: questionText,
        answer: answer
        });
        const feedback = aiResponse.data;
        
        //update session in db with the answer and feedback
        if (user) {
            try {
                const updateDbResponse = await axios.patch(`/interview-sessions/${sessionID}/progress`, 
                    {
                        answer,
                        feedback,
                        questionId,
                        id: user.id
                    },
                    {
                        headers: { Authorization: `Bearer ${session?.access_token}` }
                    }
                );
                console.log(updateDbResponse.data);
                console.log(updateDbResponse.status);
            } catch (err) {
                console.log(err);
            }
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

    return { createInterviewSession, handleAnswerSubmit, startedSessionCreation, completedSessionCreation } 
}