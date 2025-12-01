import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Sparkles, Mail, Chrome, Eye, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { mockAuthService } from "@/lib/mockAuth";
import MagicLinkModal from "@/components/MagicLinkModal";
import DebugDropdown from "@/components/DebugDropdown";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showMagicLinkModal, setShowMagicLinkModal] = useState(false);
  const [magicLinkData, setMagicLinkData] = useState({ link: "", email: "" });
  const [showCredentials, setShowCredentials] = useState(false);

  // Email/Password state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Magic link state
  const [magicEmail, setMagicEmail] = useState("");

  // Check for magic link token in URL
  useEffect(() => {
    const magicToken = searchParams.get('magic-token');
    const email = searchParams.get('email');
    
    if (magicToken && email) {
      handleMagicLinkVerify(magicToken, email);
    }
  }, [searchParams]);

  // Keyboard shortcut: Ctrl+D for auto demo login
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        handleDemoLogin();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");
    
    const result = await mockAuthService.login(loginEmail, loginPassword);
    
    if (result.success) {
      toast.success(`Welcome back, ${result.user?.name}!`);
      navigate("/dashboard");
    } else {
      setLoginError(result.error || "Login failed");
      toast.error(result.error || "Login failed");
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    
    const result = await mockAuthService.demoLogin();
    
    if (result.success) {
      toast.success("Welcome to PromoGPT Demo!");
      navigate("/dashboard?demo=true");
    }
    
    setIsLoading(false);
  };

  const handleMagicLinkRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await mockAuthService.requestMagicLink(magicEmail);
    
    if (result.success && result.demoLink) {
      setMagicLinkData({ link: result.demoLink, email: magicEmail });
      setShowMagicLinkModal(true);
      toast.success("Magic link generated!");
    }
    
    setIsLoading(false);
  };

  const handleMagicLinkVerify = async (token: string, email: string) => {
    setIsLoading(true);
    
    const result = await mockAuthService.verifyMagicLink(token, email);
    
    if (result.success) {
      toast.success("Logged in via magic link!");
      navigate("/dashboard");
    } else {
      toast.error(result.error || "Invalid magic link");
      navigate("/auth");
    }
    
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    const result = await mockAuthService.googleLogin();
    
    if (result.success) {
      toast.success("Signed in with Google!");
      navigate("/dashboard");
    }
    
    setIsLoading(false);
  };

  const handleGuestMode = async () => {
    setIsLoading(true);
    
    const result = await mockAuthService.guestLogin();
    
    if (result.success) {
      toast.info("Viewing in read-only demo mode");
      navigate("/dashboard?readonly=true");
    }
    
    setIsLoading(false);
  };

  const credentials = mockAuthService.getMockCredentials();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative">
      <DebugDropdown />
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">PromoGPT</h1>
          </div>
          <p className="text-muted-foreground mb-4">AI Marketing Intelligence Platform</p>
          
          {/* Demo credentials help text */}
          <div className="text-sm text-muted-foreground">
            <Button
              variant="link"
              size="sm"
              onClick={() => setShowCredentials(!showCredentials)}
              className="gap-1"
            >
              <Eye className="w-4 h-4" />
              {showCredentials ? "Hide" : "Show"} demo credentials
            </Button>
          </div>
        </div>

        {showCredentials && (
          <Card className="p-4 mb-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <p className="text-sm font-semibold mb-2">Demo Credentials (for judges):</p>
            <div className="space-y-1 text-xs font-mono">
              {credentials.map((cred) => (
                <div key={cred.email}>
                  <strong>{cred.email}</strong> / {cred.password}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Or use Quick Start options below</p>
          </Card>
        )}

        <Card className="p-6 mb-6">
          {/* Quick Start Options */}
          <div className="space-y-3 mb-6">
            <Button 
              className="w-full h-12 text-base" 
              size="lg"
              onClick={handleDemoLogin}
              disabled={isLoading}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {isLoading ? "Loading..." : "Try Demo (Quick Start)"}
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <Chrome className="w-4 h-4 mr-2" />
              Sign in with Google (Mock)
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Password</TabsTrigger>
              <TabsTrigger value="magic">Passwordless</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="demo@sunrise.test" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="DemoPass123!" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required 
                  />
                </div>
                {loginError && (
                  <p className="text-sm text-destructive">{loginError}</p>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="magic">
              <form onSubmit={handleMagicLinkRequest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="magic-email">Email</Label>
                  <Input 
                    id="magic-email" 
                    type="email" 
                    placeholder="your@email.com"
                    value={magicEmail}
                    onChange={(e) => setMagicEmail(e.target.value)}
                    required 
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  <Mail className="w-4 h-4 mr-2" />
                  {isLoading ? "Sending..." : "Send Magic Link"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  For demo: Click to see magic link instantly (no email sent)
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="text-center space-y-2">
          <Button variant="link" onClick={handleGuestMode} disabled={isLoading}>
            <Eye className="w-4 h-4 mr-2" />
            View Demo (Read-only)
          </Button>
          
          <div>
            <Button variant="link" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>

        <div className="mt-6 p-3 bg-muted rounded-lg text-xs text-muted-foreground">
          <strong>Security Note:</strong> Demo flows use mock authentication for presentation reliability. 
          Production will use secure OAuth, hashed passwords, and real transactional email.
        </div>
      </div>

      <MagicLinkModal
        open={showMagicLinkModal}
        onOpenChange={setShowMagicLinkModal}
        magicLink={window.location.origin + magicLinkData.link}
        email={magicLinkData.email}
      />
    </div>
  );
};

export default Auth;
