import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockGeneratedContent } from "@/lib/mockData";
import { Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";

const ContentStudio = () => {
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      toast.success("Content generated successfully!");
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Content Studio</h1>
          <p className="text-muted-foreground">Generate marketing content powered by AI</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Button 
            size="lg" 
            onClick={handleGenerate}
            disabled={generating}
            className="h-24"
          >
            <Sparkles className="mr-2 w-5 h-5" />
            {generating ? "Generating..." : "Generate All Content"}
          </Button>
          <Card className="p-4 flex items-center justify-center text-center">
            <div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-sm text-muted-foreground">Content Types</p>
            </div>
          </Card>
          <Card className="p-4 flex items-center justify-center text-center">
            <div>
              <p className="text-2xl font-bold">Instant</p>
              <p className="text-sm text-muted-foreground">Generation Time</p>
            </div>
          </Card>
        </div>

        {generated && (
          <Tabs defaultValue="instagram" className="space-y-6">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="instagram">Instagram</TabsTrigger>
              <TabsTrigger value="tiktok">TikTok</TabsTrigger>
              <TabsTrigger value="ads">Ad Scripts</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
            </TabsList>

            <TabsContent value="instagram" className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Instagram Caption</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(mockGeneratedContent.instagramCaption)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={mockGeneratedContent.instagramCaption}
                  readOnly
                  className="min-h-[120px]"
                />
                <div className="mt-4">
                  <p className="text-sm font-semibold mb-2">Suggested Hashtags:</p>
                  <div className="flex flex-wrap gap-2">
                    {mockGeneratedContent.hashtags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="tiktok" className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">TikTok Script</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(mockGeneratedContent.tiktokScript)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={mockGeneratedContent.tiktokScript}
                  readOnly
                  className="min-h-[120px]"
                />
              </Card>
            </TabsContent>

            <TabsContent value="ads" className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Video Ad Script</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(mockGeneratedContent.adScript)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={mockGeneratedContent.adScript}
                  readOnly
                  className="min-h-[120px]"
                />
              </Card>
            </TabsContent>

            <TabsContent value="email" className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Email Campaign</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(mockGeneratedContent.emailCampaign)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={mockGeneratedContent.emailCampaign}
                  readOnly
                  className="min-h-[180px]"
                />
              </Card>
            </TabsContent>

            <TabsContent value="blog" className="space-y-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Blog Post</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(mockGeneratedContent.blogPost)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={mockGeneratedContent.blogPost}
                  readOnly
                  className="min-h-[300px]"
                />
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {!generated && (
          <Card className="p-12 text-center">
            <Sparkles className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ready to Create Content</h3>
            <p className="text-muted-foreground">
              Click "Generate All Content" to create marketing materials instantly
            </p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ContentStudio;
