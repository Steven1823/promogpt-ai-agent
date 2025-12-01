import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Zap } from "lucide-react";
import { toast } from "sonner";

const Automation = () => {
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
    {
      id: 5,
      name: "High Engagement Follow-up",
      trigger: "When post gets high engagement",
      action: "Auto-generate follow-up content",
      active: false,
    },
  ];

  const handleToggle = (id: number, active: boolean) => {
    toast.success(active ? "Workflow activated!" : "Workflow paused");
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Automation Workflows</h1>
          <p className="text-muted-foreground">Set up automated marketing actions based on business triggers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">5</p>
              <p className="text-sm text-muted-foreground">Active Workflows</p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">24</p>
              <p className="text-sm text-muted-foreground">Actions This Week</p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary mb-2">12h</p>
              <p className="text-sm text-muted-foreground">Time Saved</p>
            </div>
          </Card>
        </div>

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
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          workflow.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {workflow.active ? 'Active' : 'Paused'}
                        </span>
                      </div>
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
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`workflow-${workflow.id}`}
                      checked={workflow.active}
                      onCheckedChange={(checked) => handleToggle(workflow.id, checked)}
                    />
                    <Label htmlFor={`workflow-${workflow.id}`} className="sr-only">
                      Toggle workflow
                    </Label>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 mt-8 bg-gradient-card">
          <h3 className="text-xl font-semibold mb-4">✨ Create Custom Workflow</h3>
          <p className="text-muted-foreground mb-4">
            Set up your own automation: If [trigger] happens, then [action]
          </p>
          <Button>
            <Zap className="w-4 h-4 mr-2" />
            Build Workflow
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Automation;
