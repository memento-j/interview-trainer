import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export function useProfile(userId?: string, token?: string) {
    return useQuery({
        queryKey: ["profile", userId],
        queryFn: async () => {
            try {
                const res = await axios.get(`${apiUrl}/profiles/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                return res.data;
            } catch (err) {
                console.log(err);
            }
        },
        //run only if there is a userid (!! double negation to cast value to a boolean)
        enabled: !!userId,
        // cache valid for 5 minutes
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 60
    });
}