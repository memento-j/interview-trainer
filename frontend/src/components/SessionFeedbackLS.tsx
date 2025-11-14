import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Lightbulb, AlertCircle, Flame, BarChart3, ThumbsUp, CircleAlert, Volume2, FileText } from "lucide-react";
import type { ResultData } from "@/types/ResultsData";

interface SessionFeedbackProps {
  interviewSession: any;
}

export default function SessionFeedbackLS({ interviewSession }: SessionFeedbackProps) {
    const { questions, answers, feedback } = interviewSession;

    return (
    <div className="max-w-6xl mx-auto space-y-10 p-6">
        <p className="text-3xl font-semibold text-center mb-4 pb-2 bg-gradient-to-tr from-teal-600 to-teal-400 bg-clip-text text-transparent">
            Session Analysis
        </p>

        <Accordion type="multiple" className="space-y-5">
            {questions.map((question: string, index: number) => {
                const userAnswer = answers[index];
                const analysis: ResultData = feedback[index]?.analysis;
                if (!analysis) {
                    return null;
                }
                const averageScore = parseFloat(
                    ((analysis.scores.clarity + analysis.scores.relevance + analysis.scores.confidence + analysis.scores.structure 
                        + analysis.scores.impact + analysis.scores.conciseness) / 6).toFixed(2)
                );

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", duration: 0.5 }}
                    >
                        <AccordionItem
                            value={String(index)}
                            className="border border-border/50 rounded-2xl shadow-sm hover:shadow-md transition-all bg-zinc-100 dark:bg-zinc-950"
                        >
                            {/* Question Header */}
                            <AccordionTrigger className="text-lg font-semibold px-5 py-3 hover:bg-zinc-200 dark:hover:bg-zinc-950/40 transition-all rounded-t-2xl">
                                <div className="flex flex-row justify-between w-full">
                                    <div className="text-base font-semibold text-foreground/90">
                                        <p className="text-primary text-lg mb-1">Question {index + 1}: </p>
                                        <p className="font-normal text-[18px]">{question}</p>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md ${
                                            averageScore >= 7
                                                ? "bg-green-100/60 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                                : "bg-amber-100/60 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                                            }`}
                                        >
                                            <div className="flex items-center justify-center gap-2 p-1 w-[150px] md:w-[200px] text-[16px]">
                                                <p>{averageScore >= 7 ? <ThumbsUp/> : <CircleAlert/>}</p>
                                                <p>{Number.isNaN(averageScore) ? "Not Answered" : `Avg Score: ${averageScore}/10`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            {/* Question Feedback */}
                            <AccordionContent className="p-0">
                                <div className="shadow-sm rounded-2xl hover:shadow-md transition-all bg-zinc-100 dark:bg-zinc-950">
                                    <div className="space-y-4 text-sm p-5">
                                        {/* Answer Preview */}
                                        <div className="bg-zinc-200 dark:bg-zinc-900/50 rounded-lg p-3">
                                            <p className="font-semibold text-foreground text-lg">Your Answer:</p>
                                            <p className="mt-1 overflow-auto text-[16px]">
                                                {userAnswer}
                                            </p>
                                        </div>
                                        {/* Collapsible Analysis */}
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="analysis">
                                                <AccordionTrigger className="text-xl text-primary font-medium hover:cursor-pointer">
                                                    View Full Analysis
                                                </AccordionTrigger>
                                                <AccordionContent className="space-y-5 mt-2">
                                                    {/* Tone */}
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <AlertCircle className="w-4 h-4 text-teal-500" />
                                                            <p className="font-semibold text-xl">Tone</p>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {analysis.tone.map((t: string, i: number) => (
                                                                <Badge key={i} variant="outline" className="rounded-full text-[16px]">
                                                                {t}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {/* Delivery Tone */}
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <Volume2 className="w-4 h-4 text-teal-500" />
                                                            <p className="font-semibold text-xl">Delivery Tone</p>
                                                        </div>
                                                        <div className="bg-zinc-200 dark:bg-zinc-900/60 rounded-lg p-4 space-y-3">
                                                            <div className="grid md:grid-cols-3 text-center gap-3">
                                                                <div className="bg-zinc-100 dark:bg-zinc-800/70 rounded-lg p-2">
                                                                    <p className="text-sm font-medium text-zinc-500">Positive</p>
                                                                    <p className="text-lg font-semibold text-green-500">{analysis.deliveryTone.positive}%</p>
                                                                </div>
                                                                <div className="bg-zinc-100 dark:bg-zinc-800/70 rounded-lg p-2">
                                                                    <p className="text-sm font-medium text-zinc-500">Neutral</p>
                                                                    <p className="text-lg font-semibold text-yellow-500">{analysis.deliveryTone.neutral}%</p>
                                                                </div>
                                                                <div className="bg-zinc-100 dark:bg-zinc-800/70 rounded-lg p-2">
                                                                    <p className="text-sm font-medium text-zinc-500">Negative</p>
                                                                    <p className="text-lg font-semibold text-red-500">{analysis.deliveryTone.negative}%</p>
                                                                </div>
                                                            </div>
                                                            <div className="py-2 px-3 bg-zinc-100 dark:bg-zinc-900/40 rounded-lg border-l-4 border-teal-500">
                                                                <p className="text-[16px] text-zinc-700 dark:text-zinc-300 leading-relaxed font-semibold">
                                                                    {analysis.deliveryTone.summary}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* Scores Overview */}
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <BarChart3 className="w-4 h-4 text-teal-500" />
                                                            <p className="font-semibold text-xl">Scores</p>
                                                        </div>
                                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                            {[
                                                                { label: "Clarity", value: analysis.scores.clarity },
                                                                { label: "Relevance", value: analysis.scores.relevance },
                                                                { label: "Confidence", value: analysis.scores.confidence },
                                                                { label: "Impact", value: analysis.scores.impact },
                                                                { label: "Structure", value: analysis.scores.structure },
                                                                { label: "Conciseness", value: analysis.scores.conciseness },
                                                            ].map((s, i) => (
                                                            <div
                                                                key={i}
                                                                className="bg-zinc-200 dark:bg-zinc-900/60 rounded-lg py-2 px-3 flex justify-between"
                                                            >
                                                                <p className="font-semibold text-lg">{s.label}</p>
                                                                <p className="font-semibold text-lg">{s.value}/10</p>
                                                            </div>
                                                            ))}
                                                        </div>
                                                        <div className="mt-4 p-4 bg-zinc-200 dark:bg-zinc-900/60 rounded-lg border-l-4 border-teal-500">
                                                            <p className="text-lg font-semibold mb-1">Scores Summary</p>
                                                            <p className="text-[16px] text-zinc-700 dark:text-zinc-300 leading-relaxed font-semibold">
                                                                {analysis.scoresSummary}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="grid gap-6 lg:grid-cols-3">
                                                        {/* Strengths */}
                                                        <div className="rounded-2xl bg-green-50 dark:bg-green-950/40 p-5 shadow-sm hover:shadow-md transition-shadow">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <Flame className="w-5 h-5 text-green-500" />
                                                                <p className="font-semibold text-green-700 dark:text-green-300 text-lg">Strengths</p>
                                                            </div>
                                                            <ul className="space-y-2">
                                                                {analysis.strengths.map((s: string, i: number) => (
                                                                    <li key={i}
                                                                    className="flex items-start gap-2 text-green-700 dark:text-green-200 bg-green-100/60 dark:bg-green-900/40 rounded-lg px-3 py-2 hover:bg-green-200/60 dark:hover:bg-green-800/60 transition-colors text-center">
                                                                        <span className="text-sm md:text-base">{s}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        {/* Weaknesses */}
                                                        <div className="rounded-2xl bg-red-50 dark:bg-red-950/40 p-5 shadow-sm hover:shadow-md transition-shadow">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <AlertCircle className="w-5 h-5 text-red-500" />
                                                                <p className="font-semibold text-red-700 dark:text-red-300 text-lg">Weaknesses</p>
                                                            </div>
                                                            <ul className="space-y-2">
                                                                {analysis.weaknesses.map((w: string, i: number) => (
                                                                    <li key={i}
                                                                    className="flex items-start gap-2 text-red-700 dark:text-red-200 bg-red-100/60 dark:bg-red-900/40 rounded-lg px-3 py-2 hover:bg-red-200/60 dark:hover:bg-red-800/60 transition-colors text-center">
                                                                        <span className="text-sm md:text-base">{w}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        {/* Suggestions */}
                                                        <div className="rounded-2xl bg-yellow-50 dark:bg-yellow-950/40 p-5 shadow-sm hover:shadow-md transition-shadow">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <Lightbulb className="w-5 h-5 text-yellow-500" />
                                                                <p className="font-semibold text-yellow-700 dark:text-yellow-300 text-lg">Suggestions</p>
                                                            </div>
                                                            <ul className="space-y-2">
                                                                {analysis.suggestions.map((s: string, i: number) => (
                                                                    <li key={i}
                                                                    className="flex items-start gap-2 text-yellow-700 dark:text-yellow-200 bg-yellow-100/60 dark:bg-yellow-900/40 rounded-lg px-3 py-2 hover:bg-yellow-200/60 dark:hover:bg-yellow-800/60 transition-colors text-center">
                                                                        <span className="text-sm md:text-base">{s}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    {/* Overall Summary */}
                                                    <div className="mt-8">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <FileText className="w-4 h-4 text-teal-500" />
                                                            <p className="font-semibold text-xl">Overall Summary</p>
                                                        </div>
                                                        <div className="bg-zinc-200 dark:bg-zinc-900/60 rounded-lg py-3 px-4 border-l-4 border-teal-500">
                                                            <p className="text-lg leading-relaxed text-zinc-800 dark:text-zinc-200 text-center font-semibold">
                                                                {analysis.overallSummary}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </motion.div>
            );
            })}
        </Accordion>
    </div>
    );
}