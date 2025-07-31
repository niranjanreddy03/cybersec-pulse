import { useState, useEffect } from "react";
import { ArticleCard, Article } from "@/components/ui/article-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Search, RefreshCw, Globe, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock API response structure
interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: {
    source: { id: string; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }[];
}

export default function QuickNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const { toast } = useToast();

  // Convert NewsAPI format to our Article format
  const convertToArticle = (apiArticle: NewsAPIResponse['articles'][0], index: number): Article => ({
    id: `api-${index}-${Date.now()}`,
    title: apiArticle.title,
    excerpt: apiArticle.description || "No description available",
    author: apiArticle.author || apiArticle.source.name,
    publishedAt: apiArticle.publishedAt,
    category: "tech",
    tags: ["Breaking", "API News"],
    priority: "medium",
    imageUrl: apiArticle.urlToImage || "/placeholder.svg",
    url: apiArticle.url,
    content: apiArticle.content
  });

  // Mock news API call (replace with real API when ready)
  const fetchLatestNews = async (query: string = "cybersecurity OR technology") => {
    try {
      setLoading(true);
      
      // Simulate API call with mock data
      const mockApiResponse: NewsAPIResponse = {
        status: "ok",
        totalResults: 100,
        articles: [
          {
            source: { id: "techcrunch", name: "TechCrunch" },
            author: "Sarah Johnson",
            title: "New AI-Powered Cybersecurity Platform Detects Threats in Real-Time",
            description: "Revolutionary AI system demonstrates 99.7% accuracy in detecting sophisticated cyber threats across enterprise networks.",
            url: "https://example.com/ai-cybersecurity",
            urlToImage: "/placeholder.svg",
            publishedAt: new Date().toISOString(),
            content: "A breakthrough AI-powered cybersecurity platform has been unveiled..."
          },
          {
            source: { id: "wired", name: "Wired" },
            author: "Michael Chen",
            title: "Critical Vulnerability Found in Popular Cloud Infrastructure",
            description: "Security researchers discover zero-day exploit affecting millions of cloud deployments worldwide.",
            url: "https://example.com/cloud-vulnerability",
            urlToImage: "/placeholder.svg",
            publishedAt: new Date(Date.now() - 3600000).toISOString(),
            content: "A critical security vulnerability has been discovered..."
          },
          {
            source: { id: "reuters", name: "Reuters" },
            author: "Emily Rodriguez",
            title: "Global Ransomware Attacks Surge 40% in Q4 2024",
            description: "Latest cybersecurity report reveals alarming increase in ransomware incidents targeting healthcare and finance sectors.",
            url: "https://example.com/ransomware-surge",
            urlToImage: "/placeholder.svg",
            publishedAt: new Date(Date.now() - 7200000).toISOString(),
            content: "Ransomware attacks have surged dramatically..."
          },
          {
            source: { id: "ars-technica", name: "Ars Technica" },
            author: "David Kim",
            title: "Quantum Computing Breakthrough Threatens Current Encryption",
            description: "Scientists achieve quantum computing milestone that could render current encryption methods obsolete within a decade.",
            url: "https://example.com/quantum-encryption",
            urlToImage: "/placeholder.svg",
            publishedAt: new Date(Date.now() - 10800000).toISOString(),
            content: "A major breakthrough in quantum computing..."
          }
        ]
      };

      // Convert mock data to our format
      const convertedArticles = mockApiResponse.articles.map((article, index) => 
        convertToArticle(article, index)
      );

      setArticles(convertedArticles);
      setLastUpdated(new Date());
      
      toast({
        title: "News Updated",
        description: `Fetched ${convertedArticles.length} latest articles`,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      toast({
        title: "Error",
        description: "Failed to fetch latest news. Using cached articles.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestNews();
    
    // Set up real-time updates every 30 seconds for breaking news
    const interval = setInterval(() => {
      fetchLatestNews(searchTerm || "cybersecurity OR technology");
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Real-time update when search term changes
  useEffect(() => {
    if (searchTerm) {
      const debounceTimer = setTimeout(() => {
        fetchLatestNews(searchTerm);
      }, 1000);
      
      return () => clearTimeout(debounceTimer);
    }
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchLatestNews(searchTerm);
    }
  };

  const handleRefresh = () => {
    fetchLatestNews(searchTerm || "cybersecurity OR technology");
  };

  const handleReadMore = (id: string) => {
    const article = articles.find(a => a.id === id);
    if (article?.url) {
      window.open(article.url, '_blank');
    } else {
      toast({
        title: "Article",
        description: "Opening full article...",
      });
    }
  };

  const filteredArticles = searchTerm 
    ? articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : articles;

  if (loading && articles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Zap className="h-8 w-8 animate-bounce text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Fetching latest news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/5 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Zap className="h-10 w-10 text-primary" />
              <div>
                <h1 className="text-4xl font-bold">Quick News</h1>
                <p className="text-muted-foreground">Real-time cybersecurity and tech updates</p>
              </div>
            </div>
            <Button onClick={handleRefresh} disabled={loading} variant="outline">
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Globe className="h-3 w-3 mr-1" />
              Live Feed
            </Badge>
            <Badge variant="outline">Breaking News</Badge>
            <Badge variant="outline">Real-time Updates</Badge>
          </div>

          <div className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Stats */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search breaking news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Search"}
              </Button>
            </form>
          </div>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{articles.length}</div>
              <div className="text-sm text-muted-foreground">Live Articles</div>
            </CardContent>
          </Card>
        </div>

        {/* API Status */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5 text-primary" />
              News API Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Connected to news sources</span>
              </div>
              <Badge variant="secondary">Mock API Active</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Integration ready for live news APIs like NewsAPI, Guardian, or custom feeds
            </p>
          </CardContent>
        </Card>

        {/* Articles */}
        {filteredArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onReadMore={handleReadMore}
                variant="default"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? `No news articles match your search for "${searchTerm}"`
                : "No news articles available at the moment"
              }
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              handleRefresh();
            }}>
              Refresh News Feed
            </Button>
          </div>
        )}

        {/* Auto-refresh notice */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
            <RefreshCw className="h-4 w-4" />
            Breaking news updates every 30 seconds
          </div>
        </div>
      </div>
    </div>
  );
}