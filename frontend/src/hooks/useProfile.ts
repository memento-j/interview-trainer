import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useProfile(userId?: string, token?: string) {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:8080/profiles/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!userId, // run only if logged in
    staleTime: 1000 * 60 * 5, // cache valid for 5 minutes
  });
}