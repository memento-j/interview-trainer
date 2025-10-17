import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useUserQuestions(userId?: string, token?: string) {
  return useQuery({
    queryKey: ["userQuestions", userId],
    queryFn: async () => {
        const res = await axios.get(`http://localhost:8080/interview-sessions/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const allSessionData = res.data.userSessionsData;
        //get question data from the usersession
        const allQuestions = allSessionData.flatMap((session: any) =>
            session.resultsData.map((result: any) => ({
                question: result.question,
                averageScore: result.averagescore,
                weak: result.weakanswer
            }))
        )
        //sort in decending order (based on score)
        allQuestions.sort((a:any, b:any) =>  b.averageScore - a.averageScore);

        //remove duplicates (becaause the list is in descending order, the duplicate with the lower score will be removed)
        const allUniqueQuestions = allQuestions.filter((question:any, index:any, self:any) => 
            index === self.findIndex((currQuestion:any) => currQuestion.question === question.question)
        );
        //now sort unique question in ascending order based on score so user knows what to practice first
        allUniqueQuestions.sort((a:any, b:any) =>  a.averageScore - b.averageScore);
        
        return allUniqueQuestions;
    },
    //run only if there is a userid (!! double negation to cast value to a boolean)
    enabled: !!userId,
    // cache valid for 5 minutes
    staleTime: 1000 * 60 * 5
  });
}