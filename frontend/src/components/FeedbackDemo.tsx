import { useTheme } from "@/contexts/ThemeContext";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
import { AlertCircle, Flame, Lightbulb } from "lucide-react";

export default function FeedbackDemo() {
    const { theme } = useTheme();
    const demoTones = ["professional", "collaborative", "confident", "proactive"]
    const demoStrengths = 
        [
            "The answer clearly demonstrates a concrete example of embracing a new system and guiding others through the transition.", 
            "It shows initiative by volunteering to learn the platform and creating an onboarding guide."
        ]
    const demoSuggestions =
        [
            "Frame the story with the job-relevant angle by tying the outcome to goals of the role you are interviewing for.", 
            "Include specific metrics and timeframes to quantify impact (e.g., X projects, Y% faster delivery).", 
            "Describe the initial challenges and how you addressed resistance with communication, training, and stakeholder alignment."
        ]

    return(
        <div className="pt-24 pb-36 bg-zinc-100 dark:bg-[#0F0F11] px-6">   
            {/* header */}
            <motion.div
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1]
                }}
                viewport={{ once: true }}
                className="text-center max-w-4xl mx-auto mb-20"
            >
                <p className="text-4xl sm:text-5xl font-[500] text-zinc-900 dark:text-white mb-6">
                    Know Exactly How You Perform
                </p>
                <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    AI-powered feedback highlights what you did well and what you can improve <br/>— helping you grow with every session.
                </p>
            </motion.div>
            <div className="relative w-full max-w-7xl mx-auto">
                {/* example image */}
                <motion.div
                    className="flex justify-center"
                >
                    {theme === "light" ? (
                        <img src="feedbackdemolight.png" className="rounded-2xl shadow-lg" loading="lazy"/>
                    ) : (
                        <img src="feedbackdemo.png" className="rounded-2xl" loading="lazy"/>
                    )}
                </motion.div>
                {/* large screen view */}
                <div className="hidden lg:flex">
                    {/* tone example */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, type: "spring", ease: "easeInOut" }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.03, boxShadow: "0px 10px 30px rgba(0,0,0,0.10)" }}
                        className="absolute top-8 left-20 bg-gradient-to-br from-white/95 to-zinc-100/95 dark:from-zinc-900/97 dark:to-zinc-800/97 p-4 rounded-2xl shadow-lg max-w-3xs"
                    >
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                            <p className="font-semibold text-xl">Tone</p>
                        </div>
                        {demoTones.map((t: string, i: number) => (
                            <Badge key={i} variant="outline" className="rounded-full text-[16px] mt-1 ml-0.5">
                                {t}
                            </Badge>
                        ))}
                    </motion.div>
                    {/* strengths example */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, type: "spring", ease: "easeInOut" }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.03, boxShadow: "0px 10px 30px rgba(0,0,0,0.10)" }}
                        className="absolute top-70 left-16 bg-gradient-to-br from-white/95 to-zinc-100/95 dark:from-zinc-900/97 dark:to-zinc-800/97 p-4 rounded-2xl shadow-lg max-w-2xs"
                    >
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Flame className="w-5 h-5 text-green-500" />
                            <p className="font-semibold text-lg">Strengths</p>
                        </div>
                        <ul className="space-y-2">
                            {demoStrengths.map((s: string, i: number) => (
                                <li key={i}
                                className="flex items-start gap-2 text-green-700 dark:text-green-200 bg-green-100/60 dark:bg-green-900/40 rounded-lg px-3 py-2 hover:bg-green-200/60 dark:hover:bg-green-800/60 transition-colors text-center">
                                    <span className="text-sm md:text-base">{s}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    {/* suggestions example */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, type: "spring", ease: "easeInOut" }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.03, boxShadow: "0px 10px 30px rgba(0,0,0,0.10)" }}
                        className="absolute top-28 right-14 bg-gradient-to-bl from-white/95 to-zinc-100/95 dark:from-zinc-900/97 dark:to-zinc-800/97 p-4 rounded-2xl shadow-lg max-w-2xs"
                    >
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Lightbulb className="w-5 h-5 text-yellow-500" />
                            <p className="font-semibold text-lg">Suggestions</p>
                        </div>
                        <ul className="space-y-2">
                            {demoSuggestions.map((s: string, i: number) => (
                                <li key={i}
                                className="flex items-start gap-2 text-yellow-700 dark:text-yellow-200 bg-yellow-100/60 dark:bg-yellow-900/40 rounded-lg px-3 py-2 hover:bg-yellow-200/60 dark:hover:bg-yellow-800/60 transition-colors text-center">
                                    <span className="text-sm md:text-base">{s}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* small screen view */}
                <div className="flex flex-col items-center lg:hidden mt-5 gap-3">
                    {/* strengths example */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, type: "spring", ease: "easeInOut" }}
                        viewport={{ once: true }}
                        className="rounded-2xl max-w-2xl bg-gradient-to-br from-white/95 to-zinc-100/95 dark:from-zinc-900/97 dark:to-zinc-800/97 p-5 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Flame className="w-5 h-5 text-green-500" />
                            <p className="font-semibold text-green-700 dark:text-green-300 text-lg">Strengths</p>
                        </div>
                        <ul className="space-y-2">
                            {demoStrengths.map((s: string, i: number) => (
                                <li key={i}
                                className="flex items-start gap-2 text-green-700 dark:text-green-200 bg-green-100/60 dark:bg-green-900/40 rounded-lg px-3 py-2 hover:bg-green-200/60 dark:hover:bg-green-800/60 transition-colors text-center">
                                    <span className="text-sm md:text-base">{s}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    {/* suggestions example */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, type: "spring", ease: "easeInOut" }}
                        viewport={{ once: true }}
                        className="rounded-2xl max-w-2xl bg-gradient-to-bl from-white/95 to-zinc-100/95 dark:from-zinc-900/97 dark:to-zinc-800/97 p-5 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <Lightbulb className="w-5 h-5 text-yellow-500" />
                            <p className="font-semibold text-yellow-700 dark:text-yellow-300 text-lg">Suggestions</p>
                        </div>
                        <ul className="space-y-2">
                            {demoSuggestions.map((s: string, i: number) => (
                                <li key={i}
                                className="flex items-start gap-2 text-yellow-700 dark:text-yellow-200 bg-yellow-100/60 dark:bg-yellow-900/40 rounded-lg px-3 py-2 hover:bg-yellow-200/60 dark:hover:bg-yellow-800/60 transition-colors text-center">
                                    <span className="text-sm md:text-base">{s}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}