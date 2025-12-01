import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { mockPerformanceData } from "@/lib/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Eye, Heart, MousePointer } from "lucide-react";

const Performance = () => {
  const totalImpressions = mockPerformanceData.reduce((sum, d) => sum + d.impressions, 0);
  const totalEngagement = mockPerformanceData.reduce((sum, d) => sum + d.engagement, 0);
  const totalClicks = mockPerformanceData.reduce((sum, d) => sum + d.clicks, 0);
  const avgEngagementRate = ((totalEngagement / totalImpressions) * 100).toFixed(2);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Performance Analytics</h1>
          <p className="text-muted-foreground">Track your marketing performance across channels</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Total Impressions</p>
            <p className="text-2xl font-bold">{totalImpressions.toLocaleString()}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Total Engagement</p>
            <p className="text-2xl font-bold">{totalEngagement.toLocaleString()}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MousePointer className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Total Clicks</p>
            <p className="text-2xl font-bold">{totalClicks.toLocaleString()}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Engagement Rate</p>
            <p className="text-2xl font-bold">{avgEngagementRate}%</p>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card className="p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6">Performance Over Time</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={mockPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="impressions" stroke="hsl(var(--primary))" strokeWidth={2} name="Impressions" />
              <Line type="monotone" dataKey="engagement" stroke="hsl(var(--secondary))" strokeWidth={2} name="Engagement" />
              <Line type="monotone" dataKey="clicks" stroke="hsl(var(--accent))" strokeWidth={2} name="Clicks" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Best Performing Content */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">Top Performing Posts</h3>
          <div className="space-y-4">
            {[
              { title: "Baby Diapers Promo", platform: "Instagram", engagement: 187, reach: 2100 },
              { title: "Baby Care Tips Video", platform: "TikTok", engagement: 156, reach: 3400 },
              { title: "Customer Testimonial", platform: "Facebook", engagement: 134, reach: 1890 },
            ].map((post, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-semibold">{post.title}</p>
                  <p className="text-sm text-muted-foreground">{post.platform}</p>
                </div>
                <div className="flex gap-6 text-sm">
                  <div>
                    <p className="text-muted-foreground">Reach</p>
                    <p className="font-semibold">{post.reach.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Engagement</p>
                    <p className="font-semibold">{post.engagement}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Performance;
