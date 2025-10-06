import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "./ui/skeleton";
import { useCurrentSession } from "@/hooks/useCurrentSession";
import SessionFeedbackDB from "./SessionFeedbackDB";
import SessionFeedbackLS from "./SessionFeedbackLS";

interface SessionOverviewProps{
    sessionID: string;
    setFeedbackGiven: (status: boolean) => void;
}

export default function SessionOverview( { sessionID, setFeedbackGiven } : SessionOverviewProps ) {
    const { user, session } = useAuth();    
    const { data: currentSession } = useCurrentSession( sessionID, user?.id, session?.access_token);
    const [ interviewSession, setInterviewSession ] = useState<any>();

    //checks that the feeedback has be given before storing the session
    useEffect(() => {  
        if (!currentSession) {
            return;
        }
        //ensure feedback has been added to every question before continuing
        if (user) {
            if (currentSession.resultsData.length == currentSession.questionsData.length ) {
                setInterviewSession(currentSession);
                setFeedbackGiven(true);
            }
        }
        else {
            const localStorageSession = localStorage.getItem("interview_session") || "";
            const localStorageSessionJSON = JSON.parse(localStorageSession);
            if (localStorageSessionJSON.questions.length == localStorageSessionJSON.feedback.length) {
                setInterviewSession(localStorageSessionJSON);
                setFeedbackGiven(true);              
            }
        }
    }, [currentSession])
    
    return(
        <div>
            {!interviewSession ? (
                <div className="flex flex-col pt-40 items-center">
                    <p>AI is analyzing your answers...</p>
                    <Skeleton className="h-50 max-w-6xl bg-zinc-600"/>
                </div>
            ) : 
                user ? (
                    <div>
                        <SessionFeedbackDB resultsData={interviewSession.resultsData}/>
                    </div>
                ) : (
                    <div>
                        <SessionFeedbackLS interviewSession={interviewSession}/>
                    </div>
                )
            }
        </div>
    );
}