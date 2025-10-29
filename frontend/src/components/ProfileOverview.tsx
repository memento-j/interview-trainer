import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { useUserSessions } from "@/hooks/useUserSessions";
import { useAuth } from "@/contexts/AuthContext";
import { RefreshCw } from "lucide-react";
import { Spinner } from "./Spinner";
import { useMemo } from "react";

export default function ProfileOverview() {
    const { user, session } = useAuth();
    const { data: userSessions, isLoading } = useUserSessions(user?.id, session?.access_token);
    //calculate statistics to display in cache
    const userStats = useMemo(() => {
        if (!userSessions) {
            return null;
        }
        const totalSessions = userSessions.length;
        const totalQuestions = userSessions.reduce((sum, currSession) => sum + currSession.questionsData.length, 0);

        return { totalSessions, totalQuestions };

    }, [userSessions]);
    //?? is the nullish coalescing operator.
    // returns the right-hand value only if the left-hand value is null or undefined.
    const { totalSessions, totalQuestions } = userStats ?? {};
    
    if (isLoading) {
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
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.4 }}
                                className="flex justify-center"
                            >
                                <Spinner variant="ellipsis" size={64} />
                            </motion.div>
                        </CardContent>
                </Card>
            </motion.div>
        );
    }
    

    return(
        userSessions &&  userSessions.length !== 0 ? (
            <motion.div
                className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-5xl xl:max-w-6xl rounded-2xl bg-zinc-100 dark:bg-zinc-900"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
            >
                <Card>
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardTitle className="text-lg md:text-2xl mt-3">Profile Overview</CardTitle>
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
                            <div>
                                <p>Total practice sessions: {totalSessions}</p>
                                <p>Total questions answered: {totalQuestions}</p>
                            </div>
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