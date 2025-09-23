import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion } from "@/components/ui/accordion";
import SessionAccordionItem from "@/components/SessionAccordionItem";

export default function InterviewSessionPage() {
    const { user, profile, session, loading } = useAuth();
    const navigate = useNavigate();
    const [userSessions, setUserSessions] = useState<any>();
    const fetchedRef = useRef(false);

    //if no user signed in, redirect to auth page
    useEffect(() => {
        //if the user information is loading, return so the redirect does not run
        if (loading) return;

        if (!user) {
            navigate("/auth");
        }

        // Prevent double fetch from session
        if (fetchedRef.current) return;
        fetchedRef.current = true;

        //get user's interview sessions
        async function getSessions() {
            try {
                const res = await axios.get(`http://localhost:8080/interview-sessions/user/${user?.id}`, {
                  headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                  },
                });
                setUserSessions(res.data);
              } catch (err) {
                console.error("Error fetching sessions:", err);
              }
        }
        getSessions();
    }, [user]);

    return(
        <div className="min-h-screen bg-zinc-300 dark:bg-zinc-800">
            <div className="flex justify-center pt-40">
                {/* Interviewe sessions seciton*/}
                <Card className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl px-0 sm:px-2 bg-zinc-100 dark:bg-zinc-900">
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardTitle className="text-2xl mt-3">All interview practice sessions from {profile?.first_name}</CardTitle>
                            <Button className="hover:cursor-pointer mt-3">
                                View All Sessions
                            </Button>
                        </div>
                    </CardHeader>
                        <CardContent>
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                            >
                            {userSessions && userSessions.length > 0 && (
                            <div className="flex flex-col gap-2 sm:gap-6.5">
                                {userSessions.map((session:any, index:number) => (
                                    <SessionAccordionItem
                                        key={index}
                                        name={!session.name ? session.created_at : session.name}
                                        sessionData={session.session_data}
                                    />
                                ))}
                            </div>
                            )}
                            </Accordion>
                        </CardContent>
                </Card>
            </div>
        </div>
    );
}