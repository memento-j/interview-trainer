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

    //return a promise so i can use async await in my components
    async function generateQuestions({role, selectedOption, questionCount, jobDescription } : GenerateQuestionsArgs): Promise<string[]> {        
        return new Promise((resolve, reject) => {
            const params = new URLSearchParams({
                questionCount,
                role: selectedOption === "general" ? "general" : role,
                jobDescription
            });

            const eventSource = new EventSource(
                `http://localhost:8080/ai/interview-questions?${params.toString()}`
            );

            eventSourceRef.current = eventSource;

            eventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log(data);
                
                if (data.status) {
                    switch (data.status) {
                        case "start":
                            setStartStatus(true);
                            break;
                        case "complete":
                            setStartStatus(true);
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

    return { generateQuestions, streamText, startStatus, completeStatus }
};