import SessionSetup from "@/components/SessionSetup";
import AssemblyAIRecorder from "@/components/AssemblyAIRecorder";
import SessionOverview from "@/components/SessionOverview";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Stepper, { Step } from '../components/Stepper';
import { Button } from "@/components/ui/button";
import { useCurrentQuestions } from "@/hooks/useCurrentQuestions";
import { useSessionStore } from "@/stores/useSessionStore";
import { useSearchParams } from "react-router";
import RepracticeSessionSetup from "@/components/RepracticeSessionSetup";
import { Link } from "react-router";

export default function InterviewPractice() {
    const { user, session } = useAuth();
    const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);    
    const [feedbackGiven, setFeedbackGiven] = useState<boolean>(false);
    const { createdSessionID, setupCompleted, questionsSubmitted, setQuestionsSubmitted, resetSession } = useSessionStore();
    const { data: currentQuestions } = useCurrentQuestions(setupCompleted, createdSessionID, user?.id, session?.access_token);
    const [searchParams] = useSearchParams();
    const mode = searchParams.get("mode");

    useEffect(() => {
        //once the setup is completed, fetch the interview session info        
        if (setupCompleted && currentQuestions) {
            const falseArary = new Array(currentQuestions.length).fill(false);
            setQuestionsSubmitted(falseArary);
        }
    }, [setupCompleted, currentQuestions, location.pathname])

    useEffect(() => {
        //on unmount, start new session
        return () => startNewSession();
    }, [])

    //reset stateful variables to start a new session
    function startNewSession() {
        setSessionCompleted(false);
        setFeedbackGiven(false);
        resetSession();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-950"> 
            {/* Setup the practice interview session */}        
            {!setupCompleted && !sessionCompleted && (
                mode === "repractice" ? (
                    <RepracticeSessionSetup/>
                ) : (
                    <SessionSetup/>
                )
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
                    {currentQuestions?.map((question: any, index: number) => (
                        //questionsSubmitted checks to ensure that the current question has an answer
                        <Step key={index} canContinue={questionsSubmitted[index]}>
                            <p className='font-semibold mb-8 text-3xl text-center'>{user ? question.text : question}</p>
                            <AssemblyAIRecorder questionText={user ? question.text : question} questionId={question.id} questionIndex={index}/>
                            <div className='m-auto'/>
                        </Step>
                    ))}            
                </Stepper>
            )}
            {/* Session is completed, so show overview of the session along with button to start a new one*/}
            {sessionCompleted && (
                <div className="pt-12">
                    <SessionOverview sessionID={createdSessionID} setFeedbackGiven={setFeedbackGiven}/>
                    {feedbackGiven && (
                        <div className="flex justify-center py-20 gap-8">
                            <Button onClick={startNewSession} className="hover:cursor-pointer">Start new session</Button>
                            <Link to="/practice?mode=repractice">
                                <Button className="hover:cursor-pointer mt-3 w-32 text-[12px] md:w-40 md:text-[14px]">
                                    Repractice Questions
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}