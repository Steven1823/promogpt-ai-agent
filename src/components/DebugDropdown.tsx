import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bug, LogIn, Trash2, Database, Link } from "lucide-react";
import { mockAuthService } from "@/lib/mockAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DebugDropdown = () => {
  const navigate = useNavigate();
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    // Check if in demo mode
    const session = mockAuthService.getSession();
    setIsDemo(!!session?.isDemo || window.location.search.includes('demo=true'));
  }, []);

  const handleAutoLogin = async () => {
    toast.loading("Auto-logging in...");
    const result = await mockAuthService.demoLogin();
    if (result.success) {
      toast.success("Auto-logged in as demo user!");
      navigate("/dashboard?demo=true");
    }
  };

  const handleClearSession = () => {
    mockAuthService.logout();
    toast.success("Session cleared!");
    navigate("/");
  };

  const handleLoadMockData = () => {
    toast.success("Mock data loaded!");
  };

  const handleShowMagicLink = () => {
    toast.info("Use the 'Passwordless' tab on /auth page to generate magic links");
  };

  // Only show in demo mode or development
  if (!isDemo && import.meta.env.PROD) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="fixed top-4 right-4 z-50 bg-yellow-100 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-700 hover:bg-yellow-200 dark:hover:bg-yellow-800"
        >
          <Bug className="w-4 h-4 mr-2" />
          Demo Tools
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Presentation Tools</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleAutoLogin}>
          <LogIn className="w-4 h-4 mr-2" />
          Auto Login Demo
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLoadMockData}>
          <Database className="w-4 h-4 mr-2" />
          Load Mock Data
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShowMagicLink}>
          <Link className="w-4 h-4 mr-2" />
          Show Magic Link Info
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleClearSession}>
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Session
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 text-xs text-muted-foreground">
          Shortcut: <kbd className="px-1 py-0.5 bg-muted rounded">Ctrl+D</kbd>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DebugDropdown;
