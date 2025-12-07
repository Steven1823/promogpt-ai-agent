import { useEffect, useState, useCallback } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { RotateCcw, FileSpreadsheet, Database } from "lucide-react";
import { toast } from "sonner";
import { getSession, resetToDemo, isGuestMode, SessionData } from "@/lib/sessionStore";
import { getMockDashboard } from "@/lib/apiStubs";
import UploadCSVCard from "@/components/home/UploadCSVCard";
import AskPromoGPTCard from "@/components/home/AskPromoGPTCard";
import MarketingHubCard from "@/components/home/MarketingHubCard";
import ConversationPanel from "@/components/home/ConversationPanel";
import LatestInsightBanner from "@/components/home/LatestInsightBanner";

const Dashboard = () => {
  const [session, setSession] = useState<SessionData>(getSession());
  const [isLoading, setIsLoading] = useState(true);
  const guest = isGuestMode();

  const refreshSession = useCallback(() => {
    setSession(getSession());
  }, []);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        await getMockDashboard();
        refreshSession();
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to load dashboard");
        setIsLoading(false);
      }
    };
    loadDashboard();

    // Keyboard shortcut: Ctrl+D for demo reset
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "d") {
        e.preventDefault();
        handleReset();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [refreshSession]);

  const handleReset = () => {
    resetToDemo();
    refreshSession();
    toast.success("Reset to demo data", {
      description: "Sunrise Baby Store sample data loaded",
    });
  };

  const handleUploadComplete = () => {
    refreshSession();
  };

  const handleAIResponse = (question: string, answer: string) => {
    refreshSession();
  };

  const handleContentGenerated = () => {
    refreshSession();
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              {session.businessProfile.businessName}
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              {session.isUsingDemoData ? (
                <span className="flex items-center gap-1.5">
                  <Database className="w-4 h-4" />
                  Demo Data
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <FileSpreadsheet className="w-4 h-4" />
                  {session.lastUploadFilename} ({session.currentData.length} rows)
                </span>
              )}
              {guest && (
                <span className="text-xs bg-muted px-2 py-0.5 rounded">
                  Guest Mode
                </span>
              )}
            </div>
          </div>

          {!session.isUsingDemoData && (
            <Button
              id="reset-demo-btn"
              variant="outline"
              onClick={handleReset}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset to Demo Data
            </Button>
          )}
        </div>

        {/* Main Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <UploadCSVCard onUploadComplete={handleUploadComplete} />

          <AskPromoGPTCard
            onResponse={handleAIResponse}
            usageCount={session.usageCounters.aiQueries}
            maxUsage={session.limits.maxAiQueries}
          />

          <MarketingHubCard
            generatedContent={session.generatedContent}
            onContentGenerated={handleContentGenerated}
            usageCount={session.usageCounters.contentGenerations}
            maxUsage={session.limits.maxContentGenerations}
          />
        </div>

        {/* Latest Insight */}
        <div className="mb-8">
          <LatestInsightBanner insight={session.latestInsight} />
        </div>

        {/* Conversations Panel */}
        {session.conversations.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ConversationPanel conversations={session.conversations} />

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                <p className="text-xs text-muted-foreground mb-1">Total Revenue</p>
                <p className="text-xl font-bold">
                  KES{" "}
                  {session.currentData
                    .reduce((sum, row) => sum + row.revenue, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                <p className="text-xs text-muted-foreground mb-1">Total Units</p>
                <p className="text-xl font-bold">
                  {session.currentData
                    .reduce((sum, row) => sum + row.units, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                <p className="text-xs text-muted-foreground mb-1">AI Queries</p>
                <p className="text-xl font-bold">
                  {session.usageCounters.aiQueries}/{session.limits.maxAiQueries}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                <p className="text-xs text-muted-foreground mb-1">Content Generated</p>
                <p className="text-xl font-bold">
                  {session.usageCounters.contentGenerations}/{session.limits.maxContentGenerations}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Guest Mode Banner */}
        {guest && (
          <div className="mt-8 p-4 rounded-xl bg-muted/20 border border-border/30 text-center">
            <p className="text-sm text-muted-foreground">
              Guest mode — scheduling and publishing features are disabled.{" "}
              <button className="text-primary hover:underline">
                Upgrade to unlock
              </button>
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
