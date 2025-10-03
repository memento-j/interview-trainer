import axios from "axios";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter,  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { type SessionData } from "@/types/SessionData";
import { type ResultData } from "@/types/ResultsData";
import { type QuestionsData } from "@/types/QuestionData";

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
    const { session } = useAuth();

    //deletes session from db
    async function handleDeleteSession() {
        try {
            const deleteRes = await axios.delete(`http://localhost:8080/interview-sessions/${sessionData.id}`, {
                headers: {
                  Authorization: `Bearer ${session?.access_token}`,
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
        <AccordionTrigger className="text-lg font-semibold">{sessionData.name} ({sessionData.role})</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
            {questionsData.map((questionData: any, index: number) => {
                const result = resultsData[index];
                return(
                    <Card key={index} className="shadow-lg rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold">
                                Question: <span className="font-normal">{questionData.question}</span>
                            </CardTitle>
                        </CardHeader>

                        {result && (
                        <CardContent className="space-y-4">
                            {/* Answer */}
                            <div>
                                <p className="text-sm font-semibold">Your Answer</p>
                                <p className="text-muted-foreground">{result.answer}</p>
                            </div>

                            <Separator />

                            {/* Tone */}
                            <div>
                                <p className="text-sm font-semibold mb-1">Tone</p>
                                <div className="flex flex-wrap gap-2">
                                    {result.tone.map((t, i) => (
                                    <Badge key={i} variant="secondary">
                                        {t}
                                    </Badge>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            {/* Scores */}
                            <div>
                                <p className="text-sm font-semibold mb-1">Scores</p>
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                    <span>Clarity: {result.scores.clarity}</span>
                                    <span>Relevance: {result.scores.relevance}</span>
                                    <span>Confidence: {result.scores.confidence}</span>
                                </div>
                            </div>

                            <Separator />

                            {/* Strengths */}
                            <div>
                                <p className="text-sm font-semibold mb-1">Strengths</p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    {result.strengths.map((s, i) => (
                                    <li key={i}>{s}</li>
                                    ))}
                                </ul>
                            </div>

                            <Separator />

                            {/* Weaknesses */}
                            <div>
                                <p className="text-sm font-semibold mb-1">Weaknesses</p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    {result.weaknesses.map((w, i) => (
                                    <li key={i}>{w}</li>
                                    ))}
                                </ul>
                            </div>

                            <Separator />

                            {/* Suggestions */}
                            <div>
                                <p className="text-sm font-semibold mb-1">Suggestions</p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                    {result.suggestions.map((s, i) => (
                                    <li key={i}>{s}</li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                        )}
                    </Card>
                );
            })}
            <div className="flex justify-end">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="hover:cursor-pointer">Delete {sessionData.name}</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete {sessionData.name} and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteSession}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AccordionContent>
    </AccordionItem>
    );
}