import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type QuestionsData } from "@/types/QuestionData";



export function useCurrentQuestions(setupCompleted?: boolean, sessionId?: string, userId?: string, token?: string) {
    return useQuery({
        queryKey: ["sessionQuestions", sessionId],
        queryFn: async () => {
            //if user is signed in, fetch from db
            if (userId) {
                const res = await axios.get(`/interview-sessions/${sessionId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                let questionsData: QuestionsData[] = res.data.questionsData;
                let questions: {}[] = [];
                for (const questionData of questionsData) {
                    questions.push( {
                        "id": questionData.id,
                        "text": questionData.question
                    });
                }
                return questions;
            }
            //otherwise, just fetch from  local storage
            else {                
                const createdSession = localStorage.getItem("interview_session") || "";
                const createdSessionJSON = JSON.parse(createdSession);                                
                return createdSessionJSON.questions;
            }
        },
        //run only if thje setup is completed
        enabled: setupCompleted,
        // cache valid for 5 minutes
        staleTime: 1000 * 60 * 5
    });
}