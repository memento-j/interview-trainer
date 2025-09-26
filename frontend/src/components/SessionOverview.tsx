import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import SessionFeedback from "./SessionFeedback";


interface SessionOverviewProps{
    sessionID: string;
    setFeedbackGiven: (status: boolean) => void;
}

export default function SessionOverview( { sessionID, setFeedbackGiven } : SessionOverviewProps ) {
    const { user } = useAuth();
    const [interviewSession, setInterviewSession] = useState<any>();

    //fetches interview session info
    useEffect(() => {
        let interval: number;

        async function fetchInterviewSession() {
          try {
            const res = await axios.get(`http://localhost:8080/interview-sessions/${sessionID}`);
            if (res.data.session_data.questions.length === res.data.session_data.feedback.length) {
              setInterviewSession(res.data);
              setFeedbackGiven(true);
              // stop interval once all feedback is in the db
              clearInterval(interval);
            }
          } catch (err) {
            console.error("Error fetching sessions:", err);
          }
        }
      
        interval = window.setInterval(fetchInterviewSession, 3000);
      
        //if user is signed in, fetch from db
        if (user) {
            fetchInterviewSession();
        } 
        //otherwise, just fetch from  local storage
        else {
            //set timeout here too
            //const completedSession = localStorage.getItem("interview_session") || "";
            //const completedSessionJSON = JSON.parse(createdSession);
            //setQuestions(createdSessionJSON.questions);
        }

        return () => clearInterval(interval);
    }, [])
    
    return(
        <div>
            {!interviewSession ?
                <div>
                    AI is analyzing your answers...
                </div>
            :
                <div>
                    <SessionFeedback interviewSession={interviewSession}/>
                </div>
            }
        </div>
    );
}