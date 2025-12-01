import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, BarChart3, Zap, TrendingUp, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div 
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
              <Sparkles className="w-4 h-4" />
              AI-Powered Marketing Intelligence
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Transform Your Data Into{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Marketing Magic
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              PromoGPT analyzes your business data and generates insights, campaigns, and content—all powered by AI. 
              Marketing automation made simple for SMEs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button size="lg" className="text-lg gap-2 group">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Everything You Need to <span className="text-primary">Scale Marketing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From data insights to content creation, PromoGPT handles it all
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<BarChart3 />}
            title="Smart Analytics"
            description="Upload your data and get instant insights about sales, customers, and business performance."
          />
          <FeatureCard
            icon={<Sparkles />}
            title="AI Content Studio"
            description="Generate social posts, email campaigns, blog articles, and ad scripts in seconds."
          />
          <FeatureCard
            icon={<Zap />}
            title="Campaign Builder"
            description="Create full marketing campaigns with content calendars and posting schedules."
          />
          <FeatureCard
            icon={<TrendingUp />}
            title="Predictive Insights"
            description="AI forecasts your next 30 days and suggests strategies to maximize growth."
          />
          <FeatureCard
            icon={<Target />}
            title="Multi-Channel Publishing"
            description="Publish directly to Instagram, Facebook, TikTok, X, and email from one place."
          />
          <FeatureCard
            icon={<Users />}
            title="Customer Intelligence"
            description="Understand your customers better with AI-powered segmentation and insights."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 container mx-auto px-4">
        <Card className="relative overflow-hidden p-12 md:p-16 text-center bg-gradient-card border-primary/20">
          <div className="absolute inset-0 bg-gradient-hero opacity-5" />
          <div className="relative space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Supercharge Your Marketing?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of SMEs using AI to grow their business
            </p>
            <Button size="lg" className="text-lg gap-2 group">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 PromoGPT. AI Marketing Intelligence Platform.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
};

export default Index;
