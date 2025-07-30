import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewsletterSignupProps {
  className?: string;
  title?: string;
  description?: string;
  compact?: boolean;
}

export function NewsletterSignup({ 
  className = "", 
  title = "Stay Updated",
  description = "Get the latest cybersecurity and tech news delivered to your inbox.",
  compact = false 
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      toast({
        title: "Successfully Subscribed!",
        description: `We'll send updates to ${email}`,
      });
      
      // Reset after showing success state
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }, 1000);
  };

  if (compact && isSubscribed) {
    return (
      <div className={`flex items-center gap-2 text-green-600 ${className}`}>
        <Check className="h-4 w-4" />
        <span className="text-sm">Subscribed!</span>
      </div>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading || !email} size="sm">
          {isLoading ? (
            <div className="h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <Mail className="h-4 w-4" />
          )}
        </Button>
      </form>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        {isSubscribed ? (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-green-600 mb-2">Successfully Subscribed!</h3>
            <p className="text-sm text-muted-foreground">
              Welcome to our newsletter. You'll receive updates at {email}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !email}
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full mr-2" />
                  Subscribing...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Subscribe Now
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}