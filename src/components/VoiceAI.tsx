import { useState } from "react";
import { Mic, MicOff, Volume2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const VoiceAI = () => {
  const [isListening, setIsListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const kikuyuPhrases: Record<string, string> = {
    "nĩ kĩĩ kĩrathondeka wega?": "What is selling well?",
    "nĩ kĩĩ kĩbatari gũthondeka?": "What is not selling?",
    "thondeka atĩa?": "How are sales?",
    "nĩ andũ akĩrĩ athĩ?": "Who are the customers?",
    "nĩ kĩĩ kĩngĩhota gwĩka?": "What can I do?",
  };

  const handleVoiceInput = async () => {
    if (isListening) {
      // Stop listening
      setIsListening(false);
      setIsProcessing(true);

      // Simulate speech-to-text processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock transcript (randomly pick English or Kikuyu)
      const mockTranscripts = [
        "What are my top selling products this week?",
        "nĩ kĩĩ kĩrathondeka wega?",
        "Generate a social media post for Baby Diapers",
        "thondeka atĩa?",
        "Show me customer insights",
      ];
      
      const randomTranscript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
      
      // Check if it's Kikuyu and translate
      const finalTranscript = kikuyuPhrases[randomTranscript.toLowerCase()] || randomTranscript;
      
      setTranscript(finalTranscript);

      // Generate AI response
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockResponses: Record<string, string> = {
        "What are my top selling products this week?": "Your top products this week are Baby Diapers (55 units, KES 16,500), Baby Wipes (49 units, KES 14,700), and Baby Oil (26 units, KES 7,800). Baby Diapers show the strongest growth.",
        "What is selling well?": "Baby Diapers and Baby Wipes are your star products. Diapers lead with 89 units sold this week, generating KES 26,700 in revenue.",
        "Generate a social media post for Baby Diapers": "Sure! Here's your post: '🍼 Moms trust Sunrise Baby Store! Our premium Baby Diapers keep your little one dry and happy all day. Shop now and get 10% off! 💕 #BabyEssentials #SunriseBabyStore'",
        "How are sales?": "Sales are up 12% this week compared to last week. Total revenue is KES 53,700 from 183 units sold. Nairobi and Kisumu are your strongest regions.",
        "Show me customer insights": "You have 3 active customers. Grace Otieno is your top customer with KES 5,400 spent across 3 visits. Kevin Wanjiru follows with KES 12,900. Customer retention improved to 26%.",
      };

      const aiResponse = mockResponses[finalTranscript] || "I understand your question. Let me analyze your business data and provide insights. Based on Sunrise Baby Store's performance, I recommend focusing on your top products and expanding in high-performing regions.";
      
      setResponse(aiResponse);
      setIsProcessing(false);

      // Play text-to-speech (mock)
      toast.success("Voice response generated");
    } else {
      // Start listening
      setIsListening(true);
      setIsOpen(true);
      setTranscript("");
      setResponse("");
      toast.info("Listening... Speak now (English, Swahili, or Kikuyu)");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsListening(false);
    setTranscript("");
    setResponse("");
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
            <h3 className="font-semibold text-lg">🎤 PromoGPT Voice AI</h3>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {/* Status */}
            <div className="text-center py-4">
              {isListening && (
                <div className="flex items-center justify-center gap-2 text-destructive">
                  <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
                  <span className="font-medium">Listening...</span>
                </div>
              )}
              {isProcessing && (
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <div className="w-3 h-3 bg-muted-foreground rounded-full animate-pulse" />
                  <span className="font-medium">Processing...</span>
                </div>
              )}
              {!isListening && !isProcessing && transcript && (
                <div className="text-muted-foreground">
                  <span className="font-medium">Response ready</span>
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
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-foreground">{response}</p>
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
