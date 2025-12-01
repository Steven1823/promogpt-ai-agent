import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Clock, TrendingDown, Users, Calendar, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AutomationFull = () => {
  const [scheduledPosts, setScheduledPosts] = useState([
    { id: 1, content: "New Baby Diapers arrival!", platform: "Instagram", time: "Tomorrow 10:00 AM", status: "scheduled" },
    { id: 2, content: "Weekend sale announcement", platform: "Facebook", time: "Saturday 9:00 AM", status: "scheduled" },
    { id: 3, content: "Customer testimonial video", platform: "TikTok", time: "Monday 2:00 PM", status: "scheduled" },
  ]);

  const workflows = [
    {
      id: 1,
      name: "Sales Drop Alert",
      trigger: "When sales drop by 15%",
      action: "Create promotional content + email campaign",
      active: true,
    },
    {
      id: 2,
      name: "New Customer Welcome",
      trigger: "When new customers increase",
      action: "Generate welcome email series",
      active: true,
    },
    {
      id: 3,
      name: "Trending Product Boost",
      trigger: "When product trending detected",
      action: "Create video ad + social posts",
      active: false,
    },
    {
      id: 4,
      name: "Slow Inventory Alert",
      trigger: "When items not selling",
      action: "Suggest discount campaign",
      active: true,
    },
  ];

  const handlePublishNow = (platform: string) => {
    toast.success(`Publishing to ${platform}...`, {
      description: "Your content will be live in a few moments"
    });
  };

  const handleToggle = (id: number, active: boolean) => {
    toast.success(active ? "Workflow activated!" : "Workflow paused");
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Automation & Scheduling</h1>
          <p className="text-muted-foreground">Automate posting and set up intelligent workflows</p>
        </div>

        <Tabs defaultValue="scheduling" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scheduling">Scheduling & Posting</TabsTrigger>
            <TabsTrigger value="workflows">Automation Workflows</TabsTrigger>
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          </TabsList>

          {/* Scheduling & Posting */}
          <TabsContent value="scheduling" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Publish</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Publish your content immediately across all connected platforms
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handlePublishNow("Instagram")}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">Instagram</span>
                    <Send className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">Connected</p>
                  <Button variant="outline" size="sm" className="w-full">Publish Now</Button>
                </Card>
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handlePublishNow("Facebook")}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">Facebook</span>
                    <Send className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">Connected</p>
                  <Button variant="outline" size="sm" className="w-full">Publish Now</Button>
                </Card>
                <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handlePublishNow("TikTok")}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">TikTok</span>
                    <Send className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">Connected</p>
                  <Button variant="outline" size="sm" className="w-full">Publish Now</Button>
                </Card>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Scheduled Posts</h3>
                <Button variant="outline" size="sm">Schedule New</Button>
              </div>
              <div className="space-y-3">
                {scheduledPosts.map(post => (
                  <div key={post.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium mb-1">{post.content}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.time}
                        </span>
                        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                          {post.platform}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Cancel</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Automation Workflows */}
          <TabsContent value="workflows" className="space-y-6">
            <div className="space-y-4">
              {workflows.map((workflow) => (
                <Card key={workflow.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Zap className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{workflow.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs mt-1 inline-block ${
                            workflow.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {workflow.active ? 'Active' : 'Paused'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="ml-13 space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="text-sm font-medium text-muted-foreground">Trigger:</span>
                          <span className="text-sm">{workflow.trigger}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-sm font-medium text-muted-foreground">Action:</span>
                          <span className="text-sm">{workflow.action}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Switch
                        checked={workflow.active}
                        onCheckedChange={(checked) => handleToggle(workflow.id, checked)}
                      />
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* AI Recommendations */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">📊 AI Posting Recommendations</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Based on your audience engagement patterns, here are the best times to post:
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Instagram</span>
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Best times: Weekdays 10 AM - 12 PM, 5 PM - 7 PM</p>
                  <p className="text-xs text-muted-foreground mt-1">Peak engagement: Tuesday & Thursday</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Facebook</span>
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Best times: Weekdays 9 AM - 11 AM, 3 PM - 5 PM</p>
                  <p className="text-xs text-muted-foreground mt-1">Peak engagement: Wednesday & Friday</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">TikTok</span>
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Best times: Weekdays 6 PM - 9 PM, Weekends 2 PM - 6 PM</p>
                  <p className="text-xs text-muted-foreground mt-1">Peak engagement: Saturday</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AutomationFull;
