import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { mockInsights } from "@/lib/mockData";

const CarouselMaker = () => {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { title: "📊 Your Business in Numbers", content: `Total Revenue: KES ${mockInsights.metrics.totalRevenue.toLocaleString()}` },
    { title: "🏆 Top Product", content: mockInsights.topProducts[0] },
    { title: "📍 Best Region", content: mockInsights.topRegions[0] },
    { title: "📈 Growth Rate", content: `+${mockInsights.metrics.growthRate}% this week` },
    { title: "🎯 Customer Loyalty", content: `${mockInsights.metrics.customerRetention}% retention rate` },
    { title: "🚀 What's Next", content: mockInsights.forecast },
  ];

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      toast.success("Carousel generated!");
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Carousel Maker</h1>
          <p className="text-muted-foreground">Auto-generate Instagram carousels from your insights</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Button 
            size="lg" 
            className="h-24"
            onClick={handleGenerate}
            disabled={generating}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {generating ? "Generating..." : "Generate From Insights"}
          </Button>
          <Card className="p-4 flex items-center justify-center text-center">
            <div>
              <p className="text-2xl font-bold">6</p>
              <p className="text-sm text-muted-foreground">Slides per Carousel</p>
            </div>
          </Card>
          <Card className="p-4 flex items-center justify-center text-center">
            <div>
              <p className="text-2xl font-bold">Instant</p>
              <p className="text-sm text-muted-foreground">Ready to Download</p>
            </div>
          </Card>
        </div>

        {generated && (
          <div className="space-y-6">
            <Card className="p-8">
              <div className="aspect-square max-w-md mx-auto bg-gradient-hero rounded-lg flex flex-col items-center justify-center text-white p-8 relative">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">{slides[currentSlide].title}</h2>
                  <p className="text-xl">{slides[currentSlide].content}</p>
                </div>
                
                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                    disabled={currentSlide === 0}
                    className="text-white hover:bg-white/20"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  
                  <div className="flex gap-2">
                    {slides.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i === currentSlide ? 'bg-white' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                    disabled={currentSlide === slides.length - 1}
                    className="text-white hover:bg-white/20"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>

            <div className="flex justify-center gap-4">
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Download All Slides
              </Button>
              <Button variant="outline">Edit Carousel</Button>
            </div>

            <Card className="p-4 bg-blue-50 dark:bg-blue-950">
              <h4 className="font-semibold mb-2">Auto-generated Hashtags</h4>
              <div className="flex flex-wrap gap-2">
                {mockInsights.topProducts.map((product) => (
                  <span key={product} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    #{product.replace(/\s+/g, '')}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CarouselMaker;
