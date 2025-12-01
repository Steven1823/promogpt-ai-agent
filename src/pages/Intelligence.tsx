import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { mockSalesData, mockInsights } from "@/lib/mockData";
import { TrendingUp, Users, ShoppingBag, MessageSquare, Mic } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Intelligence = () => {
  const [question, setQuestion] = useState("");

  const chartData = mockSalesData.map(item => ({
    date: item.date.split('-')[2],
    revenue: item.revenue,
    units: item.units,
  }));

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

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Business Intelligence</h1>
          <p className="text-muted-foreground">AI-powered insights from your data</p>
        </div>

        {/* Ask AI Widget */}
        <Card className="p-6 mb-8 bg-gradient-card">
          <h3 className="font-semibold mb-4">💬 Ask Your Data</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Ask questions in English, Swahili, or Kikuyu. Try: "What are my top products?" or "nĩ kĩĩ kĩrathondeka wega?"
          </p>
          <div className="flex gap-2">
            <Input 
              placeholder="Ask anything about your business..." 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
            />
            <Button onClick={handleAskAI}>Ask AI</Button>
            <Button variant="outline" size="icon">
              <Mic className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* AI Summary */}
        <Card className="p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">🤖 AI Insights Summary</h3>
          <p className="text-muted-foreground mb-6">{mockInsights.summary}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">Top Products</h4>
              </div>
              <ul className="space-y-2">
                {mockInsights.topProducts.map((product, i) => (
                  <li key={i} className="text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                      {i + 1}
                    </span>
                    {product}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">Top Regions</h4>
              </div>
              <ul className="space-y-2">
                {mockInsights.topRegions.map((region, i) => (
                  <li key={i} className="text-sm flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                      {i + 1}
                    </span>
                    {region}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-primary" />
                <h4 className="font-semibold">Forecast</h4>
              </div>
              <p className="text-sm text-muted-foreground">{mockInsights.forecast}</p>
            </div>
          </div>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Revenue Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Units Sold</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="units" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Product Performance */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Product Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">Units Sold</th>
                  <th className="px-4 py-3 text-left">Revenue</th>
                  <th className="px-4 py-3 text-left">Trend</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { product: "Baby Diapers", units: 89, revenue: 26700, trend: "+15%" },
                  { product: "Baby Wipes", units: 49, revenue: 14700, trend: "+8%" },
                  { product: "Baby Oil", units: 26, revenue: 7800, trend: "+3%" },
                  { product: "Baby Shampoo", units: 15, revenue: 4500, trend: "-2%" },
                ].map((item, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-4 py-3 font-medium">{item.product}</td>
                    <td className="px-4 py-3">{item.units}</td>
                    <td className="px-4 py-3">KES {item.revenue.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-medium ${item.trend.startsWith('+') ? 'text-green-600' : 'text-destructive'}`}>
                        {item.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Intelligence;
