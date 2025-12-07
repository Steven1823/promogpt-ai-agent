import { Sparkles } from "lucide-react";

interface LatestInsightBannerProps {
  insight: string | null;
}

const LatestInsightBanner = ({ insight }: LatestInsightBannerProps) => {
  if (!insight) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/30">
        <Sparkles className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        <p className="text-sm text-muted-foreground">
          Upload a CSV to see AI-generated insights here.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
      <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
      <div className="flex-grow">
        <p className="text-xs font-medium text-primary mb-1">Latest Insight</p>
        <p className="text-sm">{insight.replace(/\*\*/g, "")}</p>
      </div>
    </div>
  );
};

export default LatestInsightBanner;
