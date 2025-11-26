import Stepper, { Step } from '../components/Stepper';
import { Input } from "@/components/ui/input";
import { useAuth } from '@/contexts/AuthContext';
import { useState } from "react";
import { createInterviewSession } from "@/services/interviewSessionService";
import { Spinner } from "@/components/Spinner";
import { useSessionStore } from '@/stores/useSessionStore';
import DisplayUserQuestions from './DisplayUserQuestions';
import { FileText } from 'lucide-react';


export default function RepracticeSessionSetup() {
    const { user, session, loading: userLoading } = useAuth()
    const { setSetupCompleted, setCreatedSessionID, selectedPremadeQuestions } = useSessionStore();
    const [sessionName, setSessionName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    //creates interview session in DB (using the provided information) or in local storage when the stepper is completed is completed
    async function handleSetupCompleted() {
        setLoading(true);
        const result = await createInterviewSession(
            user,
            session,
            "Question Repractice",
            "role-specific",
            "preloaded",
            "",
            [],
            selectedPremadeQuestions,
            "",
            sessionName
        );
        
        if (result.sessionID) {
            setCreatedSessionID(result.sessionID);
        }
        setSetupCompleted(true);
    }

    if (userLoading) {
        return (
            <div className="flex flex-col items-center pt-50 gap-5">
                <Spinner variant="circle" size={64}/>
            </div>
        );
    }

    if (!user) {
        return (
            <p className='text-center pt-50 text-2xl font-[500]'>Only signed in users can repractice previous questions!</p>
        )
    }

    return(
        <div className='min-h-screen'>
            {loading ?       
                <div className="flex flex-col items-center pt-50 gap-5">
                    <p className='font-semibold text-2xl'>Creating Your Session</p>
                    <Spinner variant="ellipsis" size={64} className='text-teal-500'/>
                </div>
            :
                <Stepper
                    initialStep={1}
                    onFinalStepCompleted={() => handleSetupCompleted()}
                    backButtonText="Previous"
                    nextButtonText="Next"
                >
                    <Step canContinue={true}>
                        <div className="text-center space-y-6">
                            <p className="text-2xl font-bold text-teal-500">
                            Welcome to the Question Re-Practicer!
                            </p>
                            <p className="text-xl font-semibold">
                                Use the <span className="text-teal-500">Question Re-Practicer</span> to revisit and master the questions that challenged you before.
                            </p>
                            <p className="text-lg text-gray-700 dark:text-gray-300">
                                You'll see your past questions ranked from lowest to highest scores. Pick any you'd like to re-practice and improve on!
                            </p>
                            <p className="text-xl font-semibold text-teal-600 dark:text-teal-400">
                                Let's boost your scores and confidence!
                            </p>
                        </div>
                    </Step>
                    <Step canContinue={selectedPremadeQuestions.length > 0}>
                        <p className='font-semibold mb-8 md:text-2xl lg:text-3xl text-center'>Select which questions to repractice (10 max per session)</p>
                        <DisplayUserQuestions/>
                    </Step>
                    {/* Prompt the user to enter a name for the session */}
                    { user &&
                        <Step canContinue={sessionName ? true : false}>
                            <div className="text-center mb-10">
                                <div className="flex justify-center items-center gap-3 mb-4">
                                    <FileText className="w-8 h-8 text-teal-500 dark:text-teal-400" />
                                    <h2 className="font-semibold text-xl md:text-2xl lg:text-3xl bg-gradient-to-tr from-teal-600 to-teal-400 bg-clip-text text-transparent">
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