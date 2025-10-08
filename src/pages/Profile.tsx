import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NewsletterSignup } from "@/components/ui/newsletter-signup";
import { Badge } from "@/components/ui/badge";
import { Shield, Mail, User as UserIcon, Calendar, Bell, BellOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newsletterSubscription, setNewsletterSubscription] = useState<any>(null);
  const [checkingSubscription, setCheckingSubscription] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setUser(session.user);
        setFullName(session.user.user_metadata?.full_name || "");
        // Check newsletter subscription status
        await checkNewsletterSubscription(session.user.email);
      }
      
      setLoading(false);
    };

    getUser();
  }, []);

  const checkNewsletterSubscription = async (email?: string) => {
    if (!email) return;
    
    setCheckingSubscription(true);
    try {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .eq('email', email)
        .eq('active', true)
        .maybeSingle();

      if (!error && data) {
        setNewsletterSubscription(data);
      }
    } catch (error) {
      console.error('Error checking newsletter subscription:', error);
    } finally {
      setCheckingSubscription(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!newsletterSubscription || !user?.email) return;

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .update({ active: false })
        .eq('email', user.email);

      if (error) throw error;

      setNewsletterSubscription(null);
      toast({
        title: "Unsubscribed",
        description: "You've been unsubscribed from our newsletter.",
      });
    } catch (error) {
      console.error('Error unsubscribing:', error);
      toast({
        title: "Error",
        description: "Failed to unsubscribe. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setUpdating(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      });

      if (error) {
        toast({
          title: "Update failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-8 w-8 text-primary mx-auto mb-4 animate-pulse" />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 px-3 py-4 pb-24 md:p-8 md:pb-8">
        <div className="container max-w-md mx-auto">
          <Card className="border-0 md:border shadow-none md:shadow-sm">
            <CardHeader className="text-center px-4 py-6 md:px-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Profile
                </span>
              </div>
              
              <CardTitle className="text-xl md:text-2xl mb-2">Welcome to CyberSecBulletain</CardTitle>
              <CardDescription className="text-sm md:text-base">
                Sign in or create an account to access your profile
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4 px-4 md:px-6 pb-6">
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Create an account to personalize your news feed, manage subscriptions, and get the latest cybersecurity updates.
                </p>
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => navigate("/auth")}
                    className="w-full h-12 text-base"
                  >
                    Sign In
                  </Button>
                  
                  <Button 
                    onClick={() => navigate("/auth")}
                    variant="outline"
                    className="w-full h-12 text-base"
                  >
                    Create Account
                  </Button>
                </div>

                <div className="pt-4">
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate("/")}
                    className="text-sm"
                  >
                    Continue as Guest
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 px-3 py-4 pb-24 md:p-8 md:pb-8">
      <div className="container max-w-2xl mx-auto">
        <Card className="border-0 md:border shadow-none md:shadow-sm">
          <CardHeader className="text-center px-4 py-6 md:px-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Your Profile
              </span>
            </div>
            
            <div className="flex justify-center mb-4">
              <Avatar className="h-20 w-20 md:h-24 md:w-24">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="text-xl">
                  {getInitials(fullName || user.email?.charAt(0) || "U")}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <CardTitle className="text-xl md:text-2xl mb-2">Welcome, {fullName || "User"}</CardTitle>
            <CardDescription className="text-sm md:text-base">
              Manage your CyberSecBulletain account settings
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 px-4 md:px-6 pb-6">
            {/* Account Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Account Information</h3>
              
              <div className="grid gap-3">
                <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                  <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <Label className="text-sm font-medium block">Email</Label>
                    <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                  <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <Label className="text-sm font-medium block">Member Since</Label>
                    <p className="text-sm text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Update Profile */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Update Profile</h3>
              
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-base">Full Name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 h-12 text-base"
                    />
                  </div>
                </div>
                
                <Button type="submit" disabled={updating} className="w-full h-12 text-base">
                  {updating ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-lg font-semibold">Newsletter Subscription</h3>
              
              {checkingSubscription ? (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <div className="h-4 w-4 animate-spin border-2 border-primary border-t-transparent rounded-full" />
                  <span className="text-sm">Checking subscription status...</span>
                </div>
              ) : newsletterSubscription ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 bg-primary/10 rounded-lg border">
                    <Bell className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <Label className="text-sm font-medium text-primary block">Newsletter Subscribed</Label>
                      <p className="text-xs text-muted-foreground">
                        Subscribed on {new Date(newsletterSubscription.subscribed_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="secondary" className="flex-shrink-0">Active</Badge>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleUnsubscribe}
                    className="w-full h-11"
                  >
                    <BellOff className="h-4 w-4 mr-2" />
                    Unsubscribe
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                    <BellOff className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <Label className="text-sm font-medium block">Newsletter Not Subscribed</Label>
                      <p className="text-xs text-muted-foreground">
                        Stay updated with the latest cybersecurity news
                      </p>
                    </div>
                  </div>
                  <NewsletterSignup 
                    compact
                    title="Subscribe to Newsletter"
                    description="Get the latest updates delivered to your inbox"
                  />
                </div>
              )}
            </div>

            {/* Account Actions */}
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-lg font-semibold">Account Actions</h3>
              
              <div className="flex flex-col space-y-3">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/")}
                  className="justify-start h-11 text-base"
                >
                  Back to Home
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={async () => {
                    await supabase.auth.signOut();
                    navigate("/");
                  }}
                  className="justify-start h-11 text-base text-destructive hover:text-destructive"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}