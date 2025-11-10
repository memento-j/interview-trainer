import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { type ResultData } from "@/types/ResultsData";
import { motion } from "framer-motion";
import { Lightbulb, AlertCircle, Flame, BarChart3, ClipboardList } from "lucide-react";

interface SessionFeedbackProps {
  resultsData: ResultData[];
}

export default function SessionFeedbackDB({ resultsData }: SessionFeedbackProps) {
  if (!resultsData || resultsData.length === 0) {
    return <p className="text-center text-muted-foreground">No feedback available yet...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 p-6">
      <h1 className="text-3xl font-bold text-center mb-4 pb-2 bg-gradient-to-tr from-teal-600 to-teal-400 bg-clip-text text-transparent">
        Session Analysis
      </h1>

      <Accordion type="multiple" className="space-y-5">
        {resultsData.map((result, index) => {
          const averageScore = parseFloat(
            ((result.scores.clarity + result.scores.relevance + result.scores.confidence) / 3).toFixed(2)
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
                    {averageScore >= 6 ? "🌟" : "⚠️"} Avg Score: {averageScore}/10
                  </span>
                </AccordionTrigger>

                {/* Accordion Content */}
                <AccordionContent>
                  <Card className="rounded-b-2xl border-t border-border/30 bg-zinc-100 dark:bg-zinc-950">
                    <CardHeader>
                      <CardTitle className="text-base font-semibold">
                        {result.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5 text-sm">
                      {/* Answer */}
                      <div className="bg-muted/40 dark:bg-zinc-900/50 rounded-lg p-3">
                        <p className="font-semibold text-foreground">
                          Your Answer
                        </p>
                        <p className="text-muted-foreground mt-1 leading-relaxed">
                          {result.answer}
                        </p>
                      </div>

                      {/* Tone */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-4 h-4 text-blue-500" />
                          <p className="font-semibold text-lg">Tone</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {result.tone.map((t: string, i: number) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="rounded-full px-3 py-1 text-md"
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {/* Scores Overview */}
                      <div>
                          <div className="flex items-center gap-2 mb-3">
                              <BarChart3 className="w-4 h-4 text-green-500" />
                              <p className="font-semibold text-lg">Scores</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {[
                              { label: "Clarity", value: result.scores.clarity },
                              { label: "Relevance", value: result.scores.relevance },
                              { label: "Confidence", value: result.scores.confidence },
                              ].map((s, i) => (
                              <div
                                  key={i}
                                  className="bg-zinc-200 dark:bg-zinc-900/60 rounded-lg py-2 px-3 flex justify-between"
                              >
                                  <p className="font-semibold text-md">{s.label}</p>
                                  <p className="font-semibold text-md">{s.value}/10</p>
                              </div>
                              ))}
                          </div>
                      </div>
                      {/* Strengths */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Flame className="w-4 h-4 text-green-500" />
                          <p className="font-semibold text-green-600 dark:text-green-300">Strengths</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {result.strengths.map((s: string, i: number) => (
                            <div
                              key={i}
                              className="p-3 bg-green-50 dark:bg-green-900 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                            >
                              <p className="text-sm md:text-base text-center font-medium text-green-700 dark:text-green-200">
                                {s}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Weaknesses */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <p className="font-semibold text-red-600 dark:text-red-300">Weaknesses</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {result.weaknesses.map((w: string, i: number) => (
                            <div
                              key={i}
                              className="p-3 bg-red-50 dark:bg-red-900 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                            >
                              <p className="text-sm md:text-base text-center font-medium text-red-700 dark:text-red-200">
                                {w}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Suggestions */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4 text-yellow-500" />
                          <p className="font-semibold text-yellow-600 dark:text-yellow-300">Suggestions</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {result.suggestions.map((s: string, i: number) => (
                            <div
                              key={i}
                              className="p-3 bg-yellow-50 dark:bg-yellow-900 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                            >
                              <p className="text-sm md:text-base text-center font-medium text-yellow-800 dark:text-yellow-200">
                                {s}
                              </p>
                            </div>
                          ))}
                        </div>
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