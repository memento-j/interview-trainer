import Stepper, { Step } from '../components/Stepper';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth } from '@/contexts/AuthContext';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { useState } from "react";
import { createInterviewSession } from "@/services/interviewSessionService";
import { Spinner } from "@/components/Spinner";
import { useSessionStore } from '@/stores/useSessionStore';
import DisplayPreloadedQuestions from './DisplayPreloadedQuestions';


export default function SessionSetup() {
    const { user, session } = useAuth()
    const { setSetupCompleted, setCreatedSessionID } = useSessionStore();
    const [role, setRole] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<string>("role-specific");
    const [questionSource, setQuestionSource] = useState<string>("ai-generated");
    const [providedQuestions, setProvidedQuestions] = useState<string[]>([""]);
    const [aiQuestionCount, setAiQuestionCount] = useState<string>("");
    const [sessionName, setSessionName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    //creates interview session in DB (using the provided information) or in local storage when the stepper is completed is completed
    async function handleSetupCompleted() {
        //handle questions not being answeered fully sincee the user can cliuck on teh steps on the top to go next
        ////////////
        /////////////
        setLoading(true);
        const result = await createInterviewSession(
            user,
            session,
            role,
            selectedOption,
            questionSource,
            aiQuestionCount,
            providedQuestions,
            sessionName
        );
        
        if (result.sessionID) {
            setCreatedSessionID(result.sessionID);
        }
        setSetupCompleted(true);
    }

    // Below are helper functions for when a user decides to input their own questions
    // Update a specific question as it's input changes
    function handleQuestionChange (index: number, value: string) {
        const updated = [...providedQuestions];
        updated[index] = value;
        setProvidedQuestions(updated);
    };

    // Add new question
    function addQuestion() {
        if (providedQuestions.length != 0 && providedQuestions[providedQuestions.length - 1].trim() == "") {
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
            {loading ?       
                <div className="flex flex-col items-center pt-50 gap-5">
                    <p className='font-semibold text-2xl'>Creating Your Session</p>
                    <Spinner variant="ellipsis" size={64}/>
                </div>
            :
                <Stepper
                    initialStep={1}
                    onFinalStepCompleted={() => handleSetupCompleted()}
                    backButtonText="Previous"
                    nextButtonText="Next"
                >
                    <Step canContinue={questionSource ? true : false}>
                        <p className='font-semibold mb-8 md:text-2xl lg:text-3xl'>Where would you like your practice interview questions to come from?</p>
                        <RadioGroup value={questionSource} onValueChange={setQuestionSource} >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="ai-generated" id="ai-generated" />
                                <Label htmlFor="ai-generated" className='md:text-xl'>Have the AI generate the questions for me</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="preloaded" id="preloaded" />
                                <Label htmlFor="preloaded" className='md:text-xl'>Select from a preloaded list of questions</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="provided" id="provided" />
                                <Label htmlFor="provided" className='md:text-xl'>I would like to provide the questions myself</Label>
                            </div>
                        </RadioGroup>
                    </Step>
                    { questionSource !== "preloaded" && questionSource !== "provided" &&
                        <Step canContinue={selectedOption ? true : false}>
                            <p className="font-semibold mb-8 md:text-2xl lg:text-3xl">Select what type of interview questions you would like</p>
                            <RadioGroup value={selectedOption} onValueChange={setSelectedOption} >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="role-specific" id="role-specific" />
                                    <Label htmlFor="role-specific" className='md:text-xl'>Role-specific questions</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="general" id="general" />
                                    <Label htmlFor="general" className='md:text-xl'>General questions (behavioral/situational)</Label>
                                </div>
                            </RadioGroup>
                        </Step>
                    }
                    {/* Promot user to provide the questions they would like to practice */}
                    { questionSource === "provided" &&
                        //checks if every question is emepty or not
                        <Step canContinue={providedQuestions.every(question => question.trim() !== "")}>
                            <p className='mb-8 font-semibold md:text-2xl lg:text-3xl'>Enter your questions below</p>
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
                        <Step canContinue={aiQuestionCount ? true : false}>
                            <p className="font-semibold md:text-2xl lg:text-3xl mb-8">Select the number of questions you would like the AI to generate for you (between 3 and 10)</p>
                            {/* number selector between 3 and 10*/}
                            <Select value={aiQuestionCount.toString()} onValueChange={setAiQuestionCount}>
                                <SelectTrigger className="w-auto mt-5">
                                    <SelectValue placeholder="Select number of questions" className='text-xl'/>
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
                    { questionSource === "preloaded" &&
                        <Step canContinue={true}>
                            <DisplayPreloadedQuestions/>
                        </Step>
                    }
                    {/* Promot user for role if they chose role-specific */}
                    { selectedOption === "role-specific" &&
                        <Step canContinue={role.trim() ? true : false}>
                            <p className='mb-8 font-semibold md:text-2xl lg:text-3xl'>Enter the role you are practicing for</p>
                            <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" className='max-w-md mb-5'/>
                        </Step>
                    }
                    {/* Prompt the user to enter a name for the session */}
                    { user &&
                        <Step canContinue={sessionName ? true : false}>
                            <p className='mb-8 font-semibold text-3xl'>Enter a name for this practice interview session</p>
                            <Input value={sessionName} onChange={(e) => setSessionName(e.target.value)} placeholder="ex: My First Practice Session" className='max-w-md mb-5 text-xl'/>
                        </Step>
                    }
                </Stepper>
            } 
        </div>
    );
}