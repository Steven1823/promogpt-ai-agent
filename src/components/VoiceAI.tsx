import { useState, useRef } from "react";
import { Mic, MicOff, Volume2, X, Languages, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { generateContent, textToSpeech, saveToLibrary } from "@/lib/mockApi";
import { mockBusinessProfile } from "@/lib/mockData";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const VoiceAI = () => {
  const [isListening, setIsListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [language, setLanguage] = useState<string>("auto");
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [liveTranscript, setLiveTranscript] = useState<string>("");
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const kikuyuExamples = [
    "nĩ kĩĩ kĩrathondeka wega? (What is selling well?)",
    "thondeka atĩa? (How are sales?)",
    "nĩ kĩĩ kĩngĩhota gwĩka? (What can I do?)",
  ];

  const handleVoiceInput = async () => {
    if (isListening) {
      // Stop listening and transcribe
      setIsListening(false);
      setIsTranscribing(true);
      setLiveTranscript("");
      toast.info("Transcribing...");

      // Stop recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
    } else {
      // Start listening
      setIsListening(true);
      setIsOpen(true);
      setTranscript("");
      setResponse("");
      setAudioUrl("");
      setLiveTranscript("");
      audioChunksRef.current = [];
      
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            sampleRate: 24000,
            channelCount: 1,
            echoCancellation: true,
            noiseSuppression: true,
          } 
        });
        
        mediaRecorderRef.current = new MediaRecorder(stream, {
          mimeType: 'audio/webm',
        });

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          
          // Convert blob to base64
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            const base64Audio = reader.result?.toString().split(',')[1];
            
            if (!base64Audio) {
              toast.error("Failed to process audio");
              setIsTranscribing(false);
              return;
            }

            try {
              console.log('Sending audio to transcription service...');
              
              // Call edge function for transcription
              const { data, error } = await supabase.functions.invoke('speech-to-text', {
                body: { 
                  audio: base64Audio,
                  languageHint: language !== "auto" ? language : undefined,
                }
              });

              if (error) throw error;

              console.log('Transcription result:', data);
              setTranscript(data.transcript);
              setIsTranscribing(false);
              
              // Auto-confirm and generate response
              await handleConfirmTranscript(data.transcript);
            } catch (error) {
              console.error('Transcription error:', error);
              toast.error("Transcription failed. Please try again.");
              setIsTranscribing(false);
            }
          };
          
          // Stop all tracks
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorderRef.current.start();
        toast.info("🎤 Listening... Speak now");
      } catch (error) {
        console.error('Microphone access error:', error);
        toast.error("Could not access microphone. Please grant permission.");
        setIsListening(false);
      }
    }
  };

  const handleConfirmTranscript = async (confirmedTranscript: string) => {
    setIsProcessing(true);
    toast.info("Generating response...");

    try {
      // Call AI generate mock API
      const generateResult = await generateContent({
        prompt: confirmedTranscript,
        context: {
          dashboard: "voice_ai",
          businessProfile: mockBusinessProfile,
        },
        language,
      });

      setResponse(generateResult.text);

      // Call TTS mock API
      const ttsResult = await textToSpeech({
        text: generateResult.text,
        language,
      });

      setAudioUrl(ttsResult.audioUrl);

      // Save to library
      saveToLibrary({
        type: "voice_interaction",
        content: generateResult.text,
        audioUrl: ttsResult.audioUrl,
      });

      toast.success("Response generated and saved to Intelligence", {
        description: "View all conversations in the Intelligence dashboard"
      });
      setIsProcessing(false);

      // Auto-play audio
      if (ttsResult.audioUrl && !ttsResult.audioUrl.includes("mock-audio-url")) {
        const audio = new Audio(ttsResult.audioUrl);
        audio.play().catch(err => console.error("Audio playback failed:", err));
        toast.info("🔊 Playing voice response");
      } else {
        toast.info("🔊 Voice response generated (audio playback not available in demo)");
      }
    } catch (error) {
      toast.error("Failed to generate response");
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsListening(false);
    setTranscript("");
    setResponse("");
    setAudioUrl("");
    setLiveTranscript("");
  };

  return (
    <>
      {/* Floating Mic Button */}
      <Button
        onClick={handleVoiceInput}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl z-50 transition-all animate-glow-pulse ${
          isListening 
            ? "bg-destructive hover:bg-destructive/90 shadow-glow-purple" 
            : "bg-gradient-to-br from-primary to-secondary hover:scale-110 shadow-glow-blue"
        }`}
        size="icon"
      >
        {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
      </Button>

      {/* Voice AI Panel */}
      {isOpen && (
        <Card className="fixed bottom-28 right-8 w-96 p-6 shadow-2xl z-50 animate-fade-in glass-card glow-border-purple">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              🎤 Talk to PromoGPT
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs glass-card border-primary/50">
                    <p className="font-semibold mb-1">Example Kikuyu phrases:</p>
                    {kikuyuExamples.map((ex, i) => (
                      <p key={i} className="text-xs">{ex}</p>
                    ))}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h3>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-muted-foreground" />
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto Detect</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="swahili">Swahili</SelectItem>
                  <SelectItem value="kikuyu">Kikuyu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="text-center py-4">
              {isListening && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 text-destructive">
                    <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
                    <span className="font-medium">Listening...</span>
                  </div>
                  
                  {/* Waveform Animation */}
                  <div className="flex items-center justify-center gap-1 h-16">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-gradient-to-t from-neon-blue to-electric-purple rounded-full animate-waveform"
                        style={{
                          animationDelay: `${i * 0.1}s`,
                          height: '100%',
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Live Transcription Preview */}
                  {liveTranscript && (
                    <div className="bg-surface-dark/50 rounded-lg p-3 border border-neon-blue/30 animate-fade-in">
                      <p className="text-sm text-muted-foreground mb-1">Live transcription:</p>
                      <p className="text-sm text-foreground font-medium">{liveTranscript}</p>
                    </div>
                  )}
                </div>
              )}
              {isTranscribing && (
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <div className="w-3 h-3 bg-muted-foreground rounded-full animate-pulse" />
                  <span className="font-medium">Transcribing...</span>
                </div>
              )}
              {isProcessing && (
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <div className="w-3 h-3 bg-muted-foreground rounded-full animate-pulse" />
                  <span className="font-medium">Generating response...</span>
                </div>
              )}
              {!isListening && !isTranscribing && !isProcessing && transcript && (
                <div className="text-muted-foreground">
                  <span className="font-medium">✓ Response ready</span>
                </div>
              )}
            </div>

            {/* Transcript */}
            {transcript && (
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm font-medium mb-1">You said:</p>
                <p className="text-sm text-muted-foreground">{transcript}</p>
              </div>
            )}

            {/* AI Response */}
            {response && (
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20 animate-slide-up">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    PromoGPT says:
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0 hover:bg-primary/20"
                    onClick={() => toast.info("🔊 Playing audio...")}
                  >
                    <Volume2 className="w-4 h-4 text-primary" />
                  </Button>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{response}</p>
                <p className="text-xs text-accent mt-2 flex items-center gap-1">
                  💾 Saved to Intelligence Dashboard
                </p>
              </div>
            )}

            {/* Language Support */}
            <div className="text-xs text-center text-muted-foreground border-t pt-3">
              Supports English, Swahili & Kikuyu
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default VoiceAI;
