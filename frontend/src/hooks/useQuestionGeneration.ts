import { useState, useRef } from "react";

type GenerateQuestionsArgs = {
    role: string;
    selectedOption: string;
    questionCount: string;
    jobDescription: string;
};


//for generating questions
export function useQuestionGeneration() {
    const eventSourceRef = useRef<EventSource | null>(null);
    const [ streamText, setStreamText ] = useState<string>("");
    const [ startStatus, setStartStatus ] = useState<boolean>(false);
    const [ completeStatus, setCompleteStatus ] = useState<boolean>(false);
    const [ questionsStatus, setQuestionsStatus] = useState<string[]>([]);

    //return a promise so i can use async await in my components
    async function generateQuestions({role, selectedOption, questionCount, jobDescription } : GenerateQuestionsArgs): Promise<string[]> {        
        return new Promise((resolve, reject) => {
            const params = new URLSearchParams({
                questionCount,
                role: selectedOption === "general" ? "general" : role,
                jobDescription
            });

            const eventSource = new EventSource(
                `${import.meta.env.VITE_API_URL}/ai/interview-questions?${params.toString()}`
            );

            eventSourceRef.current = eventSource;

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                
                if (data.status) {
                    switch (data.status) {
                        case "started":
                            setStartStatus(true);
                            break;
                        case "complete":
                            setCompleteStatus(true);
                            break;
                        case "questionComplete":
                            setQuestionsStatus((prev) => [...prev, data.message])
                            break;
                    }
                }

                if (data.content) {
                    setStreamText((prev) => prev + data.content);
                }

                //resolve when questions are available
                if (data.questions) {
                    resolve(data.questions);
                }

                if (data.error) {
                    reject(new Error(data.error));
                    eventSource.close();
                }
            };

            eventSource.onerror = () => {
                eventSource.close();
            };
        })
    }

    return { generateQuestions, streamText, startStatus, completeStatus, questionsStatus }
}