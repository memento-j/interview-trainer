import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export function useSessionAnalysis(userId?: string, token?: string, userSessions?: any) {
    return useQuery({
        queryKey: ["profileAnalysis", userId],
        queryFn: async () => {
            const res = await axios.post(`/ai/user-sessions-analysis`, 
                {
                    userSessions,
                    userId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
        );
            const analysis = res.data;
            return analysis;
        },
        //run only if there is a userid (!! double negation to cast value to a boolean) and there are usersessions available
        enabled: !!userId && !!userSessions && userSessions.length > 0,
        // cache valid for 15 minutes
        staleTime: 1000 * 60 * 15
    });
}