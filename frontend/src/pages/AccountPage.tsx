import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion } from "@/components/ui/accordion";
import SessionAccordionItem from "@/components/SessionAccordionItem";

export default function AccountPage() {
    const { user, profile, session, loading, signOut } = useAuth();
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
            
                console.log("User sessions:", res.data[0].session_data.answers);
                setUserSessions(res.data);
              } catch (err) {
                console.error("Error fetching sessions:", err);
              }
        }
        getSessions();
    }, [user]);

    //update profile information in the DB
    async function handleProfileChange(event: React.FormEvent<HTMLFormElement>) {
        //prevent page refresh
        event.preventDefault();
        //retrieve profile attributes from form
        const form = event.target as HTMLFormElement;
        const username = (form.elements.namedItem("username") as HTMLInputElement).value;
        const firstName = (form.elements.namedItem("first-name") as HTMLInputElement).value;
        const lastName = (form.elements.namedItem("last-name") as HTMLInputElement).value;

        try {
            const response = await axios.patch(`http://localhost:8080/profiles/${user?.id}`, {
                username: username,
                fname: firstName,
                lname: lastName
            });
            if (response.status == 204) {
                console.log("updated profile (:");
                //put some toast here to let the user know their profile updated
                //refreshes page so the user can see their new account info
                location.reload();
            }
        //add an error message for if the username currently exists since they are unique
        } catch (err) {
            console.error(err);
        }
    }

    return (
    <div className="min-h-screen bg-zinc-300 dark:bg-zinc-800">
        {user && (
            <div className="flex flex-col items-center gap-5">
                {/* Welcome section */}
                <div className="flex w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl mt-15 mb-3 items-center justify-between">
                    <div className="flex items-center gap-3 ml-3">
                        <div className="flex items-center justify-center w-18 h-18 rounded-full bg-zinc-700 text-white font-semibold text-2xl">
                            {profile?.username?.charAt(0)}
                        </div>
                        <div className="flex flex-col ml-2">
                            <p className="text-3xl font-[500] mb-1.5">Hello {profile?.username}</p>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                View and manage your account info here.
                            </p>
                        </div>
                    </div>
                    <Button
                        className="hover:cursor-pointer mr-2"
                        variant="outline"
                        onClick={() => {
                        signOut();
                        navigate("/");
                        }}
                    >
                        Signout
                    </Button>
                </div>
                {/* Form for users to update profile information*/}
                <Card className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl px-0 sm:px-2 bg-zinc-100 dark:bg-zinc-900">
                    <CardHeader>
                        <CardTitle className="text-2xl mt-3">Profile Details</CardTitle>
                    </CardHeader>
                    <form onSubmit={handleProfileChange}>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-2 sm:gap-6.5">
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                    <Label htmlFor="password">Username</Label>
                                    </div>
                                    <Input id="username" type="text" defaultValue={profile?.username} className="text-sm sm:text-md"/>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                    id="email"
                                    type="email"
                                    defaultValue={user.email}
                                    disabled
                                    className="text-sm sm:text-md"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">First name</Label>
                                    <Input
                                    id="first-name"
                                    type="text"
                                    defaultValue={profile?.first_name}
                                    className="text-sm sm:text-md"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Last name</Label>
                                    <Input
                                    id="last-name"
                                    type="text"
                                    defaultValue={profile?.last_name}
                                    className="text-sm sm:text-md"
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2 mt-5">
                            <Button type="submit" className="hover:cursor-pointer">
                                Save Changes
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
                {/* Interviewe sessions seciton*/}
                <Card className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl px-0 sm:px-2 bg-zinc-100 dark:bg-zinc-900">
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardTitle className="text-2xl mt-3">Practice Interview Sessions</CardTitle>
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
                                {userSessions.slice(0, 3).map((session:any, index:number) => (
                                <SessionAccordionItem
                                    key={index}
                                    name={session.name}
                                    sessionData={session.session_data}
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