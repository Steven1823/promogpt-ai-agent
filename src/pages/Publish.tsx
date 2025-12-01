import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockPublishingResults } from "@/lib/mockData";
import { CheckCircle, Send } from "lucide-react";
import { toast } from "sonner";

const Publish = () => {
  const [published, setPublished] = useState<string[]>([]);
  const [publishing, setPublishing] = useState(false);

  const platforms = [
    { id: "instagram", name: "Instagram", icon: "📸" },
    { id: "facebook", name: "Facebook", icon: "📘" },
    { id: "tiktok", name: "TikTok", icon: "🎵" },
    { id: "email", name: "Email", icon: "📧" },
  ];

  const handlePublish = (platform: string) => {
    setPublishing(true);
    setTimeout(() => {
      setPublished([...published, platform]);
      setPublishing(false);
      toast.success(`Published to ${platform} successfully!`);
    }, 1500);
  };

  const handlePublishAll = () => {
    setPublishing(true);
    setTimeout(() => {
      setPublished(platforms.map(p => p.id));
      setPublishing(false);
      toast.success("Published to all platforms successfully!");
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Publish Center</h1>
          <p className="text-muted-foreground">Schedule and publish content across platforms</p>
        </div>

        <div className="mb-8">
          <Button size="lg" onClick={handlePublishAll} disabled={publishing}>
            <Send className="mr-2 w-5 h-5" />
            {publishing ? "Publishing..." : "Publish to All Platforms"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platforms.map((platform) => {
            const isPublished = published.includes(platform.id);
            const result = mockPublishingResults[platform.id as keyof typeof mockPublishingResults];

            return (
              <Card key={platform.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{platform.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold">{platform.name}</h3>
                      {isPublished && (
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          Published
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => handlePublish(platform.id)}
                    disabled={isPublished || publishing}
                  >
                    {isPublished ? "Published" : "Publish Now"}
                  </Button>
                </div>

                {isPublished && (
                  <div className="space-y-3 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">{result.message}</p>
                    <div className="grid grid-cols-2 gap-4">
                      {'reach' in result && (
                        <div>
                          <p className="text-sm text-muted-foreground">Reach</p>
                          <p className="text-lg font-semibold">{result.reach.toLocaleString()}</p>
                        </div>
                      )}
                      {'engagement' in result && (
                        <div>
                          <p className="text-sm text-muted-foreground">Engagement</p>
                          <p className="text-lg font-semibold">{result.engagement}</p>
                        </div>
                      )}
                      {'views' in result && (
                        <div>
                          <p className="text-sm text-muted-foreground">Views</p>
                          <p className="text-lg font-semibold">{result.views.toLocaleString()}</p>
                        </div>
                      )}
                      {'likes' in result && (
                        <div>
                          <p className="text-sm text-muted-foreground">Likes</p>
                          <p className="text-lg font-semibold">{result.likes}</p>
                        </div>
                      )}
                      {'openRate' in result && (
                        <div>
                          <p className="text-sm text-muted-foreground">Open Rate</p>
                          <p className="text-lg font-semibold">{result.openRate}%</p>
                        </div>
                      )}
                      {'clickRate' in result && (
                        <div>
                          <p className="text-sm text-muted-foreground">Click Rate</p>
                          <p className="text-lg font-semibold">{result.clickRate}%</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Publish;
