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
import { Sparkles, ListChecks, Edit, Briefcase, MessageSquare, BrainCircuit, ChevronDown, FileText } from "lucide-react";

export default function SessionSetup() {
    const { user, session } = useAuth()
    const { setSetupCompleted, setCreatedSessionID, selectedPremadeQuestions } = useSessionStore();
    const [role, setRole] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<string>("role-specific");
    const [questionSource, setQuestionSource] = useState<string>("ai-generated");
    const [providedQuestions, setProvidedQuestions] = useState<string[]>([""]);
    const [aiQuestionCount, setAiQuestionCount] = useState<string>("");
    const [sessionName, setSessionName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    //creates interview session in DB (using the provided information) or in local storage when the stepper is completed is completed
    async function handleSetupCompleted() {
        setLoading(true);
        const result = await createInterviewSession(
            user,
            session,
            role,
            selectedOption,
            questionSource,
            aiQuestionCount,
            providedQuestions,
            selectedPremadeQuestions,
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
        <div className='min-h-screen'>
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
                    <Step canContinue={!!questionSource}>
                        <p className="font-semibold mb-10 mt-2 text-[16px] md:text-xl lg:text-3xl text-center text-zinc-800 dark:text-zinc-100">
                            Choose where your interview questions should come from
                        </p>
                        <RadioGroup
                            value={questionSource}
                            onValueChange={setQuestionSource}
                            className="grid gap-4 md:pb-8 max-w-lg mx-auto"
                        >
                            {
                                [
                                    { value: "ai-generated", label: "Have the AI generate the questions for me", icon: <Sparkles className="w-6 h-6 text-teal-500" /> },
                                    { value: "preloaded", label: "Select from a preloaded list of questions", icon: <ListChecks className="w-6 h-6 text-blue-500" /> },
                                    { value: "provided", label: "I would like to provide the questions myself", icon: <Edit className="w-6 h-6 text-purple-500" /> },
                                ].map(({ value, label, icon }) => (
                                    <div
                                        key={value}
                                        className={`flex items-center gap-3 border rounded-2xl p-4 transition-all cursor-pointer
                                        ${questionSource === value
                                            ? "border-teal-500 bg-teal-100 dark:bg-teal-950 dark:border-teal-400 shadow-md"
                                            : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                        }`}
                                        onClick={() => setQuestionSource(value)}
                                    >
                                        {icon}
                                        <div className="flex flex-col">
                                            <Label htmlFor={value} className="text-sm md:text-[16px] mx-2 lg:text-xl font-medium cursor-pointer">
                                                {label}
                                            </Label>
                                        </div>
                                        <RadioGroupItem value={value} id={value} className="ml-auto" />
                                    </div>
                            ))}
                        </RadioGroup>
                    </Step>
                    { questionSource !== "preloaded" && questionSource !== "provided" &&
                        <Step canContinue={!!selectedOption}>
                            <p className="font-semibold mb-8 text-2xl lg:text-3xl text-center">
                                Select what type of interview questions you would like
                            </p>

                            <RadioGroup
                                value={selectedOption}
                                onValueChange={setSelectedOption}
                                className="grid gap-5 max-w-2xl mx-auto pb-24"
                            >
                                {[
                                {
                                    value: "role-specific",
                                    label: "Role-specific questions",
                                    description: "Questions tailored to your chosen position or field.",
                                    icon: <Briefcase className="w-6 h-6 text-teal-500" />,
                                },
                                {
                                    value: "general",
                                    label: "General questions (behavioral/situational)",
                                    description: "Common questions assessing soft skills and problem-solving.",
                                    icon: <MessageSquare className="w-6 h-6 text-blue-500" />,
                                },
                                ].map(({ value, label, description, icon }) => (
                                <div
                                    key={value}
                                    onClick={() => setSelectedOption(value)}
                                    className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all
                                    ${selectedOption === value
                                        ? "border-teal-500 bg-gradient-to-tr from-teal-50 to-white dark:from-teal-900/30 dark:to-zinc-900 shadow-md"
                                        : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    }`}
                                >
                                    {icon}
                                    <div className="flex flex-col">
                                        <Label htmlFor={value} className="text-lg md:text-xl font-semibold cursor-pointer">
                                            {label}
                                        </Label>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
                                    </div>
                                    <RadioGroupItem value={value} id={value} className="ml-auto" />
                                </div>
                                ))}
                            </RadioGroup>
                        </Step>
                    }
                    {/* Promot user to provide the questions they would like to practice */}
                    { questionSource === "provided" &&
                        //checks if every question is emepty or not
                        <Step canContinue={providedQuestions.every(question => question.trim() !== "")}>
                            <p className='mb-10 font-semibold md:text-2xl lg:text-3xl text-center'>Enter your questions below</p>
                            {/* list that allows users to enter another questions or remove if needed*/}
                            <div className="flex flex-col gap-3 items-center">
                                {providedQuestions.map((q:string, index:number) => (
                                    <div key={index} className="flex items-center gap-2">
                                        {/* input section for inputting question*/}
                                        <Input
                                            type="text"
                                            placeholder={`Question ${index + 1}`}
                                            value={q}
                                            className="w-80 sm:w-120 md:w-160 lg:w-200 py-5 !text-[14px] sm:!text-[18px] shadow-md"
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
                                <Button variant="outline" className='w-[120px] mt-5 mb-14 dark:!bg-teal-800 !bg-teal-400' onClick={addQuestion}>
                                    + Add Question
                                </Button>
                            </div>
                        </Step>
                    }
                    {/* Prompt user to provide the number of questions they would like the AI to generate*/}
                    { questionSource === "ai-generated" &&
                        <Step canContinue={!!aiQuestionCount}>
                            <div className="text-center mb-10">
                                <div className="flex justify-center items-center gap-3 mb-4">
                                    <BrainCircuit className="w-8 h-8 text-teal-500 dark:text-teal-400" />
                                    <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl bg-gradient-to-tr from-teal-600 to-cyan-400 bg-clip-text text-transparent">
                                        AI Question Count
                                    </h2>
                                </div>
                                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                                Choose how many questions you'd like the AI to generate — <br/> between <span className="font-semibold text-teal-500">3</span> and <span className="font-semibold text-teal-500">10</span>.
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <Select value={aiQuestionCount?.toString()} onValueChange={setAiQuestionCount}>
                                    <SelectTrigger className="w-56 py-6 text-lg font-medium bg-gradient-to-tr from-zinc-100 to-zinc-50 dark:from-[#0F0F11] dark:to-[#1A1A1C] border border-zinc-300 dark:border-zinc-700 rounded-xl shadow-sm hover:shadow-md transition-all">
                                        <SelectValue placeholder="Select number" />
                                    </SelectTrigger>

                                    <SelectContent className="rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-lg">
                                        <SelectGroup>
                                            <SelectLabel className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 px-2">
                                                Question Count
                                            </SelectLabel>
                                            {[...Array(8)].map((_, i) => {
                                                const value = i + 3;
                                                return (
                                                <SelectItem
                                                    key={value}
                                                    value={value.toString()}
                                                    className="text-lg py-2 hover:bg-teal-50 dark:hover:bg-[#121212] hover:text-teal-600"
                                                >
                                                    {value}
                                                </SelectItem>
                                                );
                                            })}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </Step>
                    }
                    { questionSource === "preloaded" &&
                        <Step canContinue={selectedPremadeQuestions.length > 0}>
                            <DisplayPreloadedQuestions/>
                        </Step>
                    }
                    {/* Promot user for role if they chose role-specific */}
                    { selectedOption === "role-specific" &&
                        <Step canContinue={!!role.trim()}>
                            <div className="text-center mb-10">
                                <div className="flex justify-center items-center gap-3 mb-4">
                                    <Briefcase className="w-8 h-8 text-teal-500 dark:text-teal-400" />
                                    <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl bg-gradient-to-tr from-teal-600 to-cyan-400 bg-clip-text text-transparent">
                                        Role Information
                                    </h2>
                                </div>
                                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                                    Enter the role you are preparing for so the AI can generate the most relevant interview questions.
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <Input
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    placeholder="e.g., Software Engineer"
                                    className="max-w-md w-full py-5 px-5 !text-lg rounded-xl border border-zinc-300 dark:border-zinc-700 shadow-sm focus:shadow-md focus:ring-2 focus:ring-teal-400 dark:bg-[#0F0F11] dark:text-zinc-100 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                                />
                            </div>
                        </Step>
                    }
                    {/* Prompt the user to enter a name for the session */}
                    { user &&
                        <Step canContinue={!!sessionName.trim()}>
                            <div className="text-center mb-10">
                                <div className="flex justify-center items-center gap-3 mb-4">
                                    <FileText className="w-8 h-8 text-teal-500 dark:text-teal-400" />
                                    <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl bg-gradient-to-tr from-teal-600 to-cyan-400 bg-clip-text text-transparent">
                                        Name Your Session
                                    </h2>
                                </div>
                                <p className="text-muted-foreground text-md md:text-xl max-w-2xl mx-auto">
                                    Give your practice session a descriptive name so you can easily find it later.
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <Input
                                    value={sessionName}
                                    onChange={(e) => setSessionName(e.target.value)}
                                    placeholder="e.g., My First Practice Session"
                                    className="max-w-md w-full py-5 px-5 !text-lg rounded-xl border border-zinc-300 dark:border-zinc-700 shadow-sm focus:shadow-md focus:ring-2 focus:ring-teal-400 dark:bg-[#0F0F11] dark:text-zinc-100 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                                />
                            </div>
                        </Step>
                    }
                </Stepper>
            } 
        </div>
    );
}