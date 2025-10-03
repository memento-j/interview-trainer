import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useUserSessions(userId?: string, token?: string) {
  return useQuery({
    queryKey: ["sessions", userId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8080/interview-sessions/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.userSessionsData;
    },
    //run only if there is a userid (!! double negation to cast value to a boolean)
    enabled: !!userId,
    // cache valid for 5 minutes
    staleTime: 1000 * 60 * 5
  });
}