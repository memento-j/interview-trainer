import { Navigate } from 'react-router'
import { useAuth } from "@/contexts/AuthContext";
import { toast } from 'sonner';
import { motion } from "framer-motion";
import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
    //current session and supabase client from context
    const { session } = useAuth();

    //when there is a current session, navigate to homepage
    if (session) {
        toast.success("You are signed in");
        return (<Navigate to="/"/>)
    }

    // otherwise, user sees auth componenet where they can signin or out
    return (
        //supabase auth component
        <div className="min-h-screen flex items-center justify-center pb-50 bg-zinc-100 dark:bg-[#0F0F11] text-zinc-50">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, type: "spring", ease: "easeInOut" }}
                viewport={{ once: true }}
                className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-5xl xl:max-w-6xl"
            >
                <LoginForm/>
            </motion.div>
        </div>
    )
}