import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function NotFoundPage() {
    return(
        <div className="flex flex-col items-center pt-50 min-h-screen bg-zinc-100 dark:bg-[#0F0F11]">
            <p className="text-5xl mb-10">
                404 page not found :(
            </p>
            <Link to="/">
                <Button>Go back home</Button>
            </Link>
        </div>
    );
}