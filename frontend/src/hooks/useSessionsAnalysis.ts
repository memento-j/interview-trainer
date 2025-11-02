import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useSessionAnalysis(userId?: string, userSessions?: any) {
    return useQuery({
        queryKey: ["profileAnalysis", userId],
        queryFn: async () => {
            const res = await axios.post(`http://localhost:8080/ai/user-sessions-analysis`, {
                userSessions
            });
            const analysis = res.data;
            return analysis;
        },
        //run only if there is a userid (!! double negation to cast value to a boolean) and there are usersessions available
        enabled: !!userId && !!userSessions && userSessions.length > 0,
        // cache valid for 5 minutes
        staleTime: 1000 * 60 * 5
    });
}