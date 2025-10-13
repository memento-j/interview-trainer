import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function usePreloadedQuestions() {
    return useQuery({
        queryKey: ["preloadedQuestions"],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8080/preloaded-questions`);
            //group the questions by their roles
            const questionsByRoles = res.data?.reduce((acc:any, question:any) => {
                const roleKey = question.role || "general";
                //if the role is new, add new array in the object
                if (!acc[roleKey]) {
                    acc[roleKey] = [];
                }
                acc[roleKey].push(question);
                return acc;
            }, {});
            return questionsByRoles;
        },
        // cache valid for 15 minutes
        staleTime: 1000 * 60 * 15
    });
}