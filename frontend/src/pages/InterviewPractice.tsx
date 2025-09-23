import AssemblyAIRecorder from "@/components/AssemblyAIRecorder";
import SessionSetup from "@/components/SessionSetup";
import { useState } from "react";

export default function InterviewPractice() {
    const [setupCompleted, setSetupCompleted] = useState<boolean>(false);
    const [createdSessionID, setCreatedSessionID] = useState<string>("");
    return (
        <div className="min-h-screen bg-zinc-300 dark:bg-zinc-800">         
            {!setupCompleted && (
                <SessionSetup 
                    setSetupCompleted={setSetupCompleted}
                    setCreatedSessionID={setCreatedSessionID}
                />    
            )}
            {setupCompleted && (
              <div>
                <AssemblyAIRecorder />
                <p>{createdSessionID}</p>
              </div>
            )}
        </div>
    );
}