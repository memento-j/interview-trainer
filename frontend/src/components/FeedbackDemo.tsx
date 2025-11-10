import { useTheme } from "@/contexts/ThemeContext";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function FeedbackDemo() {
    const { theme } = useTheme();

    const demoTones = ["professional", "collaborative", "confident", "proactive"]

    return(
        <div className="pt-24 pb-36 bg-zinc-100 dark:bg-[#0F0F11] px-6">   
            {/* header */}
            <div className="text-center max-w-4xl mx-auto mb-28">
                <p className="text-4xl sm:text-5xl font-[500] text-zinc-900 dark:text-white mb-6">
                    Know Exactly How You Perform
                </p>
                <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    AI-powered feedback highlights what you did well and what you can improve <br/>— helping you grow with every session.
                </p>
            </div>
            <div className="relative w-full max-w-7xl mx-auto">
                {/* example image */}
                <div className="flex justify-center">
                    {theme === "light" ? (
                        <img src="feedbackdemolight.png" className="rounded-2xl shadow-lg" loading="lazy"/>
                    ) : (
                        <img src="feedbackdemo.png" className="rounded-2xl" loading="lazy"/>
                    )}
                </div>
                {/* tone example */}
                <div className="absolute top-8 left-28 bg-white/50 dark:bg-black/30 p-4 rounded-2xl shadow-lg max-w-3xs">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                        <p className="font-semibold text-xl">Tone</p>
                    </div>
                    {demoTones.map((t: string, i: number) => (
                        <Badge key={i} variant="outline" className="rounded-full text-[16px]">
                            {t}
                        </Badge>
                    ))}
                </div>

            </div>
        </div>
    );
}