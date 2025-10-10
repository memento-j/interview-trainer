import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function usePreloadedQuestions() {
    return useQuery({
        queryKey: ["preloadedQuestions"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8080/preloaded-questions`);
            return res.data;
        },
        // cache valid for 15 minutes
        staleTime: 1000 * 60 * 15
    });
}