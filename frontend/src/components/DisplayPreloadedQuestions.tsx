import { usePreloadedQuestions } from "@/hooks/usePreloadedQuestions";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AnimatedList from "./AnimatedList";
import { useSessionStore } from "@/stores/useSessionStore";

export default function DisplayPreloadedQuestions() {
    const { data: preloadedQuestions } = usePreloadedQuestions();    
    const { selectedPremadeQuestions, toggleQuestion } = useSessionStore();
    
    function handleQuestionSelect(question: string) {
        if (selectedPremadeQuestions.length < 10 || selectedPremadeQuestions.includes(question)) {
            toggleQuestion(question)
        }
        return;
    }

    return (
        <div>
            { preloadedQuestions &&
                <div >
                    <p className="text-center text-2xl mb-3 font-[500]">Select Your Questions By Category</p>
                    <Tabs defaultValue={Object.keys(preloadedQuestions)[0]}>
                        <div className="flex justify-center my-3">
                            <TabsList className="gap-2">
                                {Object.keys(preloadedQuestions).map(role => (
                                    <TabsTrigger key={role} value={role} className="text-xl">
                                        {role}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>
                        {Object.entries(preloadedQuestions).map(([role, questions]) => (
                            <TabsContent key={role} value={role} className="text-lg">
                                <AnimatedList
                                    items={questions.map((q: any) => q.question)}
                                    onItemSelect={(question) => handleQuestionSelect(question)}
                                    enableArrowNavigation
                                    displayScrollbar
                                    showGradients={false}
                                />
                            </TabsContent>
                        ))}
                    </Tabs>
                    <p className="text-center text-2xl my-3 font-[500]">Your Selected Questions</p>
                    {selectedPremadeQuestions.map((question, index) => (
                        <p className="text-center" key={index}>{index+1}.) {question}</p>
                    ))}
                </div>
            }
        </div>
    );
}