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
import { Bug, Trash2 } from "lucide-react";
import { mockAuthService } from "@/lib/mockAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DebugDropdown = () => {
  const navigate = useNavigate();
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const session = mockAuthService.getSession();
    setIsDemo(!!session?.isDemo);
  }, []);

  const handleClearSession = () => {
    mockAuthService.logout();
    toast.success("Session cleared!");
    navigate("/");
  };

  if (!isDemo) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="fixed top-4 right-4 z-50 bg-yellow-100 dark:bg-yellow-900 border-yellow-300"
        >
          <Bug className="w-4 h-4 mr-2" />
          Demo
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Demo Tools</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleClearSession}>
          <Trash2 className="w-4 h-4 mr-2" />
          End Demo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DebugDropdown;
