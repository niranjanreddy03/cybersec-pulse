import { useState, useEffect } from "react";
import { Article } from "@/components/ui/article-card";
import { Card } from "@/components/ui/card";
import { SearchBar } from "@/components/ui/search-bar";
import { TabNavigation } from "@/components/ui/tab-navigation";
import { CategoryPills } from "@/components/ui/category-pills";
import { BottomNav } from "@/components/ui/bottom-nav";
import { Shield, ArrowRight } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState("news");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");


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

  const featuredArticle = articles.find(article => article.featured) || articles[0];
  const aroundWorldArticles = articles.slice(1, 5);

  const handleReadMore = (id: string) => {
    // Navigate to articles page with specific article
    window.location.href = `/articles/${id}`;
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
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Top Section */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 space-y-4">
          {/* Search Bar */}
          <SearchBar 
            placeholder="Search" 
            onSearch={setSearchQuery}
          />

          {/* Tab Navigation */}
          <TabNavigation
            tabs={[
              { label: "News", value: "news" },
              { label: "Events", value: "events" },
              { label: "Weather", value: "weather" },
            ]}
            defaultTab="news"
            onTabChange={setActiveTab}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Category Pills */}
        <CategoryPills
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Latest News Section */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">Latest news</h2>
          
          {featuredArticle && (
            <Card 
              className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground p-6 cursor-pointer hover:shadow-elevated transition-shadow"
              onClick={() => handleReadMore(featuredArticle.id)}
            >
              <h3 className="text-xl font-bold mb-4 leading-tight">
                {featuredArticle.title}
              </h3>
              <p className="text-sm text-primary-foreground/80">
                {new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })} - {new Date(featuredArticle.publishedAt).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </Card>
          )}
        </section>

        {/* Around the World Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Around the world</h2>
            <button 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => window.location.href = '/articles'}
            >
              See All
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {aroundWorldArticles.map((article) => (
              <Card 
                key={article.id}
                className="min-w-[180px] flex-shrink-0 overflow-hidden cursor-pointer hover:shadow-elevated transition-shadow"
                onClick={() => handleReadMore(article.id)}
              >
                <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <Shield className="h-12 w-12 text-muted-foreground/30" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
                    {article.title.length > 50 ? article.title.substring(0, 50) + '...' : article.title}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* All Articles Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground">More stories</h2>
          
          {articles.slice(5).map((article) => (
            <Card 
              key={article.id}
              className="p-4 cursor-pointer hover:shadow-elevated transition-shadow"
              onClick={() => handleReadMore(article.id)}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-muted to-muted/50 rounded flex items-center justify-center">
                  <Shield className="h-8 w-8 text-muted-foreground/30" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </section>

        {/* View All Button */}
        <div className="text-center pt-4">
          <button
            onClick={() => window.location.href = '/articles'}
            className="text-primary font-semibold flex items-center gap-2 mx-auto hover:gap-3 transition-all"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}