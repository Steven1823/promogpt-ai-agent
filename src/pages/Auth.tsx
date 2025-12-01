import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Sparkles, Eye, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { mockAuthService } from "@/lib/mockAuth";

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartDemo = async () => {
    setIsLoading(true);
    
    const result = await mockAuthService.startDemo();
    
    if (result.success) {
      toast.success("Demo mode activated! 🚀");
      navigate("/dashboard");
    }
    
    setIsLoading(false);
  };

  const handleContinueAsGuest = async () => {
    setIsLoading(true);
    
    const result = await mockAuthService.continueAsGuest();
    
    if (result.success) {
      toast.info("Viewing in read-only guest mode");
      navigate("/dashboard");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">PromoGPT</h1>
          </div>
          <p className="text-muted-foreground text-lg mb-2">AI Marketing Intelligence Platform</p>
          <p className="text-sm text-muted-foreground">
            Zero setup. Instant access. Full demo.
          </p>
        </div>

        <Card className="p-8">
          <div className="space-y-4">
            <Button 
              className="w-full h-16 text-lg" 
              size="lg"
              onClick={handleStartDemo}
              disabled={isLoading}
            >
              <Sparkles className="w-6 h-6 mr-3" />
              {isLoading ? "Loading..." : "Start Demo"}
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-14"
              onClick={handleContinueAsGuest}
              disabled={isLoading}
            >
              <Eye className="w-5 h-5 mr-2" />
              Continue as Guest
            </Button>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
            <strong className="block mb-1">What you get:</strong>
            <ul className="space-y-1 text-xs">
              <li>✓ Full access to all 14 dashboards</li>
              <li>✓ Pre-loaded business data</li>
              <li>✓ AI content generation demo</li>
              <li>✓ Campaign planning tools</li>
              <li>✓ No signup required</li>
            </ul>
          </div>
        </Card>

        <div className="text-center mt-6">
          <Button variant="link" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg text-xs text-center">
          <strong>For Presentation:</strong> Click "Start Demo" for instant full access
        </div>
      </div>
    </div>
  );
};

export default Auth;
