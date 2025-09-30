import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import SessionFeedback from "./SessionFeedback";
import { Skeleton } from "./ui/skeleton";


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
            //if user is signed in, fetch from db
            if (user) {
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
            else {
                const completedSession = localStorage.getItem("interview_session") || "";
                const completedSessionJSON = JSON.parse(completedSession);
                if (completedSessionJSON.questions.length === completedSessionJSON.feedback.length) {
                    setInterviewSession(completedSessionJSON);
                    setFeedbackGiven(true);
                    // stop interval once all feedback is in local storaage
                    clearInterval(interval);
                }
            }
        }
      
        interval = window.setInterval(fetchInterviewSession, 3000);
        fetchInterviewSession();
    
        return () => clearInterval(interval);
    }, [])
    
    return(
        <div>
            {!interviewSession ?
                <div className="flex flex-col pt-40 items-center">
                    <p>AI is analyzing your answers...</p>
                    <Skeleton className="h-50 max-w-6xl bg-zinc-600"/>
                </div>
            :
                <div>
                    <SessionFeedback interviewSession={interviewSession}/>
                </div>
            }
        </div>
    );
}