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
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUser(session.user);
      setFullName(session.user.user_metadata?.full_name || "");
      setLoading(false);

      // Check newsletter subscription status
      await checkNewsletterSubscription(session.user.email);
    };

    getUser();
  }, [navigate]);

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
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 p-4 pb-20 md:pb-4">
      <div className="container max-w-2xl mx-auto pt-4 md:pt-8">
        <Card>
          <CardHeader className="text-center px-4 md:px-6">
            <div className="flex items-center justify-center space-x-2 mb-3 md:mb-4">
              <Shield className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              <span className="text-base md:text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Your Profile
              </span>
            </div>
            
            <div className="flex justify-center mb-3 md:mb-4">
              <Avatar className="h-16 w-16 md:h-20 md:w-20">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="text-base md:text-lg">
                  {getInitials(fullName || user.email?.charAt(0) || "U")}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <CardTitle className="text-xl md:text-2xl">Welcome, {fullName || "User"}</CardTitle>
            <CardDescription className="text-sm">
              Manage your CyberSecBulletain account settings
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4 md:space-y-6 px-4 md:px-6">
            {/* Account Information */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-base md:text-lg font-semibold">Account Information</h3>
              
              <div className="grid gap-4">
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-sm font-medium">Member Since</Label>
                    <p className="text-sm text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Update Profile */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-base md:text-lg font-semibold">Update Profile</h3>
              
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Button type="submit" disabled={updating}>
                  {updating ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-3 md:space-y-4 pt-3 md:pt-4 border-t">
              <h3 className="text-base md:text-lg font-semibold">Newsletter Subscription</h3>
              
              {checkingSubscription ? (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <div className="h-4 w-4 animate-spin border-2 border-primary border-t-transparent rounded-full" />
                  <span className="text-sm">Checking subscription status...</span>
                </div>
              ) : newsletterSubscription ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg border">
                    <Bell className="h-4 w-4 text-primary" />
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-primary">Newsletter Subscribed</Label>
                      <p className="text-xs text-muted-foreground">
                        Subscribed on {new Date(newsletterSubscription.subscribed_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleUnsubscribe}
                    className="w-full"
                  >
                    <BellOff className="h-4 w-4 mr-2" />
                    Unsubscribe
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <BellOff className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Label className="text-sm font-medium">Newsletter Not Subscribed</Label>
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
            <div className="space-y-3 md:space-y-4 pt-3 md:pt-4 border-t">
              <h3 className="text-base md:text-lg font-semibold">Account Actions</h3>
              
              <div className="flex flex-col space-y-2">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/")}
                  className="justify-start"
                >
                  Back to Home
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={async () => {
                    await supabase.auth.signOut();
                    navigate("/");
                  }}
                  className="justify-start text-destructive hover:text-destructive"
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