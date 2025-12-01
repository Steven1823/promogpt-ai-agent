import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react";
import { mockInsights, mockBusinessProfile } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { 
      label: "Total Revenue", 
      value: `KES ${mockInsights.metrics.totalRevenue.toLocaleString()}`, 
      change: `+${mockInsights.metrics.growthRate}%`,
      icon: DollarSign,
      trend: "up"
    },
    { 
      label: "Total Orders", 
      value: mockInsights.metrics.totalOrders.toString(), 
      change: "+18%",
      icon: ShoppingCart,
      trend: "up"
    },
    { 
      label: "Avg Order Value", 
      value: `KES ${mockInsights.metrics.averageOrderValue}`, 
      change: "+5%",
      icon: TrendingUp,
      trend: "up"
    },
    { 
      label: "Customer Retention", 
      value: `${mockInsights.metrics.customerRetention}%`, 
      change: "+6%",
      icon: Users,
      trend: "up"
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-muted-foreground">
            Here's what's happening with {mockBusinessProfile.businessName} today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
                  <ArrowUpRight className="w-4 h-4" />
                  {stat.change}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* AI Insights Summary */}
        <Card className="p-6 mb-8 bg-gradient-card">
          <h2 className="text-xl font-bold mb-4">🤖 AI Business Intelligence</h2>
          <p className="text-muted-foreground mb-4">{mockInsights.summary}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Top Products</p>
              <div className="space-y-1">
                {mockInsights.topProducts.map((product) => (
                  <div key={product} className="text-sm font-medium">• {product}</div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Top Regions</p>
              <div className="space-y-1">
                {mockInsights.topRegions.map((region) => (
                  <div key={region} className="text-sm font-medium">• {region}</div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">30-Day Forecast</p>
              <p className="text-sm font-medium">{mockInsights.forecast}</p>
            </div>
          </div>
          <Button onClick={() => navigate("/dashboard/intelligence")}>
            View Full Intelligence
          </Button>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/dashboard/data-hub")}>
            <h3 className="font-semibold mb-2">📊 Data Hub</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upload CSV or connect your e-commerce store
            </p>
            <Button variant="outline" className="w-full">Manage Data</Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/dashboard/content-campaign")}>
            <h3 className="font-semibold mb-2">✨ Content & Campaign</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Generate captions, scripts, and full campaigns
            </p>
            <Button variant="outline" className="w-full">Create Content</Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/dashboard/ad-generator")}>
            <h3 className="font-semibold mb-2">🎬 Ad Generator</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create video ads with AI voice-overs
            </p>
            <Button variant="outline" className="w-full">Generate Ads</Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
