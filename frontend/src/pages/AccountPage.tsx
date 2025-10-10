import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion } from "@/components/ui/accordion";
import SessionAccordionItem from "@/components/SessionAccordionItem";
import ProfileUpdateForm from "@/components/ProfileUpdateForm";
import { useProfile } from "@/hooks/useProfile";
import { Spinner } from "@/components/Spinner";
import { useUserSessions } from "@/hooks/useUserSessions";

export default function AccountPage() {
    const { user, session, loading, signOut } = useAuth();
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

    return (
        <div className="min-h-screen bg-zinc-200 dark:bg-zinc-800">
            {!profile && (
                <div className="flex justify-center pt-40">
                    <Spinner variant="ellipsis" size={64}/>
                </div>
            )}
            {user && profile && (
                <div className="flex flex-col items-center gap-10">
                    {/* Welcome section */}
                    <div className="flex w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl mt-15 mb-3 items-center justify-between">
                        <div className="flex items-center gap-3 ml-3">
                            <div className="flex items-center justify-center w-18 h-18 rounded-full bg-teal-400 dark:bg-teal-700 text-white font-semibold text-2xl">
                                {profile?.username?.charAt(0)}
                            </div>
                            <div className="flex flex-col ml-2">
                                <p className="text-3xl font-[500] mb-1.5">Hello {profile?.firstName}</p>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    View and manage your account info here.
                                </p>
                            </div>
                        </div>
                        <Button
                            className="hover:cursor-pointer mr-2"
                            variant="default"
                            onClick={() => {
                                signOut();
                                navigate("/");
                            }}
                        >
                            Signout
                        </Button>
                    </div>
                    {/* Form for users to update profile information*/}
                    <ProfileUpdateForm/>
                    {/* Interview sessions seciton*/}
                    <Card className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl px-0 sm:px-2 bg-zinc-100 dark:bg-zinc-900">
                        <CardHeader>
                            <div className="flex justify-between">
                                <CardTitle className="text-2xl mt-3">Practice Interview Sessions</CardTitle>
                                <Link to="/account/practice-sessions">
                                    <Button className="hover:cursor-pointer mt-3">
                                        Manage All Sessions
                                    </Button>
                                </Link>
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
                                        {userSessions.slice(0, 3).map((session:any, index:number) => (
                                            <SessionAccordionItem
                                                key={index}
                                                allSessionData={session}
                                            />
                                        ))}
                                    </div>
                                )}
                                </Accordion>
                            </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}