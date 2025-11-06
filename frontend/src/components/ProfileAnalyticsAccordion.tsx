import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";
import { BarChart2, CheckCircle, AlertTriangle, Lightbulb, Users, MessageCircle, TrendingUp, Flame } from "lucide-react";
import { type UserAnalysis } from "@/types/UserAnalysis";

interface ProfileAnalyticsProps {
  userAnalysis: UserAnalysis;
}

export default function ProfileAnalytics({ userAnalysis }: ProfileAnalyticsProps) {
    const motionVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

    function scoreBar(score: number) {
        const widthPercent = (score / 10) * 100;
        console.log(widthPercent);
        //tailwind generates classes at build time, not dynamically, so must use the style arguement for things that change at runtime
        return (
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-3 rounded-full overflow-hidden">
                <div className={`bg-green-500 h-3 rounded-full`} style={{ width: `${widthPercent}`}}/>
            </div>
        );
    };

  return (
    <Accordion type="multiple" className="space-y-4">
        {/* Totals */}
        <AccordionItem value="totals">
            <AccordionTrigger>
                <div className="flex items-center gap-2 font-semibold text-xl">
                    <CheckCircle className="w-5 h-5 text-green-500" /> Totals
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={motionVariants}
                    transition={{ duration: 0.3 }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex flex-col items-center p-2">
                            <Users className="w-5 h-5 text-blue-500 mb-1" />
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Sessions</p>
                            <p className="text-xl font-bold">{userAnalysis.totalSessions}</p>
                        </div>
                        <div className="flex flex-col items-center p-2">
                            <BarChart2 className="w-5 h-5 text-purple-500 mb-1" />
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Answers</p>
                            <p className="text-xl font-bold">{userAnalysis.totalAnswers}</p>
                        </div>
                        <div className="flex flex-col items-center p-2">
                            <MessageCircle className="w-5 h-5 text-yellow-500 mb-1" />
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">Most Common Tone</p>
                            <p className="text-xl font-bold">{userAnalysis.toneInsights.mostCommonTone}</p>
                        </div>
                        <div className="flex flex-col items-center p-2">
                            <TrendingUp className="w-5 h-5 text-red-500 mb-1" />
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">Most Common Tone Count</p>
                            <p className="text-xl font-bold">{userAnalysis.toneInsights.mostCommonCount}</p>
                        </div>
                    </div>
                </motion.div>
            </AccordionContent>
        </AccordionItem>
        {/* Average Scores */}
        <AccordionItem value="scores">
            <AccordionTrigger>
                <div className="flex items-center gap-2 font-semibold  text-xl">
                    <BarChart2 className="w-5 h-5 text-purple-500" /> Average Scores
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={motionVariants}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                >
                {Object.entries(userAnalysis.overallAverages).map(([key, score]) => (
                    <div key={key} className="flex flex-col">
                        <div className="flex justify-between mb-1">
                            <span className="capitalize font-medium">{key}</span>
                            <span className="font-semibold">{score.toFixed(2)}</span>
                        </div>
                        {scoreBar(score)}
                    </div>
                ))}
                </motion.div>
            </AccordionContent>
        </AccordionItem>
        {/* Strengths */}
        <AccordionItem value="strengths">
        <AccordionTrigger>
            <div className="flex items-center gap-2 font-semibold text-xl">
                <Flame className="w-5 h-5 text-green-500" /> Common Strengths
            </div>
        </AccordionTrigger>
        <AccordionContent>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={motionVariants}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
            >
            {userAnalysis.mostCommonStrengths.map((strength, i) => (
                <div key={i}
                className="flex justify-center items-center p-3 bg-green-50 dark:bg-green-900 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-default text-center">
                    <p className="text-sm md:text-base font-medium text-green-700 dark:text-green-200">
                        {strength}
                    </p>
                </div>
            ))}
            </motion.div>
        </AccordionContent>
        </AccordionItem>
        {/* Weaknesses */}
        <AccordionItem value="weaknesses">
            <AccordionTrigger>
                <div className="flex items-center gap-2 font-semibold text-xl">
                    <AlertTriangle className="w-5 h-5 text-red-500" /> Common Weaknesses
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={motionVariants}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
                >
                {userAnalysis.mostCommonWeaknesses.map((weakness, i) => (
                    <div
                    key={i}
                    className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-default"
                    >
                        <p className="text-sm md:text-base text-center font-medium text-red-700 dark:text-red-200">
                            {weakness}
                        </p>
                    </div>
                ))}
                </motion.div>
            </AccordionContent>
        </AccordionItem>
        {/* Suggestions */}
        <AccordionItem value="suggestions">
            <AccordionTrigger>
                <div className="flex items-center gap-2 font-semibold text-xl">
                    <Lightbulb className="w-5 h-5 text-yellow-500" /> Overall Suggestions
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={motionVariants}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
                >
                {userAnalysis.suggestions.map((suggestion, i) => (
                    <div key={i}
                    className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-default">
                        <p className="text-sm md:text-base text-center font-medium text-yellow-700 dark:text-yellow-200">
                            {suggestion}
                        </p>
                    </div>
                ))}
                </motion.div>
            </AccordionContent>
        </AccordionItem>

    </Accordion>
  );
}