import { useState } from "react";
import { Mic, MicOff, Volume2, X, Languages, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { speechToText, generateContent, textToSpeech, saveToLibrary } from "@/lib/mockApi";
import { mockBusinessProfile } from "@/lib/mockData";
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
      toast.info("Transcribing...");

      try {
        // Call STT mock API
        const sttResult = await speechToText({
          audioBlob: "mock-audio-blob",
          languageHint: language !== "auto" ? language : undefined,
        });

        setTranscript(sttResult.transcript);
        setIsTranscribing(false);
        
        // Auto-confirm and generate response
        await handleConfirmTranscript(sttResult.transcript);
      } catch (error) {
        toast.error("Transcription failed");
        setIsTranscribing(false);
        setIsListening(false);
      }
    } else {
      // Start listening
      setIsListening(true);
      setIsOpen(true);
      setTranscript("");
      setResponse("");
      setAudioUrl("");
      toast.info("Listening... Speak now (English, Swahili, or Kikuyu)");
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

      toast.success("Response generated and saved to Library");
      setIsProcessing(false);

      // Auto-play audio (mock)
      setTimeout(() => {
        toast.info("🔊 Playing voice response");
      }, 500);
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
  };

  return (
    <>
      {/* Floating Mic Button */}
      <Button
        onClick={handleVoiceInput}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-lg z-50 transition-all ${
          isListening ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
        }`}
        size="icon"
      >
        {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
      </Button>

      {/* Voice AI Panel */}
      {isOpen && (
        <Card className="fixed bottom-28 right-8 w-96 p-6 shadow-xl z-50 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              🎤 Talk to PromoGPT
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
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
                <div className="flex items-center justify-center gap-2 text-destructive">
                  <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
                  <span className="font-medium">Listening...</span>
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
              <div className="bg-primary/10 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">PromoGPT says:</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0"
                    onClick={() => toast.info("🔊 Playing audio...")}
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-foreground">{response}</p>
                <p className="text-xs text-muted-foreground mt-2">💾 Saved to Library</p>
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
