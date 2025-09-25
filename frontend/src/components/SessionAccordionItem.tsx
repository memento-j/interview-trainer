import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface SessionAccordionItemProps {
    name: string;
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
export default function SessionAccordionItem({ name, sessionData }: SessionAccordionItemProps) {
    const { questions, answers, feedback } = sessionData;    
    return (
      <AccordionItem value={name}>
        <AccordionTrigger className="text-lg font-semibold">{name}</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          {questions.map((question, index) => (
            <div key={index} className="border-b border-zinc-300 dark:border-zinc-700 pb-3 mb-3 last:border-b-0 last:mb-0">
              <p className="font-medium text-zinc-800 dark:text-zinc-200 mb-1">{`Q${index + 1}: ${question}`}</p>
              {answers[index] && (
                <p className="text-zinc-600 dark:text-zinc-400 my-3">{`Your Answer: ${answers[index]}`}</p> 
              )}
              {feedback[index] && (
                <div>
                  <p className="text-[16px] text-zinc-900 dark:text-zinc-100">Feedback:</p>
                  <p className="text-sm italic text-zinc-800 dark:text-zinc-200 my-1.5">{`Strengths: ${feedback[index].analysis.strengths}`}</p>
                  <p className="text-sm italic text-zinc-800 dark:text-zinc-200 my-1.5">{`Weaknesses: ${feedback[index].analysis.weaknesses}`}</p>
                  <p className="text-sm italic text-zinc-800 dark:text-zinc-200 my-1.5">{`Suggesstions: ${feedback[index].analysis.suggestions}`}</p>
                  <p className="text-sm italic text-zinc-800 dark:text-zinc-200 my-1.5">{`Summary: ${feedback[index].analysis.summary}`}</p>
                  <p className="text-sm italic text-zinc-800 dark:text-zinc-200 mt-1.5 mb-0.5">{`Clarity: ${feedback[index].analysis.scores.clarity}`}</p>
                  <p className="text-sm italic text-zinc-800 dark:text-zinc-200 my-0.5">{`Relevence: ${feedback[index].analysis.scores.relevance}`}</p>
                  <p className="text-sm italic text-zinc-800 dark:text-zinc-200 my-0.5">{`Confidence: ${feedback[index].analysis.scores.confidence}`}</p>
                </div>
              )}
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
}