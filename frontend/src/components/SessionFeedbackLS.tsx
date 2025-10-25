import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ClipboardList, AlertCircle, BarChart3, Flame, Lightbulb } from "lucide-react";

interface SessionFeedbackProps {
  interviewSession: any;
}

export default function SessionFeedbackLS({ interviewSession }: SessionFeedbackProps) {
    const { questions, answers, feedback } = interviewSession;

    return (
    <div className="max-w-6xl mx-auto space-y-10 p-6">
        <h1 className="text-3xl font-bold text-center mb-4">
            Session Results Overview
        </h1>

        <Accordion type="multiple" className="space-y-5">
            {questions.map((question: string, index: number) => {
                const userAnswer = answers[index];
                const analysis = feedback[index]?.analysis;
                if (!analysis) {
                    return null;
                }
                const averageScore = parseFloat(
                    ((analysis.scores.clarity + analysis.scores.relevance + analysis.scores.confidence) / 3).toFixed(2)
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
                                <span className="flex items-center gap-2">
                                    <ClipboardList className="w-5 h-5 text-primary" />
                                    Question {index + 1}
                                </span>
                                <span
                                    className={`ml-auto px-3 py-1 rounded-md text-sm ${
                                    averageScore >= 6
                                        ? "bg-green-100/60 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                        : "bg-amber-100/60 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                                    }`}
                                >
                                    {averageScore >= 6 ? "🌟" : "⚠️"} Avg: {averageScore}/10
                                </span>
                            </AccordionTrigger>
                            {/* Question Feedback */}
                            <AccordionContent>
                                <Card className="rounded-b-2xl border-t border-border/30 bg-zinc-100 dark:bg-zinc-950">
                                    <CardHeader>
                                        <CardTitle className="text-base font-semibold">
                                            {question}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-5 text-sm">
                                        {/* User Answer */}
                                        <div className="bg-muted/40 dark:bg-zinc-900/50 rounded-lg p-3">
                                            <p className="font-semibold text-foreground">
                                            Your Answer
                                            </p>
                                            <p className="text-muted-foreground mt-1 leading-relaxed">
                                            {userAnswer}
                                            </p>
                                        </div>
                                        {/* Tone */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <AlertCircle className="w-4 h-4 text-blue-500" />
                                                <p className="font-semibold">Tone</p>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {analysis.tone.map((t: string, i: number) => (
                                                    <Badge
                                                    key={i}
                                                    variant="outline"
                                                    className="rounded-full px-3 py-1"
                                                    >
                                                    {t}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        {/* Scores */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <BarChart3 className="w-4 h-4 text-green-500" />
                                                <p className="font-semibold">Scores</p>
                                            </div>
                                            <div className="flex flex-col md:flex-row gap-6 text-muted-foreground">
                                                <p>🗣️ Clarity: {analysis.scores.clarity}</p>
                                                <p>🎯 Relevance: {analysis.scores.relevance}</p>
                                                <p>💪 Confidence: {analysis.scores.confidence}</p>
                                            </div>
                                        </div>
                                        {/* Strengths */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Flame className="w-4 h-4 text-orange-500" />
                                                <p className="font-semibold">Strengths</p>
                                            </div>
                                                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                                {analysis.strengths.map((s: string, i: number) => (
                                                    <li key={i}>{s}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        {/* Weaknesses */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <AlertCircle className="w-4 h-4 text-red-500" />
                                                <p className="font-semibold">Weaknesses</p>
                                            </div>
                                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                                {analysis.weaknesses.map((w: string, i: number) => (
                                                    <li key={i}>{w}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        {/* Suggestions */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Lightbulb className="w-4 h-4 text-yellow-500" />
                                                <p className="font-semibold">Suggestions</p>
                                            </div>
                                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                                {analysis.suggestions.map((s: string, i: number) => (
                                                    <li key={i}>{s}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>
                    </motion.div>
                );
            })}
        </Accordion>
    </div>
    );
}