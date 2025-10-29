import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@/components/Spinner";
import { useCurrentSession } from "@/hooks/useCurrentSession";
import SessionFeedbackDB from "./SessionFeedbackDB";
import SessionFeedbackLS from "./SessionFeedbackLS";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { useUserSessions } from "@/hooks/useUserSessions";

interface SessionOverviewProps{
    sessionID: string;
    setFeedbackGiven: (status: boolean) => void;
}

export default function SessionOverview( { sessionID, setFeedbackGiven } : SessionOverviewProps ) {
    const { user, session } = useAuth();    
    const { data: currentSession } = useCurrentSession( sessionID, user?.id, session?.access_token);
    const [ interviewSession, setInterviewSession ] = useState<any>();
    const { refetch } = useUserSessions(user?.id, session?.access_token);

    //checks that the feeedback has be given before storing the session
    useEffect(() => {  
        if (!currentSession) {
            return;
        }
        //ensure feedback has been added to every question before continuing
        if (user) {
            if (currentSession.resultsData.length == currentSession.questionsData.length ) {
                setInterviewSession(currentSession);
                //refetch usersessions since a session has been fully completed
                refetch();
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
                <motion.div
                    className="flex flex-col items-center justify-center gap-6 py-40"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {/* Animated Brain Icon */}
                    <motion.div
                        className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-teal-500 to-teal-400 dark:from-teal-700 dark:to-teal-600 shadow-lg"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Brain className="w-10 h-10 text-white" />
                    </motion.div>
                    <p className="font-semibold text-2xl md:text-3xl text-center text-foreground">
                        AI is analyzing your answers...
                    </p>
                    {/* Spinner or Loading Indicator */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                    >
                        <Spinner variant="ellipsis" size={64} />
                    </motion.div>
                    {/* Subtle Progress Text */}
                    <motion.p
                        className="text-muted-foreground text-sm mt-3 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3, duration: 0.5 }}
                    >
                        This may take a few seconds — generating your personalized feedback ✨
                    </motion.p>
                </motion.div>
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