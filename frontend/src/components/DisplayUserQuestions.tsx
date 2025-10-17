import AnimatedList from "./AnimatedList";
import { useSessionStore } from "@/stores/useSessionStore";
import { useAuth } from "@/contexts/AuthContext";
import { useUserQuestions } from "@/hooks/useUserQuestions";
import { Spinner } from "./Spinner";

export default function DisplayUserQuestions() {
    const { user, session } = useAuth();    
    const { selectedPremadeQuestions, toggleQuestion } = useSessionStore();
    const { data: userUniqueQuestions } = useUserQuestions(user?.id, session?.access_token);
    
    //adds or removes premade questions from the list when the conditions are met
    function handleQuestionSelect(question: string) {        
        if (selectedPremadeQuestions.length < 10 || selectedPremadeQuestions.includes(question)) {
            toggleQuestion(question)
        }
        return;
    }

    return (
        <div>
            { userUniqueQuestions && userUniqueQuestions.length > 0 ? (
                <div>
                    <p className="text-center text-xl mb-3">❗= Questions you should practice again (Highest score of less than 6)</p>
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
                <div className="flex justify-center pt-10">
                    <Spinner variant="ellipsis" size={64}/>
                </div>
            )}
        </div>
    );
}