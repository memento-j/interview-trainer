import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type SessionData } from "@/types/SessionData";
import { type ResultData } from "@/types/ResultsData";
import { type QuestionsData } from "@/types/QuestionData";

export interface UserSession {
    questionsData: QuestionsData[];
    resultsData: ResultData[];
    sessionData: SessionData;
}



export function useUserSessions(userId?: string, token?: string) {
    return useQuery<UserSession[]>({
        queryKey: ["sessions", userId],
        queryFn: async () => {
            if (!userId || !token) return [];
            const res = await axios.get(`/interview-sessions/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.data?.userSessionsData) {
                throw new Error("Failed to fetch sessions");
            }
            return res.data.userSessionsData;
        },
        enabled: !!userId && !!token,
        staleTime: 1000 * 60 * 5,
    });
}