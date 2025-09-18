import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";



export default function AccountPage() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-zinc-300 dark:bg-zinc-800">
        <NavBar />
        {user && (
            <div>
                <p>Hello {profile?.first_name} :)</p>
                <p>Email {user?.email}</p>
                <Button onClick={() => {
                    signOut();
                    navigate("/");
                }}>
                    Signout
                </Button>
            </div>
        )}
    </div>
  );
}