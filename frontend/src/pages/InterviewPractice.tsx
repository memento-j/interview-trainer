import AssemblyAIRecorder from "@/components/AssemblyAIRecorder";
import NavBar from "@/components/NavBar";

export default function InterviewPractice() {
  return(
      <div className="min-h-screen bg-zinc-300 dark:bg-zinc-800">
          <NavBar/>
          <AssemblyAIRecorder/>
      </div>
  );
}