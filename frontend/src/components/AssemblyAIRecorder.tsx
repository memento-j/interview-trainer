import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { handleAnswerSubmit } from "@/services/interviewSessionService";
import { useSessionStore } from "@/stores/useSessionStore";
import { Mic } from "lucide-react";

// reduce sample rate to 16kHz since that is what assembly ai's api requires as input 
function downsampleBuffer( buffer: Float32Array, inputSampleRate: number, outputSampleRate: number = 16000 ): Int16Array {
  if (outputSampleRate === inputSampleRate) {
    const converted = new Int16Array(buffer.length);
    for (let i = 0; i < buffer.length; i++) {
      converted[i] = Math.max(-1, Math.min(1, buffer[i])) * 0x7fff;
    }
    return converted;
  }

  const sampleRateRatio = inputSampleRate / outputSampleRate;
  const newLength = Math.round(buffer.length / sampleRateRatio);
  const result = new Int16Array(newLength);

  let offsetResult = 0;
  let offsetBuffer = 0;
  while (offsetResult < result.length) {
    const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
    let accum = 0;
    let count = 0;
    for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
      accum += buffer[i];
      count++;
    }
    result[offsetResult] = Math.max(-1, Math.min(1, accum / count)) * 0x7fff;
    offsetResult++;
    offsetBuffer = nextOffsetBuffer;
  }

  return result;
}

interface AssemblyAIRecorderProps {
  questionText: string;
  questionId: string;
  questionIndex: number;
}

export default function AssemblyAIRecorder( {questionText, questionId, questionIndex} : AssemblyAIRecorderProps) {
  const ws = useRef<WebSocket | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const scriptProcessor = useRef<ScriptProcessorNode | null>(null);
  const [answer, setAnswer] = useState<string>("");
  const { user, session } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [transcripts, setTranscripts] = useState<Record<number, string>>({});
  const { createdSessionID, questionsSubmitted, updateQuestionSubmitted } = useSessionStore();

  const API_KEY = import.meta.env.VITE_ASSEMBLYAI_KEY;

  // Combine transcript for display
  const orderedTranscript = Object.keys(transcripts)
  .sort((a, b) => Number(a) - Number(b))
  .map((k) => transcripts[Number(k)])
  .join(" ");

  //sets the answer to the transcribed text when it changes
  useEffect(() => {
    setAnswer(orderedTranscript);
  }, [orderedTranscript]);

  const startRecording = async () => {
    // Get microphone
    mediaStream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext.current = new AudioContext();
    const source = audioContext.current.createMediaStreamSource(mediaStream.current);

    scriptProcessor.current = audioContext.current.createScriptProcessor(4096, 1, 1);
    source.connect(scriptProcessor.current);
    scriptProcessor.current.connect(audioContext.current.destination);

    // Open WebSocket
    const wsUrl = `wss://streaming.assemblyai.com/v3/ws?sample_rate=16000&formatted_finals=true&token=${API_KEY}`;
    ws.current = new WebSocket(wsUrl);
    const turns: Record<number, string> = {};

    ws.current.onopen = () => {
      console.log("WebSocket connected!");
      setIsRecording(true);
    };

    // When a message is given, update the transcript
    ws.current.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type === "Turn") {
        const { turn_order, transcript } = data;
        turns[turn_order] = transcript;
        setTranscripts({ ...turns });
      }
    };

    ws.current.onerror = (err) => {
      console.error("WebSocket error", err);
      stopRecording();
    };

    ws.current.onclose = () => {
      console.log("WebSocket closed");
    };

    // Audio processing
    scriptProcessor.current.onaudioprocess = (event) => {
      if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;
      const input = event.inputBuffer.getChannelData(0);
      const downsampled = downsampleBuffer(input, audioContext.current!.sampleRate, 16000);
      ws.current.send(downsampled.buffer);
    };
  };

  const stopRecording = () => {
    setIsRecording(false);

    if (scriptProcessor.current) {
      scriptProcessor.current.disconnect();
      scriptProcessor.current = null;
    }

    if (audioContext.current) {
      audioContext.current.close();
      audioContext.current = null;
    }

    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach(track => track.stop());
      mediaStream.current = null;
    }

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: "Terminate" }));
      ws.current.close();
      ws.current = null;
    }
  };  

  return (
    <div>
      <div className="mt-3">
        {/* No answer submitted, so allow user to answer the question*/}
        {questionsSubmitted[questionIndex] == false ?
          <div>
            <Textarea value={answer} onChange={(e) => setAnswer(e.target.value)} className="h-40 resize-none"/>
            <p className="text-muted-foreground text-sm mt-1 text-center">
              Sometimes the transcription AI makes mistakes, so you can manually edit your answer if needed.
            </p>
            <div className="pt-2">
              {isRecording ? (
                <div className="flex flex-col items-center gap-2 my-3">
                  <p className="text-lg font-[500]">Recording...</p>
                  <Mic onClick={stopRecording} className="hover:cursor-pointer hover:scale-105 dark:hover:bg-teal-700 hover:bg-teal-500 duration-150 transition-all bg-teal-300 dark:bg-teal-500 rounded-2xl" size={40}>
                    Stop recording
                  </Mic>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-3">
                  <p className="text-lg font-[500]">Click the microphone to start recording!</p>
                  <Mic onClick={startRecording} className="hover:cursor-pointer hover:scale-105 hover:bg-teal-300 dark:hover:bg-teal-500 duration-150 transition-all bg-teal-500 dark:bg-teal-700 rounded-2xl" size={40}>
                    Record
                  </Mic>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center mt-10 gap-1">
              <p className="text-muted-foreground text-sm mt-3">
                * Once submitted, you will be unable change your answer
              </p>
              <Button className="hover:cursor-pointer" onClick={() => {
                  if (answer == "") {
                      return;
                  }
                  //set this specific question to being submitted(true)
                  updateQuestionSubmitted(questionIndex, true);
                  handleAnswerSubmit(user, session, createdSessionID, answer, questionText, questionId)
              }}>
                  Submit Answer
              </Button>
            </div>
          </div>
       : 
          <div>
            {/* Answer has been submitted, so do not allow the user to make more changes*/}
            <p className="text-muted-foreground text-sm mt-1 text-center">
              Answer submitted!
            </p>
          </div>
       }
      </div>
    </div>
  );
}