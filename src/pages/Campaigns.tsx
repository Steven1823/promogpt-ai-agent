import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockCampaign } from "@/lib/mockData";
import { Calendar, Target, DollarSign, Users } from "lucide-react";

const Campaigns = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Campaign Builder</h1>
          <p className="text-muted-foreground">Plan and execute multi-channel campaigns</p>
        </div>

        {/* Campaign Overview */}
        <Card className="p-6 mb-8 bg-gradient-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{mockCampaign.campaignName}</h2>
            <Button>Edit Campaign</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Objective</p>
                <p className="font-semibold">{mockCampaign.objective}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Budget</p>
                <p className="font-semibold">{mockCampaign.budget}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold">{mockCampaign.duration}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Audience</p>
                <p className="font-semibold text-sm">{mockCampaign.targetAudience}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Channels</p>
            <div className="flex flex-wrap gap-2">
              {mockCampaign.channels.map((channel) => (
                <span key={channel} className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                  {channel}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Content Calendar */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">Content Calendar</h3>
          <div className="space-y-4">
            {mockCampaign.contentCalendar.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-muted rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="w-24 text-center">
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.post}</p>
                  <p className="text-sm text-muted-foreground">{item.type}</p>
                </div>
                <div className="px-3 py-1 bg-background rounded-full text-sm font-medium">
                  {item.platform}
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-8 flex gap-4">
          <Button size="lg">Launch Campaign</Button>
          <Button size="lg" variant="outline">Save as Draft</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Campaigns;
