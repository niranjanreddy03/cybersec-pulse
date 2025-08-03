import { useState, useEffect } from "react";
import { ArticleCard, Article } from "@/components/ui/article-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cpu, Search, Filter, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function TechNews() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterBy, setFilterBy] = useState("all");

  const fetchTechArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .eq('category', 'technology')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Convert database articles to Article interface format
      const convertedArticles: Article[] = (data || []).map(dbArticle => ({
        id: dbArticle.id,
        title: dbArticle.title,
        excerpt: dbArticle.excerpt || dbArticle.content.substring(0, 150) + '...',
        author: dbArticle.author_name,
        publishedAt: dbArticle.published_at || dbArticle.created_at,
        category: "tech" as const,
        tags: dbArticle.tags || [],
        priority: (dbArticle.priority as "high" | "low" | "critical" | "medium") || "medium",
        featured: dbArticle.featured,
        imageUrl: dbArticle.image_url,
        content: dbArticle.content,
        url: `/article/${dbArticle.id}`
      }));

      setArticles(convertedArticles);
      setFilteredArticles(convertedArticles);
    } catch (error) {
      console.error('Error fetching tech articles:', error);
      toast({
        title: "Error",
        description: "Failed to fetch tech articles",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechArticles();
  }, []);

  useEffect(() => {
    let filtered = articles;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Priority filter
    if (filterBy !== "all") {
      filtered = filtered.filter(article => article.priority === filterBy);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        default:
          return 0;
      }
    });

    setFilteredArticles(filtered);
  }, [articles, searchTerm, sortBy, filterBy]);

  const handleReadMore = (id: string) => {
    navigate(`/article/${id}`);
  };

  const handleAddArticle = () => {
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Cpu className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading tech news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/5 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="h-10 w-10 text-primary" />
                <div>
                  <h1 className="text-4xl font-bold">Technology News</h1>
                  <p className="text-muted-foreground">Latest innovations and industry developments</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">AI & Machine Learning</Badge>
                <Badge variant="secondary">Cloud Computing</Badge>
                <Badge variant="secondary">Quantum Technology</Badge>
                <Badge variant="secondary">IoT Security</Badge>
              </div>
            </div>
            <Button onClick={handleAddArticle} className="hidden md:flex">
              <Plus className="h-4 w-4 mr-2" />
              Manage Articles
            </Button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tech articles, tags, or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Latest First</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
                <SelectItem value="author">Author A-Z</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Articles</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mobile Add Article Button */}
        <div className="md:hidden mb-6">
          <Button onClick={handleAddArticle} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Manage Articles
          </Button>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredArticles.length} of {articles.length} tech articles
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onReadMore={handleReadMore}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Cpu className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? `No tech articles match your search for "${searchTerm}"`
                : "No tech articles available with the selected filters"
              }
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setFilterBy("all");
            }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredArticles.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={fetchTechArticles}>
              Refresh Articles
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}