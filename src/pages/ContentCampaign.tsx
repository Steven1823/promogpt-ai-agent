import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { mockGeneratedContent, mockCampaign } from "@/lib/mockData";
import { Copy, Download, Calendar, Target, DollarSign } from "lucide-react";

const ContentCampaign = () => {
  const [generating, setGenerating] = useState(false);
  const [selectedTab, setSelectedTab] = useState("captions");

  const handleGenerate = async (type: string) => {
    setGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setGenerating(false);
    toast.success(`${type} generated successfully!`);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Content & Campaign Studio</h1>
          <p className="text-muted-foreground">AI-powered content creation and campaign planning</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="captions">Captions</TabsTrigger>
            <TabsTrigger value="scripts">Scripts</TabsTrigger>
            <TabsTrigger value="promos">Promos</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Plan</TabsTrigger>
            <TabsTrigger value="campaign">Campaign</TabsTrigger>
          </TabsList>

          {/* Captions */}
          <TabsContent value="captions" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Generate Social Media Caption</h3>
              <p className="text-sm text-muted-foreground mb-4">
                AI will create engaging captions based on your top products and brand voice
              </p>
              <Button onClick={() => handleGenerate("Caption")} disabled={generating}>
                {generating ? "Generating..." : "Generate Caption"}
              </Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Generated Caption</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleCopy(mockGeneratedContent.instagramCaption)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
              <Textarea 
                value={mockGeneratedContent.instagramCaption}
                readOnly
                rows={4}
                className="mb-4"
              />
              <div className="flex gap-2 text-xs text-muted-foreground">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">Instagram</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">Facebook</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">TikTok</span>
              </div>
            </Card>
          </TabsContent>

          {/* Scripts */}
          <TabsContent value="scripts" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Generate Ad Script</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create compelling scripts for video ads and voice-overs
              </p>
              <Button onClick={() => handleGenerate("Script")} disabled={generating}>
                {generating ? "Generating..." : "Generate Script"}
              </Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Generated Script</h3>
                <Button variant="outline" size="sm" onClick={() => handleCopy(mockGeneratedContent.adScript)}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea 
                value={mockGeneratedContent.adScript}
                readOnly
                rows={6}
              />
            </Card>
          </TabsContent>

          {/* Promos */}
          <TabsContent value="promos" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Generate Promo Content</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create promotional content for sales, discounts, and special offers
              </p>
              <Button onClick={() => handleGenerate("Promo")} disabled={generating}>
                {generating ? "Generating..." : "Generate Promo"}
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Sample Promo Content</h3>
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="font-medium mb-2">🎉 Flash Sale Alert!</p>
                  <p className="text-sm text-muted-foreground">
                    Get 20% OFF on all Baby Diapers this weekend! Limited stock available. Shop now at Sunrise Baby Store! 🍼
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="font-medium mb-2">💝 Bundle Offer</p>
                  <p className="text-sm text-muted-foreground">
                    Buy 2 Baby Products, Get 1 FREE! Perfect combo: Diapers + Wipes + Oil. Available for 48 hours only! ⏰
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Weekly Plan */}
          <TabsContent value="weekly" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Generate Weekly Content Plan</h3>
              <p className="text-sm text-muted-foreground mb-4">
                AI creates a complete 7-day content calendar with posts, captions, and schedules
              </p>
              <Button onClick={() => handleGenerate("Weekly Plan")} disabled={generating}>
                {generating ? "Generating..." : "Generate Weekly Plan"}
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">This Week's Content Calendar</h3>
              <div className="space-y-3">
                {[
                  { day: "Monday", content: "Product spotlight: Baby Diapers", platform: "Instagram" },
                  { day: "Tuesday", content: "Customer testimonial video", platform: "TikTok" },
                  { day: "Wednesday", content: "Tips for new moms", platform: "Facebook" },
                  { day: "Thursday", content: "Behind the scenes", platform: "Instagram" },
                  { day: "Friday", content: "Weekend sale announcement", platform: "All Platforms" },
                  { day: "Saturday", content: "User-generated content repost", platform: "Instagram" },
                  { day: "Sunday", content: "Engagement poll", platform: "Facebook" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.day}</p>
                      <p className="text-sm text-muted-foreground">{item.content}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">{item.platform}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Campaign Planner */}
          <TabsContent value="campaign" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">AI Campaign Planner</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Generate a complete marketing campaign with budget, timeline, and content assets
              </p>
              <Button onClick={() => handleGenerate("Campaign")} disabled={generating}>
                {generating ? "Generating..." : "Generate Campaign"}
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">{mockCampaign.campaignName}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Objective</p>
                    <p className="font-medium">{mockCampaign.objective}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className="font-medium">{mockCampaign.budget}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{mockCampaign.duration}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-3">Target Audience</h4>
                <p className="text-sm text-muted-foreground">{mockCampaign.targetAudience}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-3">Channels</h4>
                <div className="flex gap-2">
                  {mockCampaign.channels.map(channel => (
                    <span key={channel} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {channel}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Content Calendar</h4>
                <div className="space-y-2">
                  {mockCampaign.contentCalendar.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.post}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                      <Button variant="outline" size="sm">Generate Assets</Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ContentCampaign;
