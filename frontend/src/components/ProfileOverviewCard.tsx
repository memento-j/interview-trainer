import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { useUserSessions } from "@/hooks/useUserSessions";
import { useSessionAnalysis } from "@/hooks/useSessionsAnalysis";
import { useAuth } from "@/contexts/AuthContext";
import { Brain, RefreshCw, Users } from "lucide-react";
import { Spinner } from "./Spinner";
import ProfileAnalytics from "./ProfileAnalyticsAccordion";

export default function ProfileOverviewCard() {
    const { user, session } = useAuth();
    const { data: userSessions, isLoading: sessionsLoading } = useUserSessions(user?.id, session?.access_token);
    const { data: userAnalysis, isLoading: analysisLoading } = useSessionAnalysis(user?.id, session?.access_token, userSessions);
    
    if (sessionsLoading || analysisLoading) {
        return (
            <motion.div
                className="w-full max-w-2xs sm:max-w-lg md:max-w-2xl lg:max-w-5xl xl:max-w-6xl rounded-2xl bg-zinc-100 dark:bg-zinc-900"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
            >
                <Card>
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardTitle className="text-lg md:text-2xl mt-3">Profile Overview</CardTitle>
                        </div>
                    </CardHeader>
                        <CardContent>
                            <motion.div
                                className="flex flex-col items-center justify-center gap-6"
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
                                <p className="font-semibold text-xl md:text-2xl text-center text-foreground">
                                    AI is currently analyzing ALL of your sessions...
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
                                    transition={{ delay: 10, duration: 0.5 }}
                                >
                                    This may take up to 30 seconds — we're generating your personalized feedback ✨
                                </motion.p>
                            </motion.div>
                        </CardContent>
                </Card>
            </motion.div>
        );
    }
    
    return(
        userAnalysis && userSessions &&  userSessions.length !== 0 ? (
            <motion.div
                className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-5xl xl:max-w-6xl rounded-2xl bg-zinc-100 dark:bg-zinc-900"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
            >
                <Card>
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardTitle className="text-lg md:text-2xl font-[500] flex items-center gap-2">
                                <Users className="w-6 h-6 text-blue-500" /> Overall Performance
                            </CardTitle>
                            <div className="flex flex-col md:flex-row gap-3">
                                <Link to="/practice?mode=repractice">
                                    <Button
                                        variant="default"
                                        className="hover:cursor-pointer w-24 md:w-44 text-[13px] md:text-[15px] flex items-center gap-2"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        Repractice
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardHeader>
                        <CardContent>
                            {/*User analytics display*/}
                            <ProfileAnalytics userAnalysis={userAnalysis}/>
                        </CardContent>
                </Card>
            </motion.div>
        ) : (
            <motion.div
                className="w-full max-w-2xs sm:max-w-lg md:max-w-2xl lg:max-w-5xl xl:max-w-6xl rounded-2xl bg-zinc-100 dark:bg-zinc-900"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
            >
                <Card>
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardTitle className="text-lg md:text-2xl mt-3">Profile Overview</CardTitle>
                        </div>
                    </CardHeader>
                        <CardContent>
                            <p className="text-sm mb-5 md:text-lg font-medium text-center text-zinc-600 dark:text-zinc-300">
                                You haven't practiced any interviews yet! Complete a session to see your performance data and track your progress.
                            </p>
                        </CardContent>
                </Card>
            </motion.div>
        )
    );
}