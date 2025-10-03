import SessionSetup from "@/components/SessionSetup";
import AssemblyAIRecorder from "@/components/AssemblyAIRecorder";
import SessionOverview from "@/components/SessionOverview";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Stepper, { Step } from '../components/Stepper';
import { Button } from "@/components/ui/button";
import { useCurrentQuestions } from "@/hooks/useCurrentQuestions";

export default function InterviewPractice() {
    const { user, session } = useAuth();
    const [setupCompleted, setSetupCompleted] = useState<boolean>(false); 
    const [createdSessionID, setCreatedSessionID] = useState<string>("");
    const [questionsSubmitted, setQuestionsSubmitted] = useState<boolean[]>([]);
    const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);    
    const [feedbackGiven, setFeedbackGiven] = useState<boolean>(false);
    const { data: currentQuestions } = useCurrentQuestions(setupCompleted, createdSessionID, user?.id, session?.access_token);
    
    useEffect(() => {
        //once the setup is completed, fetch the interview session info        
        if (setupCompleted && currentQuestions) {
                console.log(currentQuestions);
                const falseArary = new Array(currentQuestions.length).fill(false);
                setQuestionsSubmitted(falseArary);
        }
    }, [setupCompleted, currentQuestions])

    //reset stateful variables to start a new session
    function startNewSession() {
        setSetupCompleted(false);
        setSessionCompleted(false);
        //maybe have to set current questions to be empty?
        setCreatedSessionID("");
        setFeedbackGiven(false);
        //reset the local storage 
        // if (!user) {
        //     localStorage.removeItem("interview_session")
        // }
    }

    return (
        <div className="min-h-screen bg-zinc-200 dark:bg-zinc-800"> 
            {/* Setup the practice interview session */}        
            {!setupCompleted && !sessionCompleted && (
                <SessionSetup 
                    setSetupCompleted={setSetupCompleted}
                    setCreatedSessionID={setCreatedSessionID}
                />    
            )}
            {/* Start the interview session once the questions are available */}  
            {setupCompleted && currentQuestions && !sessionCompleted && (
                <Stepper
                    initialStep={1}
                    onStepChange={(step) => {
                        console.log(step);
                    }}
                    onFinalStepCompleted={() => setSessionCompleted(true)}
                    backButtonText="Review Previous Answer"
                    nextButtonText="Next Question"
                >
                    {currentQuestions?.map((question: string, index: number) => (
                        //questionsSubmitted checks to ensure that the current question has an answer
                        <Step key={index} canContinue={questionsSubmitted[index]}>
                            <p className='font-semibold mb-10'>{question}</p>
                            <AssemblyAIRecorder sessionID={createdSessionID} question={question} questionsSubmitted={questionsSubmitted} setQuestionsSubmitted={setQuestionsSubmitted} questionIndex={index}/>
                            <div className='mb-15'/>
                        </Step>
                    ))}            
                </Stepper>
            )}
            {/* Session is completed, so show overview of the session along with button to start a new one*/}
            {sessionCompleted && (
                <div className="pt-12">
                    <SessionOverview sessionID={createdSessionID} setFeedbackGiven={setFeedbackGiven}/>
                    {feedbackGiven && (
                        <div className="flex justify-center py-20">
                            <Button onClick={startNewSession} className="hover:cursor-pointer">Start new session</Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}