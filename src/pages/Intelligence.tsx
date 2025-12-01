import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { mockSalesData, mockInsights } from "@/lib/mockData";
import { TrendingUp, Users, ShoppingBag, MessageSquare, Mic, Sparkles, DollarSign, Package, MapPin, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getConversationHistory } from "@/lib/mockApi";
import { ScrollArea } from "@/components/ui/scroll-area";

const Intelligence = () => {
  const [question, setQuestion] = useState("");
  const [conversations, setConversations] = useState<Array<any>>([]);

  useEffect(() => {
    // Update conversations when component mounts or periodically
    const interval = setInterval(() => {
      setConversations(getConversationHistory());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const chartData = mockSalesData.map(item => ({
    date: item.date.split('-')[2],
    revenue: item.revenue,
    units: item.units,
  }));

  const regionData = [
    { name: "Nairobi", value: 35, color: "hsl(var(--primary))" },
    { name: "Kisumu", value: 30, color: "hsl(var(--secondary))" },
    { name: "Mombasa", value: 20, color: "hsl(var(--accent))" },
    { name: "Others", value: 15, color: "hsl(var(--muted))" },
  ];

  const handleAskAI = () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }
    
    toast.success("AI is analyzing your data...", {
      description: "Check the Voice AI panel for the response"
    });
    setQuestion("");
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Business Intelligence
          </h1>
          <p className="text-muted-foreground">AI-powered insights from your data</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Card className="glass-card glow-border p-6 hover:glow-border-purple transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-primary" />
              <span className="text-xs text-muted-foreground">REVENUE</span>
            </div>
            <div className="text-3xl font-bold text-foreground">KES 53.7K</div>
            <div className="text-sm text-accent mt-1">↑ 12% vs last week</div>
          </Card>
          
          <Card className="glass-card glow-border p-6 hover:glow-border-purple transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <Package className="w-8 h-8 text-secondary" />
              <span className="text-xs text-muted-foreground">UNITS SOLD</span>
            </div>
            <div className="text-3xl font-bold text-foreground">183</div>
            <div className="text-sm text-accent mt-1">↑ 8% vs last week</div>
          </Card>
          
          <Card className="glass-card glow-border p-6 hover:glow-border-teal transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-accent" />
              <span className="text-xs text-muted-foreground">CUSTOMERS</span>
            </div>
            <div className="text-3xl font-bold text-foreground">147</div>
            <div className="text-sm text-accent mt-1">↑ 5% retention</div>
          </Card>
          
          <Card className="glass-card glow-border p-6 hover:glow-border-purple transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <MapPin className="w-8 h-8 text-primary" />
              <span className="text-xs text-muted-foreground">TOP REGION</span>
            </div>
            <div className="text-3xl font-bold text-foreground">Nairobi</div>
            <div className="text-sm text-accent mt-1">35% of sales</div>
          </Card>
        </div>

        {/* Ask AI Widget */}
        <Card className="glass-card glow-border-purple p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-secondary animate-glow-pulse" />
            <h3 className="font-semibold text-xl">Ask Your Data Anything</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Ask questions in English, Swahili, or Kikuyu. Try: "What are my top products?" or "nĩ kĩĩ kĩrathondeka wega?"
          </p>
          <div className="flex gap-2">
            <Input 
              placeholder="Ask anything about your business..." 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
              className="bg-background/50 border-border/50 focus:border-primary"
            />
            <Button onClick={handleAskAI} className="bg-primary hover:bg-primary/90 shadow-glow-blue">
              Ask AI
            </Button>
            <Button variant="outline" size="icon" className="border-secondary/50 hover:bg-secondary/10">
              <Mic className="w-4 h-4 text-secondary" />
            </Button>
          </div>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Summary */}
            <Card className="glass-card glow-border-teal p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-accent" />
                <h3 className="text-xl font-bold">AI Insights Summary</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{mockInsights.summary}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <ShoppingBag className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold text-sm">Top Products</h4>
                  </div>
                  <ul className="space-y-2">
                    {mockInsights.topProducts.map((product, i) => (
                      <li key={i} className="text-sm flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-medium">
                          {i + 1}
                        </span>
                        <span className="text-foreground/90">{product}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <h4 className="font-semibold text-sm">Top Regions</h4>
                  </div>
                  <ul className="space-y-2">
                    {mockInsights.topRegions.map((region, i) => (
                      <li key={i} className="text-sm flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary text-xs flex items-center justify-center font-medium">
                          {i + 1}
                        </span>
                        <span className="text-foreground/90">{region}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-accent" />
                    <h4 className="font-semibold text-sm">Forecast</h4>
                  </div>
                  <p className="text-sm text-foreground/90">{mockInsights.forecast}</p>
                </div>
              </div>
            </Card>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card glow-border p-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Revenue Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--primary))',
                        borderRadius: '8px',
                        boxShadow: 'var(--glow-blue)'
                      }}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ fill: 'hsl(var(--primary))', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="glass-card glow-border p-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Package className="w-4 h-4 text-secondary" />
                  Units Sold
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--secondary))',
                        borderRadius: '8px',
                        boxShadow: 'var(--glow-purple)'
                      }}
                    />
                    <Bar dataKey="units" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Region Distribution */}
            <Card className="glass-card glow-border p-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                Sales by Region
              </h3>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={regionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--accent))',
                        borderRadius: '8px',
                        boxShadow: 'var(--glow-teal)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {regionData.map((region, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }} />
                    <span className="text-sm text-foreground/80">{region.name}: {region.value}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Conversations */}
          <div className="space-y-6">
            <Card className="glass-card glow-border-purple p-6 animate-slide-up" style={{ animationDelay: '0.7s' }}>
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-secondary animate-glow-pulse" />
                <h3 className="font-semibold text-lg">AI Conversations</h3>
              </div>
              
              {conversations.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Mic className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No conversations yet.</p>
                  <p className="text-xs mt-1">Use the mic button to start talking to PromoGPT</p>
                </div>
              ) : (
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {conversations.map((conv) => (
                      <div key={conv.id} className="p-4 rounded-lg bg-background/30 border border-border/50 hover:border-primary/30 transition-all">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Users className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-foreground mb-1">{conv.question}</div>
                            <div className="text-xs text-muted-foreground">{formatTime(conv.timestamp)} • {conv.language}</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 mt-3 ml-11">
                          <div className="text-sm text-foreground/80 leading-relaxed bg-primary/5 p-3 rounded-lg border border-primary/10">
                            {conv.answer}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Intelligence;
