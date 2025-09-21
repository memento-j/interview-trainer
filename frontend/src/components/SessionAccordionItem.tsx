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
      feedback: string[];
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
                <p className="text-zinc-600 dark:text-zinc-400 mb-1">{`Answer: ${answers[index]}`}</p> 
              )}
              {feedback[index] && (
                <p className="text-sm italic text-zinc-500 dark:text-zinc-500">{`Feedback: ${feedback[index]}`}</p>
              )}
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
}