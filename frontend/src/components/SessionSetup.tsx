import Stepper, { Step } from '../components/Stepper';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth } from '@/contexts/AuthContext';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { useState } from "react";
import { createInterviewSession } from "@/services/interviewSessionService";

export default function SessionSetup() {
    const { user, session } = useAuth()
    const [role, setRole] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<string>("role-specific");
    const [questionSource, setQuestionSource] = useState<string>("ai-generated");
    const [providedQuestions, setProvidedQuestions] = useState<string[]>([]);
    const [aiQuestionCount, setAiQuestionCount] = useState<string>("3");
    const [setupCompleted, setSetupCompleted] = useState<boolean>(false);
    const [createdSessionID, setCreatedSessionID] = useState<string>("");

    //
    //
    //push the seetupcompleteed and seession id state up, and need to figure out how to validate inputs with the stepper
    //
    //

    //creates interview session in DB (using the provided information) when the setup is completed
    async function handleSetupCompleted() {
        const result = await createInterviewSession({
          user,
          session,
          role,
          selectedOption,
          questionSource,
          aiQuestionCount,
          providedQuestions,
        });

        if (result.sessionId) {
          setCreatedSessionID(result.sessionId);
        }
        setSetupCompleted(true);
      }


    //Below are helper functions for when a user decides to input their own questions

    // Update a specific question as it's input changes
    function handleQuestionChange (index: number, value: string) {
        const updated = [...providedQuestions];
        updated[index] = value;
        setProvidedQuestions(updated);
    };

    // Add new question
    function addQuestion() {
        if (providedQuestions[providedQuestions.length - 1] == "") {
            return;
        }
        setProvidedQuestions([...providedQuestions, ""]);
    } 

    // Remove a question
    function removeQuestion (index: number) {
        setProvidedQuestions(providedQuestions.filter((_, i) => i !== index));
    };
    
    return(
        <div>
            <Stepper
                initialStep={1}
                onFinalStepCompleted={() => handleSetupCompleted()}
                backButtonText="Previous"
                nextButtonText="Next"
            >
                <Step>
                    <p className="font-semibold mb-5">Select what type of interview questions you would like</p>
                    <RadioGroup value={selectedOption} onValueChange={setSelectedOption} >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="role-specific" id="role-specific" />
                            <Label htmlFor="role-specific">Role-specific questions</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="general" id="general" />
                            <Label htmlFor="general">General questions (behavioral/situational)</Label>
                        </div>
                    </RadioGroup>
                </Step>
                {/* Promot user for role if they chose role-specific */}
                { selectedOption === "role-specific" &&
                    <Step>
                        <p className='mb-5 font-semibold'>Enter the role you are practicing for</p>
                        <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" className='max-w-md mb-5'/>
                    </Step>
                }
                <Step>
                    <p className='font-semibold mb-5'>Would you like the AI to generate questions for you?</p>
                    <RadioGroup value={questionSource} onValueChange={setQuestionSource} >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ai-generated" id="ai-generated" />
                            <Label htmlFor="ai-generated">Yes, have the AI generate the questions for me</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="provided" id="provided" />
                            <Label htmlFor="provided">No, I would like to provide the questions myself</Label>
                        </div>
                    </RadioGroup>
                </Step>
                {/* Promot user to provide the questions they would like to practice */}
                { questionSource === "provided" &&
                    <Step>
                        <p className='mb-5 font-semibold'>Enter your questions below</p>
                        {/* list that allows users to enter another questions or remove if needed*/}
                        <div className="flex flex-col gap-3">
                            {providedQuestions.map((q:string, index:number) => (
                                <div key={index} className="flex items-center gap-2">
                                    {/* input section for inputting question*/}
                                    <Input
                                    type="text"
                                    placeholder={`Question ${index + 1}`}
                                    value={q}
                                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                                    />
                                    {/* remove question button */}
                                    {providedQuestions.length > 1 && (
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => removeQuestion(index)}
                                        >
                                            ✕
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button variant="outline" className='w-[120px]' onClick={addQuestion}>
                                + Add Question
                            </Button>
                        </div>
                    </Step>
                }
                {/* Prompt user to provide the number of questions they would like the AI to generate*/}
                { questionSource === "ai-generated" &&
                    <Step>
                        <p className="font-semibold">Select the number of questions you would like the AI to generate for you (between 3 and 10)</p>
                        {/* number selector between 3 and 10*/}
                        <Select value={aiQuestionCount.toString()} onValueChange={setAiQuestionCount}>
                            <SelectTrigger className="w-auto mt-5">
                                <SelectValue placeholder="Select number of questions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Question Count</SelectLabel>
                                        {[...Array(8)].map((_, i) => {
                                            const value = i + 3;
                                            return (
                                                <SelectItem key={value} value={value.toString()}>
                                                    {value}
                                                </SelectItem>
                                            );
                                        })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Step>
                }
            </Stepper> 
        </div>
    );
}