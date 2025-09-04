import { useState, useEffect } from "react";
import { HeroSection } from "@/components/ui/hero-section";
import { ArticleCard, Article } from "@/components/ui/article-card";
import { NewsletterSignup } from "@/components/ui/newsletter-signup";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, Shield, ArrowRight, Zap, Eye, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Mock data - in real app, this would come from WordPress API
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Critical Zero-Day Vulnerability Discovered in Popular Email Client",
    excerpt: "Security researchers have identified a severe zero-day vulnerability affecting millions of users worldwide. Immediate patching is recommended.",
    author: "Sarah Johnson",
    publishedAt: "2024-01-29T10:30:00Z",
    category: "cyber",
    tags: ["Zero-Day", "Email Security", "Vulnerability"],
    priority: "critical",
    featured: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    title: "AI-Powered Threat Detection Systems Show 99% Accuracy Rate",
    excerpt: "New machine learning algorithms are revolutionizing cybersecurity defense mechanisms with unprecedented accuracy rates.",
    author: "Michael Chen",
    publishedAt: "2024-01-29T08:15:00Z",
    category: "tech",
    tags: ["AI", "Machine Learning", "Threat Detection"],
    priority: "high",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Major Cloud Provider Enhances Security Infrastructure",
    excerpt: "Leading cloud service provider announces comprehensive security upgrades following recent industry trends.",
    author: "Emily Rodriguez",
    publishedAt: "2024-01-29T06:45:00Z",
    category: "tech",
    tags: ["Cloud Security", "Infrastructure", "Updates"],
    priority: "medium",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "4",
    title: "Ransomware Attack Targets Healthcare Sector",
    excerpt: "Multiple healthcare facilities report coordinated ransomware attacks affecting patient data systems.",
    author: "David Thompson",
    publishedAt: "2024-01-28T16:20:00Z",
    category: "cyber",
    tags: ["Ransomware", "Healthcare", "Data Breach"],
    priority: "critical",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "5",
    title: "New Quantum Encryption Standard Approved",
    excerpt: "International cybersecurity consortium approves new quantum-resistant encryption protocols for enterprise use.",
    author: "Dr. Lisa Wang",
    publishedAt: "2024-01-28T14:10:00Z",
    category: "tech",
    tags: ["Quantum", "Encryption", "Standards"],
    priority: "medium",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "6",
    title: "Social Engineering Attacks Increase by 300%",
    excerpt: "Latest security report shows dramatic rise in social engineering tactics targeting remote workers.",
    author: "Alex Parker",
    publishedAt: "2024-01-28T12:30:00Z",
    category: "cyber",
    tags: ["Social Engineering", "Remote Work", "Statistics"],
    priority: "high",
    imageUrl: "/placeholder.svg"
  }
];

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>("");

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        // Check subscription status
        const hasSubscribed = localStorage.getItem('newsletter_subscribed') === 'true';
        const isPaidPlan = localStorage.getItem('subscription_plan') === 'pro';
        
        if (isPaidPlan) {
          setSubscriptionStatus("Pro Plan");
        } else if (hasSubscribed) {
          setSubscriptionStatus("Free Plan");
        } else {
          setSubscriptionStatus("Subscribed");
        }
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const hasSubscribed = localStorage.getItem('newsletter_subscribed') === 'true';
        const isPaidPlan = localStorage.getItem('subscription_plan') === 'pro';
        
        if (isPaidPlan) {
          setSubscriptionStatus("Pro Plan");
        } else if (hasSubscribed) {
          setSubscriptionStatus("Free Plan");
        } else {
          setSubscriptionStatus("Subscribed");
        }
      } else {
        setSubscriptionStatus("");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Simulate API call to WordPress
    const fetchArticles = async () => {
      setLoading(true);
      // In real app: const articles = await fetchFromWordPress();
      setTimeout(() => {
        setArticles(mockArticles);
        setLoading(false);
      }, 1000);
    };

    fetchArticles();
  }, []);

  const featuredArticles = articles.filter(article => article.featured);
  const latestArticles = articles.filter(article => !article.featured).slice(0, 4);
  const trendingArticles = articles.filter(article => article.priority === "high" || article.priority === "critical").slice(0, 4);

  const handleReadMore = (id: string) => {
    // Navigate to article detail page
    window.location.href = `/article/${id}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Shield className="h-12 w-12 animate-pulse text-primary mx-auto mb-6" />
          <div className="space-y-2">
            <p className="text-xl font-semibold text-foreground">Securing Your Feed</p>
            <p className="text-muted-foreground">Loading the latest cybersecurity intelligence...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Bar */}
      <div className="border-y bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Threat Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">500+</div>
              <div className="text-sm text-muted-foreground">Daily Updates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyber-info">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">Real-time</div>
              <div className="text-sm text-muted-foreground">Alerts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Featured Articles Section */}
        {featuredArticles.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-4xl font-bold flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                  Critical Intelligence
                </h2>
                <p className="text-muted-foreground text-lg">
                  Breaking cybersecurity alerts and featured investigations
                </p>
              </div>
              <Badge variant="destructive" className="text-sm px-3 py-1 animate-pulse">
                LIVE UPDATES
              </Badge>
            </div>
            <div className="grid gap-8">
              {featuredArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  variant="featured"
                  onReadMore={handleReadMore}
                />
              ))}
            </div>
          </section>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          {/* Latest News - Main Column */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3 mb-2">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Clock className="h-7 w-7 text-accent" />
                  </div>
                  Latest Intel
                </h2>
                <p className="text-muted-foreground">
                  Fresh cybersecurity news and analysis
                </p>
              </div>
              <Button variant="outline" className="group">
                View All Reports
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="grid gap-8">
              {latestArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onReadMore={handleReadMore}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Trending Section */}
            <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Critical Alerts</h2>
                  <p className="text-sm text-muted-foreground">High-priority threats</p>
                </div>
              </div>
              <div className="space-y-4">
                {trendingArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    variant="compact"
                    onReadMore={handleReadMore}
                  />
                ))}
              </div>
            </Card>

            {/* Newsletter/Subscription Status */}
            <Card className="p-6">
              {user && subscriptionStatus ? (
                <div className="text-center">
                  <div className="p-3 bg-primary/10 rounded-lg mb-4 inline-block">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <Badge className="bg-primary text-primary-foreground mb-3 text-sm px-3 py-1">
                    {subscriptionStatus}
                  </Badge>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your security intelligence is active
                  </p>
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 text-xs text-accent">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      Real-time monitoring active
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-4">
                    <div className="p-3 bg-accent/10 rounded-lg mb-3 inline-block">
                      <Zap className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Stay Protected</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get instant alerts on critical security threats
                    </p>
                  </div>
                  <NewsletterSignup compact />
                </div>
              )}
            </Card>

            {/* Security Insights */}
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Threat Landscape</h3>
                  <p className="text-sm text-muted-foreground">Current security metrics</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Threats</span>
                  <span className="text-sm font-semibold text-destructive">127</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Vulnerabilities</span>
                  <span className="text-sm font-semibold text-warning">43</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Patched Today</span>
                  <span className="text-sm font-semibold text-accent">8</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Categories Section - Redesigned */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Intelligence Categories</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore specialized security intelligence across different domains
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card 
              className="group p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer hover:shadow-elevated"
              onClick={() => window.location.href = '/cyber-news'}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-10 w-10 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Cybersecurity</h3>
                  <p className="text-muted-foreground mb-4">
                    Advanced threat intelligence, vulnerability analysis, and security breach reports
                  </p>
                  <Badge variant="secondary" className="mb-4">
                    {articles.filter(a => a.category === "cyber").length} Active Reports
                  </Badge>
                  <div className="flex items-center text-sm text-primary">
                    <span>Explore Intelligence</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Card>
            
            <Card 
              className="group p-8 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border-accent/20 hover:border-accent/40 transition-all duration-300 cursor-pointer hover:shadow-elevated"
              onClick={() => window.location.href = '/tech-news'}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <TrendingUp className="h-10 w-10 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Technology</h3>
                  <p className="text-muted-foreground mb-4">
                    Emerging technologies, AI security developments, and industry innovations
                  </p>
                  <Badge variant="secondary" className="mb-4">
                    {articles.filter(a => a.category === "tech").length} Latest Updates
                  </Badge>
                  <div className="flex items-center text-sm text-accent">
                    <span>View Developments</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}