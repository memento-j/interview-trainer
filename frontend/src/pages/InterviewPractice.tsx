import AssemblyAIRecorder from "@/components/AssemblyAIRecorder";
import SessionSetup from "@/components/SessionSetup";

export default function InterviewPractice() {

  return(
      <div className="min-h-screen bg-zinc-300 dark:bg-zinc-800">   
          <SessionSetup/>    
          <AssemblyAIRecorder/>
      </div>
  );
}