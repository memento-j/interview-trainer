import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion } from "@/components/ui/accordion";
import SessionAccordionItem from "@/components/SessionAccordionItem";
import { useProfile } from "@/hooks/useProfile";
import { useUserSessions } from "@/hooks/useUserSessions";
import { Spinner } from "@/components/Spinner";

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
                    <Card className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl px-0 sm:px-2 bg-zinc-100 dark:bg-zinc-900">
                        <CardHeader>
                            <div className="flex justify-between">
                                <CardTitle className="text-2xl mt-3">All interview practice sessions from {profile?.firstName}</CardTitle>
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
                                        <SessionAccordionItem
                                            key={index}
                                            allSessionData={session}
                                        />
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