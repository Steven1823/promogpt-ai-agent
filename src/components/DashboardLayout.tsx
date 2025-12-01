import { ReactNode } from "react";
import { 
  LayoutDashboard, 
  BarChart3, 
  Upload, 
  Sparkles, 
  Megaphone, 
  Send, 
  Settings,
  LogOut
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import VoiceAI from "@/components/VoiceAI";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { to: "/dashboard/data-hub", icon: Upload, label: "Data Hub" },
    { to: "/dashboard/intelligence", icon: BarChart3, label: "Intelligence" },
    { to: "/dashboard/content-campaign", icon: Sparkles, label: "Content & Campaign" },
    { to: "/dashboard/automation", icon: Send, label: "Automation" },
    { to: "/dashboard/ad-generator", icon: Megaphone, label: "Ad Generator" },
    { to: "/dashboard/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-sidebar-primary" />
            <span className="text-xl font-bold text-sidebar-foreground">PromoGPT</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/dashboard"}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* Voice AI */}
      <VoiceAI />
    </div>
  );
};

export default DashboardLayout;
