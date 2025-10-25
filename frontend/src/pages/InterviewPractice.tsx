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
import { motion } from "framer-motion";

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
                    <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.10 }}
                        >
                        <RepracticeSessionSetup/>
                    </motion.div>
                ) : (
                    <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.10 }}
                        >
                        <SessionSetup/>
                    </motion.div>
                )
            )}
            {/* Start the interview session once the questions are available */}  
            {setupCompleted && currentQuestions && !sessionCompleted && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.10 }}
                >
                    <Stepper
                        initialStep={1}
                        onStepChange={(step) => {
                            console.log(step);
                        }}
                        onFinalStepCompleted={() => setSessionCompleted(true)}
                        backButtonText="Go Back"
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
                </motion.div>
            )}
            {/* Session is completed, so show overview of the session along with button to start a new one*/}
            {sessionCompleted && (
                <div className="pt-12">
                    <SessionOverview sessionID={createdSessionID} setFeedbackGiven={setFeedbackGiven}/>
                    {feedbackGiven && (
                        <motion.div
                            className="flex flex-col sm:flex-row justify-center items-center py-20 gap-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", duration: 0.6 }}
                            >
                            {/* Start New Session */}
                            <Button
                                onClick={startNewSession}
                                className="
                                    px-8 py-5 text-lg font-semibold 
                                    bg-gradient-to-tr from-teal-600 to-teal-400 
                                    text-white rounded-xl shadow-md
                                    hover:from-teal-500 hover:to-teal-300 
                                    hover:shadow-xl hover:scale-105 
                                    active:scale-95 transition-all
                                "
                            >
                                🚀 Start New Session
                            </Button>
                            {/* Repractice Questions */}
                            { user && (
                                <Link to="/practice?mode=repractice">
                                    <Button
                                        onClick={startNewSession}
                                        className="
                                            px-8 py-5 text-lg font-semibold 
                                            bg-gradient-to-tr from-zinc-200 to-zinc-100 
                                            dark:from-zinc-900 dark:to-zinc-800 
                                            text-zinc-800 dark:text-zinc-200 rounded-xl border
                                            border-border/60 shadow-md
                                            hover:shadow-lg hover:scale-105 active:scale-95 transition-all
                                        "
                                    >
                                        🔁 Repractice Questions
                                    </Button>
                                </Link>
                            )}
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    );
}