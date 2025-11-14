import axios from "axios";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter,  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { type SessionData } from "@/types/SessionData";
import { type ResultData } from "@/types/ResultsData";
import { type QuestionsData } from "@/types/QuestionData";
import { motion } from "framer-motion";
import { AlertCircle, BarChart3, Lightbulb, Flame, Trash2, ClipboardList, CircleAlert, ThumbsUp, Volume2, FileText } from "lucide-react";

interface SessionAccordionItemProps {
    allSessionData: {
        questionsData: QuestionsData[];
        resultsData: ResultData[];
        sessionData: SessionData;
    };
}

const apiUrl = import.meta.env.VITE_API_URL;

//displays session data
export default function SessionAccordionItem({ allSessionData }: SessionAccordionItemProps) {
    const { questionsData, resultsData, sessionData } = allSessionData;    
    const { user, session } = useAuth();
    
    //deletes session from db
    async function handleDeleteSession() {
        try {
            const deleteRes = await axios.delete(`${apiUrl}/interview-sessions/${sessionData.id}`, {
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                },
                data: {
                    id: user?.id
                },
            })
            if (deleteRes.status == 204) {
                console.log("Deleted Successfully");
                //refresh page
                window.location.reload();
            }
        } catch(err) {
            console.log(err);
        }  
    }    
    return (
        <AccordionItem value={sessionData.id} className="border-none">
            {/* Session Header */}
            <AccordionTrigger className="text-lg font-semibold bg-zinc-200/50 dark:bg-zinc-950 px-4 py-3 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-950/40 transition-all hover:cursor-pointer">
                <span className="flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-primary" />
                    {sessionData.name}
                    <span className="text-muted-foreground text-sm mt-0.5">
                        ({sessionData.role})
                    </span>
                </span>
            </AccordionTrigger>
            {/* Session Content (Each individual question/answer/feedback) */}
            <AccordionContent className="flex flex-col gap-5 mt-4">
                {questionsData.map((questionData: any, index: number) => {
                    const result = resultsData[index];
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ type: "spring", duration: 0.5 }}
                        >
                            <Card className="shadow-sm border border-border/50 rounded-2xl hover:shadow-md transition-all bg-zinc-100 dark:bg-zinc-950">
                                {/* Question Preview */}
                                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                    <CardTitle className="text-base font-semibold text-foreground/90">
                                        <p className="text-primary text-lg mb-1">Question {index + 1}: </p>
                                        <span className="font-normal text-[18px]">{questionData.question}</span>
                                    </CardTitle>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md ${
                                            result?.averageScore >= 6
                                                ? "bg-green-100/60 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                                : "bg-amber-100/60 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                                            }`}
                                        >
                                            <div className="flex items-center justify-center gap-2 p-1 w-[150px] md:w-[200px] text-[16px]">
                                                <p>{result?.averageScore >= 6 ? <ThumbsUp/> : <CircleAlert/>}</p>
                                                <p>{Number.isNaN(result?.averageScore) ? "Not Answered" : `Avg Score: ${result?.averageScore}/10`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                {/* Question feedback */}
                                { result && (
                                    <CardContent className="space-y-4 text-sm">
                                        {/* Answer Preview */}
                                        <div className="bg-zinc-200 dark:bg-zinc-900/50 rounded-lg p-3">
                                            <p className="font-semibold text-foreground text-lg">Your Answer:</p>
                                            <p className="mt-1 overflow-auto text-[16px]">
                                                {result.answer}
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
                                                            {result.tone.map((t: string, i: number) => (
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
                                                                    <p className="text-lg font-semibold text-green-500">{result.deliveryTone.positive}%</p>
                                                                </div>
                                                                <div className="bg-zinc-100 dark:bg-zinc-800/70 rounded-lg p-2">
                                                                    <p className="text-sm font-medium text-zinc-500">Neutral</p>
                                                                    <p className="text-lg font-semibold text-yellow-500">{result.deliveryTone.neutral}%</p>
                                                                </div>
                                                                <div className="bg-zinc-100 dark:bg-zinc-800/70 rounded-lg p-2">
                                                                    <p className="text-sm font-medium text-zinc-500">Negative</p>
                                                                    <p className="text-lg font-semibold text-red-500">{result.deliveryTone.negative}%</p>
                                                                </div>
                                                            </div>
                                                            <div className="py-2 px-3 bg-zinc-100 dark:bg-zinc-900/40 rounded-lg border-l-4 border-teal-500">
                                                                <p className="text-[16px] text-zinc-700 dark:text-zinc-300 leading-relaxed font-semibold">
                                                                    {result.deliveryTone.summary}
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
                                                                { label: "Clarity", value: result.scores.clarity },
                                                                { label: "Relevance", value: result.scores.relevance },
                                                                { label: "Confidence", value: result.scores.confidence },
                                                                { label: "Impact", value: result.scores.impact },
                                                                { label: "Structure", value: result.scores.structure },
                                                                { label: "Conciseness", value: result.scores.conciseness },
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
                                                                {result.scoresSummary}
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
                                                                {result.strengths.map((s: string, i: number) => (
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
                                                                {result.weaknesses.map((w: string, i: number) => (
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
                                                                {result.suggestions.map((s: string, i: number) => (
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
                                                                {result.overallSummary}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </CardContent>
                                )}
                            </Card>
                        </motion.div>
                    );
                })}
                {/* Delete Session */}
                <div className="flex justify-end mt-6">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                            variant="destructive"
                            className="hover:cursor-pointer mt-2 flex items-center gap-2"
                            >
                            <Trash2 className="w-4 h-4" /> Delete {sessionData.name}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete{" "}
                                    <span className="font-semibold">{sessionData.name}</span> and
                                    remove your data.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel className="hover:cursor-pointer">Cancel</AlertDialogCancel>
                            <AlertDialogAction className="hover:cursor-pointer" onClick={handleDeleteSession}>
                                Continue
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}