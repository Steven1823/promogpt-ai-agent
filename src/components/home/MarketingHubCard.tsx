import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Copy, Save, Calendar, Edit3, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { aiGenerate } from "@/lib/apiStubs";
import { getSession, addToLibrary, checkUsageLimit, isGuestMode, ContentItem } from "@/lib/sessionStore";

interface MarketingHubCardProps {
  generatedContent: ContentItem[];
  onContentGenerated: () => void;
  usageCount: number;
  maxUsage: number;
}

const MarketingHubCard = ({
  generatedContent,
  onContentGenerated,
  usageCount,
  maxUsage,
}: MarketingHubCardProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const guest = isGuestMode();
  const atLimit = usageCount >= maxUsage;

  const handleGenerate = async () => {
    if (!checkUsageLimit("contentGenerations")) {
      toast.error("Content generation limit reached");
      return;
    }

    setIsGenerating(true);

    try {
      await aiGenerate({
        action: "generate_content_samples",
        dataSummary: { rowCount: getSession().currentData.length },
      });

      toast.success("Content generated!");
      onContentGenerated();
    } catch (error) {
      toast.error("Failed to generate content");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSave = (item: ContentItem) => {
    addToLibrary({
      type: item.type,
      text: item.text,
    });
    setSavedIds((prev) => new Set([...prev, item.id]));
    toast.success("Saved to library");
  };

  const handleSchedule = () => {
    if (guest) {
      toast.info("Guest mode — upgrade to schedule posts");
      return;
    }
    toast.info("Scheduling coming soon!");
  };

  const contentTypeLabels: Record<string, string> = {
    instagramCaption: "📸 Instagram Caption",
    adScript: "🎬 Ad Script (30s)",
    emailPromo: "✉️ Email Promo",
    tiktokScript: "🎵 TikTok Script",
    blogPost: "📝 Blog Post",
  };

  return (
    <Card className="p-6 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 border-border/50">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">Marketing Hub</h3>
          <p className="text-xs text-muted-foreground">
            {usageCount}/{maxUsage} generations used
          </p>
        </div>
      </div>

      {generatedContent.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-sm text-muted-foreground mb-4">
            Generate content based on your business data
          </p>
          <Button
            id="generate-content-btn"
            onClick={handleGenerate}
            disabled={isGenerating || atLimit}
            className="gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Generate Content
              </>
            )}
          </Button>
          {atLimit && (
            <p className="text-xs text-destructive mt-2">
              Free limit reached.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {generatedContent.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-lg bg-muted/30 border border-border/30"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">
                  {contentTypeLabels[item.type] || item.type}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleCopy(item.text, item.id)}
                  >
                    {copiedId === item.id ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </Button>
                  <Button
                    id="save-to-library-btn"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleSave(item)}
                    disabled={savedIds.has(item.id)}
                  >
                    {savedIds.has(item.id) ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                      <Save className="w-3.5 h-3.5" />
                    )}
                  </Button>
                  <Button
                    id="schedule-btn"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={handleSchedule}
                    disabled={guest}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              <p className="text-sm line-clamp-3">{item.text}</p>
            </div>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerate}
            disabled={isGenerating || atLimit}
            className="w-full gap-2 mt-2"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            Regenerate
          </Button>
        </div>
      )}
    </Card>
  );
};

export default MarketingHubCard;
