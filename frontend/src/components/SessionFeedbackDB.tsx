import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { type ResultData } from "@/types/ResultsData";

interface SessionFeedbackProps {
  resultsData: ResultData[];
}

export default function SessionFeedbackDB({ resultsData }: SessionFeedbackProps) {
  if (!resultsData || resultsData.length === 0) {
    return <p className="text-center text-muted-foreground">No feedback available yet...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
      <h1 className="text-3xl font-bold">Session Overview & Feedback</h1>

      <Accordion type="multiple" className="w-full">
        {resultsData.map((result, index) => {
          const analysis = result; // since your ResultData already contains strengths, weaknesses, tone, scores, etc.

          return (
            <AccordionItem value={index.toString()} key={result.id}>
              <AccordionTrigger className="text-lg font-semibold">
                Question {index + 1}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                <Card className="shadow-lg rounded-2xl">
                  <CardContent className="space-y-4">

                    {/* Question */}
                    <div>
                      <p className="font-semibold">Question:</p>
                      <p className="text-muted-foreground">{result.question}</p>
                    </div>

                    {/* Answer */}
                    <div>
                      <p className="font-semibold">Your Answer:</p>
                      <p className="text-muted-foreground">{result.answer}</p>
                    </div>

                    <Separator />

                    {/* Feedback */}
                    {analysis ? (
                      <div className="space-y-3">
                        {/* Tone */}
                        <div>
                          <p className="font-semibold">Tone:</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {analysis.tone.map((t, i) => (
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
                            {analysis.strengths.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        </div>

                        {/* Weaknesses */}
                        <div>
                          <p className="font-semibold">Weaknesses:</p>
                          <ul className="list-disc ml-6 text-muted-foreground">
                            {analysis.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                          </ul>
                        </div>

                        {/* Suggestions */}
                        <div>
                          <p className="font-semibold">Suggestions:</p>
                          <ul className="list-disc ml-6 text-muted-foreground">
                            {analysis.suggestions.map((s, i) => <li key={i}>{s}</li>)}
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