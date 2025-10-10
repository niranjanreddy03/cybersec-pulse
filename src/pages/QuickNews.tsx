import { useState, useEffect } from "react";
import { ArticleCard, Article } from "@/components/ui/article-card";
import { Button } from "@/components/ui/button";
import { Zap, RefreshCw, Shield, Cpu, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type NewsCategory = "all" | "cybersecurity" | "technology";

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
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [category, setCategory] = useState<NewsCategory>("all");
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

  // Fetch news based on category
  const fetchLatestNews = async () => {
    try {
      setLoading(true);
      
      // Call our edge function to fetch news
      const { data, error } = await supabase.functions.invoke('fetch-news', {
        body: { 
          query: "",
          category: category,
          pageSize: 20 
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // Convert API data to our format
      const convertedArticles = data.articles?.map((article: NewsAPIResponse['articles'][0], index: number) => 
        convertToArticle(article, index)
      ) || [];

      setArticles(convertedArticles);
      setLastUpdated(new Date());
      
      toast({
        title: "News Updated",
        description: `Fetched ${convertedArticles.length} live articles from NewsAPI`,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      toast({
        title: "Error",
        description: "Failed to fetch latest news from NewsAPI. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestNews();
  }, [category]);

  const handleRefresh = () => {
    fetchLatestNews();
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
                <p className="text-muted-foreground">
                  {category === "all" && "Cybersecurity & Technology Breaking News"}
                  {category === "cybersecurity" && "Cybersecurity Breaking News"}
                  {category === "technology" && "Technology Breaking News"}
                </p>
              </div>
            </div>
            <Button onClick={handleRefresh} disabled={loading} variant="outline">
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          
          {/* Category Filter Buttons */}
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant={category === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory("all")}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              All News
            </Button>
            <Button
              variant={category === "cybersecurity" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory("cybersecurity")}
              className="flex items-center gap-2"
            >
              <Shield className="h-4 w-4" />
              Cybersecurity
            </Button>
            <Button
              variant={category === "technology" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory("technology")}
              className="flex items-center gap-2"
            >
              <Cpu className="h-4 w-4" />
              Technology
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Articles */}
        {articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
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
            <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No articles available</h3>
            <p className="text-muted-foreground mb-4">
              No cybersecurity or technology news articles available at the moment
            </p>
            <Button variant="outline" onClick={handleRefresh}>
              Refresh News Feed
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}