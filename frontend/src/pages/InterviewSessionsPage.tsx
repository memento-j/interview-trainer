import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion } from "@/components/ui/accordion";
import SessionAccordionItem from "@/components/SessionAccordionItem";
import { useProfile } from "@/hooks/useProfile";
import { useUserSessions } from "@/hooks/useUserSessions";
import { Spinner } from "@/components/Spinner";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import ProfileOverviewCard from "@/components/ProfileOverviewCard";

export default function InterviewSessionPage() {
    const { user, session, loading } = useAuth();
    const { data: profile } = useProfile(user?.id, session?.access_token);
    const { data: userSessions } = useUserSessions(user?.id, session?.access_token);
    const navigate = useNavigate();

    //if no user signed in, redirect to auth page
    useEffect(() => {
        //if the user information is loading, return so the redirect does not run
        if (loading) return;

        if (!user) {
            navigate("/auth");
        }
    }, [user]);

    return(
        <div className="min-h-screen bg-gradient-to-br from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-950">
            {!profile || !userSessions ? (
                <div className="flex justify-center pt-40">
                    <Spinner variant="ellipsis" size={64}/>
                </div>
            ) :
                <div className="flex flex-col items-center pt-15 md:pt-30 pb-20 gap-5">
                    {/* Profile overview with session data statistics */}
                    <ProfileOverviewCard/>
                    {/* Interview sessions seciton*/}
                    <motion.div
                        className="w-full max-w-2xs sm:max-w-lg md:max-w-2xl lg:max-w-5xl xl:max-w-6xl bg-zinc-100 dark:bg-zinc-900 rounded-2xl"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.30 }}
                    >
                        <Card>
                            <CardHeader>
                                <div className="flex justify-between">
                                    <CardTitle className="text-lg md:text-2xl mt-3">Practice Interview Sessions Overview</CardTitle>
                                    <div className="flex flex-col md:flex-row gap-2">
                                        { userSessions && userSessions.length > 0 && 
                                            <Link to="/practice?mode=repractice">
                                                <Button
                                                    variant="default"
                                                    className="hover:cursor-pointer w-36 md:w-44 text-[13px] md:text-[15px] flex items-center gap-2"
                                                >
                                                    <RefreshCw className="w-4 h-4" />
                                                    Repractice
                                                </Button>
                                            </Link>
                                        }
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full flex flex-col gap-2 sm:gap-6.5"
                                    >
                                    {userSessions && userSessions.length > 0 ? (
                                        userSessions.map((session: any, index: number) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <SessionAccordionItem allSessionData={session}/>
                                            </motion.div>                                        
                                        ))
                                    ) : (
                                        loading ? (
                                            <div className="flex justify-center py-10">
                                                <Spinner variant="ellipsis" size={64}/>
                                            </div>
                                        )  :  (
                                        <p className="text-sm my-5 md:text-lg font-medium text-center text-zinc-600 dark:text-zinc-300">
                                            Your practice interview sessions will appear here.
                                        </p>
                                        )
                                    )
                                    }
                                </Accordion>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            }
        </div>
    );
}