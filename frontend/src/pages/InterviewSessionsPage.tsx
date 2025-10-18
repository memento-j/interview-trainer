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

export default function InterviewSessionPage() {
    const { user, session, loading } = useAuth();
    const { data: profile } = useProfile(user?.id, session?.access_token);
    const {data: userSessions } = useUserSessions(user?.id, session?.access_token);
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
                <div className="flex justify-center pt-40 pb-20">
                    {/* Interview sessions seciton*/}
                    <Card className="w-full max-w-2xs sm:max-w-lg md:max-w-2xl lg:max-w-5xl xl:max-w-6xl px-0 sm:px-2 bg-zinc-100 dark:bg-zinc-900">
                        <CardHeader>
                            <div className="flex justify-between">
                                <CardTitle className="text-lg md:text-2xl mt-3">Practice Interview Sessions Overview</CardTitle>
                                <div className="flex flex-col md:flex-row gap-2">
                                    <Link to="/practice?mode=repractice">
                                        <Button className="hover:cursor-pointer mt-3 w-32 text-[12px] md:w-40 md:text-[14px]">
                                            Repractice Questions
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full flex flex-col gap-2 sm:gap-6.5"
                                >
                                {userSessions && userSessions.length > 0 &&
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
                                }
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            }
        </div>
    );
}