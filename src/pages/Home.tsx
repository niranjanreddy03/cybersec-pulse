import { useState, useEffect } from "react";
import { HeroSection } from "@/components/ui/hero-section";
import { ArticleCard, Article } from "@/components/ui/article-card";
import { NewsletterSignup } from "@/components/ui/newsletter-signup";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, Shield, ArrowRight } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading latest news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <Shield className="h-8 w-8 text-primary" />
                Featured Stories
              </h2>
              <Badge variant="outline" className="text-sm">
                Breaking News
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

        {/* Latest and Trending Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Latest News */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Clock className="h-6 w-6 text-primary" />
                Latest News
              </h2>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid gap-6">
              {latestArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onReadMore={handleReadMore}
                />
              ))}
            </div>
          </div>

          {/* Trending Sidebar */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-accent" />
                Trending
              </h2>
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
            
            {/* Newsletter Signup */}
            <div className="mt-8">
              <NewsletterSignup compact />
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border hover:shadow-card transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="text-xl font-semibold">Cybersecurity</h3>
                  <p className="text-sm text-muted-foreground">
                    Latest threats, vulnerabilities, and security updates
                  </p>
                </div>
              </div>
              <Badge variant="secondary">
                {articles.filter(a => a.category === "cyber").length} Articles
              </Badge>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border hover:shadow-card transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-8 w-8 text-accent" />
                <div>
                  <h3 className="text-xl font-semibold">Technology</h3>
                  <p className="text-sm text-muted-foreground">
                    Tech innovations, AI developments, and industry trends
                  </p>
                </div>
              </div>
              <Badge variant="secondary">
                {articles.filter(a => a.category === "tech").length} Articles
              </Badge>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}