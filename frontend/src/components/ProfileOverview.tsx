import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { useUserSessions } from "@/hooks/useUserSessions";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfileOverview() {
    const { user, session } = useAuth();
    const { data: userSessions } = useUserSessions(user?.id, session?.access_token);

    return(
        userSessions &&  userSessions.length !== 0 ? (
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
                            <div className="flex flex-col md:flex-row gap-3">
                                <Link to="/practice?mode=repractice">
                                    <Button className="hover:cursor-pointer mt-3 w-32 text-[12px] md:w-40 md:text-[14px]">
                                        Repractice Questions
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardHeader>
                        <CardContent>
                            <p>buh</p>
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