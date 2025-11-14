import AnimatedList from "./AnimatedList";
import { useSessionStore } from "@/stores/useSessionStore";
import { useAuth } from "@/contexts/AuthContext";
import { useUserQuestions } from "@/hooks/useUserQuestions";
import { Spinner } from "./Spinner";
import { useState, useEffect } from "react";

export default function DisplayUserQuestions() {
    const { user, session } = useAuth();    
    const { selectedPremadeQuestions, toggleQuestion } = useSessionStore();
    const { data: userUniqueQuestions } = useUserQuestions(user?.id, session?.access_token);
    const [userQuestionsLoading, setUserQuestionsLoading] = useState(true);

    useEffect(() => {
        if (userUniqueQuestions) {
            setUserQuestionsLoading(false);
        }
    }, [userUniqueQuestions, userQuestionsLoading]);

    //adds or removes premade questions from the list when the conditions are met
    function handleQuestionSelect(question: string) {        
        if (selectedPremadeQuestions.length < 10 || selectedPremadeQuestions.includes(question)) {
            toggleQuestion(question)
        }
        return;
    }

    return (
        userUniqueQuestions && userUniqueQuestions.length > 0 ? (
            <div>
                <p className="text-center text-xl mb-3">❗= Questions you should practice again (Highest score of less than 7)</p>
                <AnimatedList
                    items={userUniqueQuestions.map((q: any) => `${q.weak ? "❗" : ""} ${q.question} - (Your Highest Score: ${q.averageScore})`)}
                    onItemSelect={(question) => handleQuestionSelect(question)}
                    enableArrowNavigation
                    displayScrollbar
                    showGradients={false}
                />
                <p className="text-center text-2xl my-3 font-[500]">Your Selected Questions</p>
                {selectedPremadeQuestions.map((question, index) => (
                    <p className="text-center font-[500]" key={index}>{index+1}.) {question}</p>
                ))}
            </div>
        ) : (
            userQuestionsLoading ? (
                <div className="flex justify-center min-h-[520px] mt-5">
                    <Spinner variant="ellipsis" size={64}/>
                </div>
            )  :  (
                <p className="text-lg my-5 md:text-2xl font-medium text-center text-zinc-600 dark:text-zinc-300">
                    You haven't done any interview sessions yet!
                </p>
            )
        )
    );
}