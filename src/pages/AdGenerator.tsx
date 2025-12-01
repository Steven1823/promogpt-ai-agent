import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Video, Mic } from "lucide-react";
import { toast } from "sonner";

const AdGenerator = () => {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [script, setScript] = useState("Introducing Sunrise Baby Store - your trusted home for quality baby essentials. From diapers to oils, we've got everything your little one needs. Shop comfort, shop love!");

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      toast.success("Video ad generated with AI voice!");
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Ad Generator</h1>
          <p className="text-muted-foreground">Create video ads with AI scripts, voice-overs, and visuals</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Script Editor</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Video Script</Label>
                  <Textarea
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    rows={6}
                    placeholder="Enter your video script..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>AI Voice</Label>
                  <Select defaultValue="professional">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional (Female)</SelectItem>
                      <SelectItem value="casual">Casual (Male)</SelectItem>
                      <SelectItem value="energetic">Energetic (Female)</SelectItem>
                      <SelectItem value="calm">Calm (Male)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Video Style</Label>
                  <Select defaultValue="product">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product">Product Showcase</SelectItem>
                      <SelectItem value="testimonial">Customer Testimonial</SelectItem>
                      <SelectItem value="promo">Promotional</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card">
              <h4 className="font-semibold mb-3">🎤 Powered by ElevenLabs</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Professional AI voices in multiple languages and tones
              </p>
              <h4 className="font-semibold mb-3">🎬 Powered by HeyGen</h4>
              <p className="text-sm text-muted-foreground">
                AI video generation with avatars and animations
              </p>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Preview</h3>
                <Button onClick={handleGenerate} disabled={generating}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  {generating ? "Generating..." : "Generate Video"}
                </Button>
              </div>

              {generated ? (
                <div className="space-y-4">
                  <div className="aspect-video bg-gradient-hero rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Video className="w-20 h-20 text-white/80" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="flex items-center gap-2 text-white">
                        <Mic className="w-4 h-4" />
                        <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
                          <div className="h-full w-1/3 bg-white rounded-full animate-pulse" />
                        </div>
                        <span className="text-sm">0:15</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button className="w-full">Download Video</Button>
                    <Button variant="outline" className="w-full">Download Audio</Button>
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm font-semibold mb-2">Generated Assets:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>✓ 15-second video ad (1080x1920)</li>
                      <li>✓ AI voiceover audio file</li>
                      <li>✓ Optimized for Instagram Reels/TikTok</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Video className="w-16 h-16 mx-auto mb-2" />
                    <p>Video preview will appear here</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdGenerator;
