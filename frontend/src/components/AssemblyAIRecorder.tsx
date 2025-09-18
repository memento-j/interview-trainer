import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

// reduce sample rate to 16kHz since that is what assembly ai can offer 
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

export default function AssemblyAIRecorder() {
  const ws = useRef<WebSocket | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const scriptProcessor = useRef<ScriptProcessorNode | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [transcripts, setTranscripts] = useState<Record<number, string>>({});

  const API_KEY = import.meta.env.VITE_ASSEMBLYAI_KEY;
  

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

  // Combine transcript for display
  const orderedTranscript = Object.keys(transcripts)
    .sort((a, b) => Number(a) - Number(b))
    .map((k) => transcripts[Number(k)])
    .join(" ");

  return (
    <div>
      <header>
        <h1>Real-Time Transcription (v3)</h1>
        <p>
          Powered by AssemblyAI's latest real-time model
        </p>
      </header>
      <div>
        <p>Click start to begin recording!</p>
        {isRecording ? (
          <Button onClick={stopRecording}>
            Stop recording
          </Button>
        ) : (
          <Button onClick={startRecording}>
            Record
          </Button>
        )}
      </div>
      <div>
        <p><strong>Transcript:</strong> {orderedTranscript}</p>
      </div>
    </div>
  );
}