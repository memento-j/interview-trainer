import SessionSetup from "@/components/SessionSetup";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import Stepper, { Step } from '../components/Stepper';
import AssemblyAIRecorder from "@/components/AssemblyAIRecorder";

export default function InterviewPractice() {
    const { user } = useAuth();
    const [setupCompleted, setSetupCompleted] = useState<boolean>(false); //change to false
    const [createdSessionID, setCreatedSessionID] = useState<string>("");
    const [interviewSession, setInterviewSession] = useState<any>();
    const [questions, setQuestions] = useState<string[]>();
    const [questionsSubmitted, setQuestionsSubmitted] = useState<boolean[]>([]);
    

    //fetches interview session info
    useEffect(() => {
        async function fetchInterviewSession() {
            try {                
                const res = await axios.get(`http://localhost:8080/interview-sessions/${createdSessionID}`); //change to createdsessionid
                const falseArary = new Array(res.data.session_data.questions.length).fill(false);
                setQuestionsSubmitted(falseArary);
                setInterviewSession(res.data);
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
                setInterviewSession(createdSessionJSON);
                setQuestions(createdSessionJSON.questions);
            }
        }
        //change dependency array to include setupcompleted
    }, [setupCompleted])

    return (
        <div className="min-h-screen bg-zinc-300 dark:bg-zinc-800"> 
            {/* Setup the practice interview session */}        
            {!setupCompleted && (
                <SessionSetup 
                    setSetupCompleted={setSetupCompleted}
                    setCreatedSessionID={setCreatedSessionID}
                />    
            )}
            {/* Start the interview session oncee the questions are available */}  
            {setupCompleted && questions &&
                <Stepper
                    initialStep={1}
                    onStepChange={(step) => {
                        console.log(step);
                    }}
                    //TODO: DISPLAY ALL FEEDBACK ON FINAL STEP COMPLETED (USE SETTIMEOUT EVERY 5 SECONDS?)
                    // ADD BUTTON TO START NEW SESSION  OR VIEW THE SESSION ON THE SESSIONS PAGE
                    // 
                    onFinalStepCompleted={() => console.log("Need to display all results")}
                    backButtonText="Review Previous Answer"
                    nextButtonText="Next Question"
                >
                    {questions?.map((question: string ,index: number) => (
                        //questionsSubmitted checks to ensure that the current question has an answer
                        <Step key={index} canContinue={questionsSubmitted[index]}>
                            <p className='font-semibold mb-10'>{question}</p>
                            <AssemblyAIRecorder sessionID={createdSessionID} question={question} questionsSubmitted={questionsSubmitted} setQuestionsSubmitted={setQuestionsSubmitted} questionIndex={index}/>
                            <div className='mb-15'/>
                        </Step>
                    ))}            
                </Stepper>
            }
        </div>
    );
}