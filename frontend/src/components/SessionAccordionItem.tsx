import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter,  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface SessionAccordionItemProps {
    name: string;
    sessionId: string;
    sessionData: {
      questions: string[];
      answers: string[];
      feedback: {
        analysis: {
          tone: string[],
          scores: {
            clarity: number
            relevance: number
            confidence: number
          },
          summary: string[],
          strengths: string[],
          weaknesses: string[],
          suggestions: string[]
        }
      }[];
    };
}

//displays session data
export default function SessionAccordionItem({ name, sessionId, sessionData }: SessionAccordionItemProps) {
    const { questions, answers, feedback } = sessionData;    

    //deletes session from db
    async function handleDeleteSession() {
        try {
            const deleteRes = await axios.delete(`http://localhost:8080/interview-sessions/${sessionId}`)
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
    <AccordionItem value={name}>
        <AccordionTrigger className="text-lg font-semibold">{name}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
            {questions.map((question, index) => {
                const userAnswer = answers[index];
                const analysis = feedback[index]?.analysis;
                return(
                    <Card key={index} className="shadow-lg rounded-2xl">
                        <CardContent className="space-y-4">
                            {/* Question */}
                            <div>
                                <p className="font-semibold">Question {index+1}:</p>
                                <p className="text-muted-foreground">{question}</p>
                            </div>
                            {/* Answer */}
                            <div>
                                <p className="font-semibold">Your Answer:</p>
                                <p className="text-muted-foreground">{userAnswer}</p>
                            </div>
                            <Separator />
                            {/* Feedback */}
                            {analysis ? (
                                <div className="space-y-3">
                                    {/* Tone */}
                                    <div>
                                        <p className="font-semibold">Tone:</p>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                        {analysis.tone.map((t: string, i: number) => (
                                            <Badge key={i} variant="secondary">{t}</Badge>
                                        ))}
                                        </div>
                                    </div>
                                    {/* Scores */}
                                    <div>
                                        <p className="font-semibold mb-1">Scores:</p>
                                        <ul className="list-disc ml-6 text-muted-foreground">
                                        <li>Clarity: {analysis.scores.clarity}/10</li>
                                        <li>Relevance: {analysis.scores.relevance}/10</li>
                                        <li>Confidence: {analysis.scores.confidence}/10</li>
                                        </ul>
                                    </div>
                                    {/* Summary */}
                                    <div>
                                        <p className="font-semibold">Summary:</p>
                                        <ul className="list-disc ml-6 text-muted-foreground">
                                        {analysis.summary.map((line: string, i: number) => (
                                            <li key={i}>{line}</li>
                                        ))}
                                        </ul>
                                    </div>
                                    {/* Strengths */}
                                    <div>
                                        <p className="font-semibold">Strengths:</p>
                                        <ul className="list-disc ml-6 text-muted-foreground">
                                        {analysis.strengths.map((strength: string, i: number) => (
                                            <li key={i}>{strength}</li>
                                        ))}
                                        </ul>
                                    </div>
                                    {/* Weaknesses */}
                                    <div>
                                        <p className="font-semibold">Weaknesses:</p>
                                        <ul className="list-disc ml-6 text-muted-foreground">
                                        {analysis.weaknesses.map((weakness: string, i: number) => (
                                            <li key={i}>{weakness}</li>
                                        ))}
                                        </ul>
                                    </div>
                                    {/* Suggestions */}
                                    <div>
                                        <p className="font-semibold">Suggestions:</p>
                                        <ul className="list-disc ml-6 text-muted-foreground">
                                        {analysis.suggestions.map((suggesstion: string, i: number) => (
                                            <li key={i}>{suggesstion}</li>
                                        ))}
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    Feedback not available yet.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
            <div className="flex justify-end">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="hover:cursor-pointer">Delete {name}</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete {name} and remove your data from our servers.
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