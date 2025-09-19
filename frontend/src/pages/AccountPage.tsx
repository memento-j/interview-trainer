import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function AccountPage() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  function handleProfileChange() {

  }

  return (
    <div className="min-h-screen bg-zinc-300 dark:bg-zinc-800">
        <NavBar />
        {user && (
            <div className="flex flex-col items-center gap-5">
                <div className="flex w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl mt-15 mb-3 items-center justify-between">
                    <div className="flex flex-col ml-3">
                        <p className="text-3xl font-[500] mb-1.5">Hello {profile?.username} :)</p>
                        <p className="text-zinc-600 dark:text-zinc-400">View and manage your account info here.</p>
                    </div>
                    <Button className="hover:cursor-pointer mr-2" variant={"destructive"}
                        onClick={() => {
                            signOut();
                            navigate("/");
                        }}
                    >
                        Signout
                    </Button>
                </div>
                <Card className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-5xl xl:max-w-6xl px-0 sm:px-2 bg-zinc-100 dark:bg-zinc-900">
                    <CardHeader>
                        <CardTitle className="text-2xl mt-3">Profile Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <form>
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
                    </form>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button type="submit" className="hover:cursor-pointer">
                            Save Changes
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )}
    </div>
  );
}