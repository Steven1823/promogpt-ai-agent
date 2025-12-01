import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link, Mail } from "lucide-react";

interface MagicLinkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  magicLink: string;
  email: string;
}

const MagicLinkModal = ({ open, onOpenChange, magicLink, email }: MagicLinkModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Magic Link (Demo Mode)
          </DialogTitle>
          <DialogDescription>
            In production, this would be sent to <strong>{email}</strong>. For demo, click the link below to login.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-2">Demo Magic Link:</p>
            <div className="flex items-center gap-2 p-3 bg-background rounded border">
              <Link className="w-4 h-4 text-primary" />
              <code className="text-xs flex-1 overflow-x-auto">{magicLink}</code>
            </div>
          </div>
          
          <Button 
            className="w-full" 
            onClick={() => {
              window.location.href = magicLink;
            }}
          >
            Click to Login with Magic Link
          </Button>
          
          <div className="text-xs text-muted-foreground p-3 bg-blue-50 dark:bg-blue-950 rounded">
            <strong>Note for judges:</strong> In production, this link would be sent via email (SendGrid, Mailgun, etc.). For demo reliability, we show it directly.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MagicLinkModal;
