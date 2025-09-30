import SessionSetup from "@/components/SessionSetup";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import Stepper, { Step } from '../components/Stepper';
import AssemblyAIRecorder from "@/components/AssemblyAIRecorder";
import SessionOverview from "@/components/SessionOverview";
import { Button } from "@/components/ui/button";

export default function InterviewPractice() {
    const { user } = useAuth();
    const [setupCompleted, setSetupCompleted] = useState<boolean>(false); 
    const [createdSessionID, setCreatedSessionID] = useState<string>("");
    const [questions, setQuestions] = useState<string[]>();
    const [questionsSubmitted, setQuestionsSubmitted] = useState<boolean[]>([]);
    const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);    
    const [feedbackGiven, setFeedbackGiven] = useState<boolean>(false)

    //fetches interview session info
    useEffect(() => {
        async function fetchInterviewSession() {
            try {                
                const res = await axios.get(`http://localhost:8080/interview-sessions/${createdSessionID}`);
                const falseArary = new Array(res.data.session_data.questions.length).fill(false);
                setQuestionsSubmitted(falseArary);
                setQuestions(res.data.session_data.questions)
            } catch (err) {
                console.error("Error fetching sessions:", err);
            }
        }
        //once the setup is completed, fetch the interview session info        
        if (setupCompleted) {
            //if user is signed in, fetch from db
            if (user) {
                fetchInterviewSession();
            } 
            //otherwise, just fetch from  local storage
            else {
                const createdSession = localStorage.getItem("interview_session") || "";
                const createdSessionJSON = JSON.parse(createdSession);
                //for forcing user to submit question beofre continuing
                const falseArary = new Array(createdSessionJSON.questions.length).fill(false);
                setQuestionsSubmitted(falseArary);
                setQuestions(createdSessionJSON.questions);
            }
        }
    }, [setupCompleted])

    //reset stateful variables to start a new session
    function startNewSession() {
        setSetupCompleted(false);
        setSessionCompleted(false);
        setQuestions([]);
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
            {setupCompleted && questions && !sessionCompleted && (
                <Stepper
                    initialStep={1}
                    onStepChange={(step) => {
                        console.log(step);
                    }}
                    onFinalStepCompleted={() => setSessionCompleted(true)}
                    backButtonText="Review Previous Answer"
                    nextButtonText="Next Question"
                >
                    {questions?.map((question: string, index: number) => (
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