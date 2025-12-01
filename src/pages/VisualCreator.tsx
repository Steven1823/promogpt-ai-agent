import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Download } from "lucide-react";
import { toast } from "sonner";
import { mockBusinessProfile } from "@/lib/mockData";

const VisualCreator = () => {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      toast.success("Visual content generated!");
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Visual Creator</h1>
          <p className="text-muted-foreground">Generate posters, flyers, and infographics with your brand</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={handleGenerate}>
            <h3 className="font-semibold mb-2">📄 Poster</h3>
            <p className="text-sm text-muted-foreground">Product posters with your branding</p>
          </Card>
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={handleGenerate}>
            <h3 className="font-semibold mb-2">📊 Infographic</h3>
            <p className="text-sm text-muted-foreground">Data visualizations from insights</p>
          </Card>
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={handleGenerate}>
            <h3 className="font-semibold mb-2">🎨 Flyer</h3>
            <p className="text-sm text-muted-foreground">Promotional flyers for campaigns</p>
          </Card>
        </div>

        <Card className="p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Custom Generator</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Content Type</Label>
              <Input placeholder="e.g., Product poster, Sale flyer" />
            </div>
            <div className="space-y-2">
              <Label>Main Message</Label>
              <Input placeholder="e.g., 10% Off Baby Diapers" />
            </div>
            <Button onClick={handleGenerate} disabled={generating}>
              <Sparkles className="w-4 h-4 mr-2" />
              {generating ? "Generating..." : "Generate Visual"}
            </Button>
          </div>
        </Card>

        {generated && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Generated Visual</h3>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
            <div className="aspect-video bg-gradient-card rounded-lg border flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🎨</div>
                <h2 className="text-3xl font-bold mb-2" style={{ color: mockBusinessProfile.brandColors[0] }}>
                  {mockBusinessProfile.businessName}
                </h2>
                <p className="text-xl">10% OFF Baby Diapers</p>
                <p className="text-sm text-muted-foreground mt-4">Shop Now!</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Brand colors and style automatically applied
            </p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VisualCreator;
