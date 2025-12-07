import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, User, Bot } from "lucide-react";
import { Conversation } from "@/lib/sessionStore";

interface ConversationPanelProps {
  conversations: Conversation[];
}

const ConversationPanel = ({ conversations }: ConversationPanelProps) => {
  if (conversations.length === 0) {
    return null;
  }

  return (
    <Card className="p-4 border-border/50">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-primary" />
        <h4 className="text-sm font-semibold">Recent Conversations</h4>
      </div>

      <ScrollArea className="h-48">
        <div className="space-y-3 pr-2">
          {conversations
            .slice()
            .reverse()
            .slice(0, 5)
            .map((conv) => (
              <div key={conv.id} className="space-y-2">
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-3 h-3 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">{conv.question}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 text-secondary" />
                  </div>
                  <p className="text-xs line-clamp-2">{conv.answer}</p>
                </div>
              </div>
            ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ConversationPanel;
