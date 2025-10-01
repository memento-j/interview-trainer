import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useAuth } from "@/contexts/AuthContext";

interface SessionFeedbackProps {
  interviewSession: any; // ideally you’d replace this with a proper type
}

export default function SessionFeedback({ interviewSession }: SessionFeedbackProps) {
    const { user } = useAuth();

    if (!interviewSession) {
        return <p className="text-center text-muted-foreground">Loading session data...</p>;
    }

    //data is structured differently depending on if it is coming from local storage or the db
    const sessionData = user ? interviewSession.session_data : interviewSession;
    const { questions, answers, feedback } = sessionData;

    return (
        <div className="max-w-6xl mx-auto space-y-8 p-6">
            <h1 className="text-3xl font-bold">Session Overview & Feedback</h1>
            <Accordion
                    type="multiple"
                    className="w-full"
                >
                {questions.map((question: string, index: number) => {
                    const userAnswer = answers[index];
                    const analysis = feedback[index]?.analysis;
                    return (
                        <AccordionItem value={index.toString()} key={index}>
                            <AccordionTrigger className="text-lg font-semibold">Question {index + 1}</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4">
                                <Card key={index} className="shadow-lg rounded-2xl">
                                    <CardContent className="space-y-4">
                                    {/* Question */}
                                    <div>
                                        <p className="font-semibold">Question:</p>
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
                                        {/* Strengths */}
                                        <div>
                                            <p className="font-semibold">Strengths:</p>
                                            <ul className="list-disc ml-6 text-muted-foreground">
                                            {analysis.strengths.map((s: string, i: number) => (
                                                <li key={i}>{s}</li>
                                            ))}
                                            </ul>
                                        </div>
                                        {/* Weaknesses */}
                                        <div>
                                            <p className="font-semibold">Weaknesses:</p>
                                            <ul className="list-disc ml-6 text-muted-foreground">
                                            {analysis.weaknesses.map((w: string, i: number) => (
                                                <li key={i}>{w}</li>
                                            ))}
                                            </ul>
                                        </div>
                                        {/* Suggestions */}
                                        <div>
                                            <p className="font-semibold">Suggestions:</p>
                                            <ul className="list-disc ml-6 text-muted-foreground">
                                            {analysis.suggestions.map((s: string, i: number) => (
                                                <li key={i}>{s}</li>
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
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    );
}