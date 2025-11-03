import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";
import { BarChart2, CheckCircle, AlertTriangle, Lightbulb, Users, MessageCircle, TrendingUp } from "lucide-react";
import { type UserAnalysis } from "@/types/UserAnalysis";

interface ProfileAnalyticsProps {
  userAnalysis: UserAnalysis;
}

export default function ProfileAnalytics({ userAnalysis }: ProfileAnalyticsProps) {
    const maxScore = 10;
    const maxToneCount = Math.max(...Object.values(userAnalysis.toneInsights.frequencies), 1);

    const scoreBar = (score: number) => {
        const widthPercent = (score / maxScore) * 100;
        return (
        <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-3 rounded-full overflow-hidden">
            <div className="bg-green-500 h-3 rounded-full" style={{ width: `${widthPercent}%` }} />
        </div>
        );
    };

    const toneBar = (count: number) => {
        const widthPercent = (count / maxToneCount) * 100;
        return (
        <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${widthPercent}%` }} />
        </div>
        );
    };

    const motionVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    };

  return (
    <Accordion type="multiple" className="space-y-4">
        {/* Totals */}
        <AccordionItem value="totals">
            <AccordionTrigger>
                <div className="flex items-center gap-2 font-semibold">
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
                <div className="flex items-center gap-2 font-semibold">
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
        {/* Tone Frequencies */}
        <AccordionItem value="toneFrequencies">
            <AccordionTrigger>
                <div className="flex items-center gap-2 font-semibold">
                    <BarChart2 className="w-5 h-5 text-blue-500" /> Tone Frequencies
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={motionVariants}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                >
                {Object.entries(userAnalysis.toneInsights.frequencies).map(([tone, count]) => (
                    <div key={tone} className="flex items-center gap-2">
                        <span className="w-32 text-sm font-medium capitalize">{tone}</span>
                        {toneBar(count)}
                        <span className="ml-2 text-sm font-medium">{count}</span>
                    </div>
                ))}
                </motion.div>
            </AccordionContent>
        </AccordionItem>
        {/* Strengths */}
        <AccordionItem value="strengths">
            <AccordionTrigger>
                <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle className="w-5 h-5 text-teal-500" /> Common Strengths
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
                    <div
                    key={i}
                    className="flex items-center gap-2 p-3 bg-teal-50 dark:bg-teal-950 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-default"
                    >
                    <p className="text-sm md:text-base text-center font-medium text-teal-700 dark:text-teal-200">
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
                <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle className="w-5 h-5 text-teal-400" /> Common Weaknesses
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
                    <div key={i} 
                    className="flex items-center gap-2 p-3 bg-teal-100 dark:bg-teal-900 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-default">
                        <p className="text-sm md:text-base text-center font-medium text-teal-600 dark:text-teal-300">
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
                <div className="flex items-center gap-2 font-semibold">
                    <Lightbulb className="w-5 h-5 text-teal-300" /> Overall Suggestions
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
                    className="flex items-center gap-2 p-3 bg-teal-200 dark:bg-teal-800 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-default">
                        <p className="text-sm md:text-base text-center font-medium text-teal-700 dark:text-teal-100">
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