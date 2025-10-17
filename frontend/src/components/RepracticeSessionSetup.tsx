import Stepper, { Step } from '../components/Stepper';
import { Input } from "@/components/ui/input";
import { useAuth } from '@/contexts/AuthContext';
import { useState } from "react";
import { createInterviewSession } from "@/services/interviewSessionService";
import { Spinner } from "@/components/Spinner";
import { useSessionStore } from '@/stores/useSessionStore';
import DisplayUserQuestions from './DisplayUserQuestions';


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
                    <Spinner variant="ellipsis" size={64}/>
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
                            <p className='mb-8 font-semibold text-3xl'>Enter a name for this practice interview session</p>
                            <Input value={sessionName} onChange={(e) => setSessionName(e.target.value)} placeholder="ex: My First Practice Session" className='max-w-md mb-5 text-xl'/>
                        </Step>
                    }
                </Stepper>
            }
        </div>
    );
}