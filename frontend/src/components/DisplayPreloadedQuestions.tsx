import { usePreloadedQuestions } from "@/hooks/usePreloadedQuestions";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
//import { useEffect, useState } from "react";

export default function DisplayPreloadedQuestions() {
    const { data: preloadedQuestions } = usePreloadedQuestions();    
    //const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

    // Group by category
    console.log(preloadedQuestions);
    
    return (
        <div className="min-h-screen">
            { preloadedQuestions &&
                Object.entries(preloadedQuestions).map(([category, questions]) => (
                <div key={category}>
                    <h2>{category}</h2>
                    {questions.map((q:any) => (
                    <p key={q.id}>{q.question}</p>
                    ))}
                </div>
                ))
            }
        </div>
    );
}