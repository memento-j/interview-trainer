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
import { AlertCircle, BarChart3, Lightbulb, Flame, Trash2, ClipboardList } from "lucide-react";

interface SessionAccordionItemProps {
    allSessionData: {
        questionsData: QuestionsData[];
        resultsData: ResultData[];
        sessionData: SessionData;
    };
}

//displays session data
export default function SessionAccordionItem({ allSessionData }: SessionAccordionItemProps) {
    const { questionsData, resultsData, sessionData } = allSessionData;    
    const { user, session } = useAuth();

    //deletes session from db
    async function handleDeleteSession() {
        try {
            const deleteRes = await axios.delete(`http://localhost:8080/interview-sessions/${sessionData.id}`, {
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
        <AccordionItem value={sessionData.name}>
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
                    const averageScore = parseFloat(
                        ((result?.scores?.clarity + result?.scores?.relevance + result?.scores?.confidence) / 3).toFixed(2)
                    ); 
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
                                        <span className="text-primary">Question {index + 1}</span>:{" "}
                                        <span className="font-normal">{questionData.question}</span>
                                    </CardTitle>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md ${
                                            averageScore >= 6
                                                ? "bg-green-100/60 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                                : "bg-amber-100/60 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                                            }`}
                                        >
                                            <p className="w-[150px] text-center">{averageScore >= 6 ? "🌟 " : "⚠️ "} 
                                                {Number.isNaN(averageScore) ? "Not Answered" : `Avg Score: ${averageScore}/10`}
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>
                                {/* Question feedback */}
                                { result && (
                                    <CardContent className="space-y-4 text-sm">
                                        {/* Answer Preview */}
                                        <div className="bg-muted/40 dark:bg-zinc-900/50 rounded-lg p-3">
                                            <p className="font-semibold text-foreground">Your Answer</p>
                                            <p className="text-muted-foreground mt-1 overflow-auto">
                                                {result.answer}
                                            </p>
                                        </div>
                                        {/* Collapsible Analysis */}
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="analysis">
                                                <AccordionTrigger className="text-sm text-primary font-medium hover:cursor-pointer">
                                                    View Full Analysis
                                                </AccordionTrigger>
                                                <AccordionContent className="space-y-5 mt-2">
                                                    {/* Tone */}
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <AlertCircle className="w-4 h-4 text-blue-500" />
                                                            <p className="font-semibold">Tone</p>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {result.tone.map((t: string, i: number) => (
                                                                <Badge key={i} variant="outline" className="rounded-full">
                                                                {t}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {/* Scores Overview */}
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <BarChart3 className="w-4 h-4 text-green-500" />
                                                            <p className="font-semibold">Scores</p>
                                                        </div>
                                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                            {[
                                                            { label: "Clarity", value: result.scores.clarity },
                                                            { label: "Relevance", value: result.scores.relevance },
                                                            { label: "Confidence", value: result.scores.confidence },
                                                            ].map((s, i) => (
                                                            <div
                                                                key={i}
                                                                className="bg-muted/40 dark:bg-zinc-900/60 rounded-lg py-2 px-3 flex justify-between"
                                                            >
                                                                <p>{s.label}</p>
                                                                <p className="font-semibold">{s.value}/10</p>
                                                            </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    {/* Strengths */}
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Flame className="w-4 h-4 text-orange-500" />
                                                            <p className="font-semibold">Strengths</p>
                                                        </div>
                                                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                                                            {result.strengths.map((s: string, i: number) => (
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
                                                        {result.weaknesses.map((w: string, i: number) => (
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
                                                        {result.suggestions.map((s: string, i: number) => (
                                                            <li key={i}>{s}</li>
                                                        ))}
                                                        </ul>
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