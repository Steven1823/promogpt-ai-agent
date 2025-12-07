import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send, Loader2, MessageSquare, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { aiGenerate, textToSpeech } from "@/lib/apiStubs";
import { getSession, checkUsageLimit } from "@/lib/sessionStore";

interface AskPromoGPTCardProps {
  onResponse: (question: string, answer: string) => void;
  usageCount: number;
  maxUsage: number;
}

const AskPromoGPTCard = ({ onResponse, usageCount, maxUsage }: AskPromoGPTCardProps) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAsk = async () => {
    if (!query.trim()) return;

    if (!checkUsageLimit("aiQueries")) {
      toast.error("Usage limit reached", {
        description: "Upgrade to continue using AI features.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await aiGenerate({
        action: "ask_question",
        prompt: query,
        context: {
          dashboard: "intelligence",
          userSessionData: getSession().currentData,
        },
      });

      onResponse(query, response.text);
      setQuery("");

      // Optional: TTS for the response
      try {
        const tts = await textToSpeech({ text: response.text });
        if (tts.audioUrl && !tts.audioUrl.startsWith("data:")) {
          const audio = new Audio(tts.audioUrl);
          audio.play().catch(() => {});
        }
      } catch {
        // TTS is optional, silently fail
      }
    } catch (error) {
      toast.error("Failed to get response");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMic = async () => {
    if (!checkUsageLimit("aiQueries")) {
      toast.error("Usage limit reached");
      return;
    }

    // Check for Web Speech API
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      toast.info("Voice input not available", {
        description: "Please type your question instead.",
      });
      inputRef.current?.focus();
      return;
    }

    setIsListening(true);

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast.error("Could not capture voice");
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (error) {
      setIsListening(false);
      toast.error("Voice capture failed");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  const atLimit = usageCount >= maxUsage;

  return (
    <Card className="p-6 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 border-border/50">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Ask PromoGPT</h3>
            <p className="text-xs text-muted-foreground">
              {usageCount}/{maxUsage} queries used
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 flex-grow">
          Ask questions about your business data in English, Swahili, or Kikuyu.
        </p>

        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Input
              ref={inputRef}
              id="ask-ai-input"
              placeholder={atLimit ? "Limit reached" : "Ask about your sales, products..."}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading || atLimit}
              className="pr-10"
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>

          <Button
            id="mic-button"
            variant="outline"
            size="icon"
            onClick={handleMic}
            disabled={isLoading || atLimit}
            className={isListening ? "bg-destructive text-destructive-foreground animate-pulse" : ""}
          >
            <Mic className="w-4 h-4" />
          </Button>

          <Button
            id="ask-ai-btn"
            size="icon"
            onClick={handleAsk}
            disabled={isLoading || !query.trim() || atLimit}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {atLimit && (
          <p className="text-xs text-destructive mt-2">
            Free limit reached. Upgrade to continue.
          </p>
        )}
      </div>
    </Card>
  );
};

export default AskPromoGPTCard;
