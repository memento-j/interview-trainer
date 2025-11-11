import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export function useCurrentSession(sessionId: string, userId?: string, token?: string) {
    return useQuery({
        queryKey: ["sessionData", sessionId],
        queryFn: async () => {
            //if user is signed in, fetch from db
            if (userId) {
                const res = await axios.get(`${apiUrl}/interview-sessions/${sessionId}`, 
                {
                    headers: { Authorization: `Bearer ${token}` },
                    data: { id: userId }
                });                
                return res.data;
            }
            //otherwise, just fetch from  local storage
            else {                
                const currentSession = localStorage.getItem("interview_session") || "";
                const currentSessionJSON = JSON.parse(currentSession);                                
                return currentSessionJSON;
            }
        },
        refetchInterval: (latestData) => {
            if (userId) {
                //ensure data is fetched first
                if (!latestData.state.data) {
                    return false;  
                }
                //ensure feedback has been added to every question before stopping the interval
                const feedbackDone = latestData.state.data.resultsData.length == latestData.state.data.questionsData.length;
                return feedbackDone ? false : 3000;
            }
            else {
                //ensure feedback has been added to every question in local storaage before stopping the interval
                const currentSession = localStorage.getItem("interview_session") || "";
                const currentSessionJSON = JSON.parse(currentSession);
                const feedbackDone = currentSessionJSON.questions.length == currentSessionJSON.feedback.length;
                return feedbackDone ? false : 3000;    
            }
        },
        //refetches even when the user switches taabs
        refetchIntervalInBackground: true,
        // cache valid for 5 minutes
        staleTime: 1000 * 60 * 5
    });
}