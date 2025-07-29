import { useState, useEffect } from "react";
import { ArticleCard, Article } from "@/components/ui/article-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cpu, Search, Filter, Plus } from "lucide-react";

// Mock tech articles
const mockTechArticles: Article[] = [
  {
    id: "tech-1",
    title: "AI-Powered Threat Detection Systems Show 99% Accuracy Rate",
    excerpt: "New machine learning algorithms are revolutionizing cybersecurity defense mechanisms with unprecedented accuracy rates in detecting advanced persistent threats.",
    author: "Michael Chen",
    publishedAt: "2024-01-29T08:15:00Z",
    category: "tech",
    tags: ["AI", "Machine Learning", "Threat Detection", "Innovation"],
    priority: "high",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "tech-2",
    title: "Major Cloud Provider Enhances Security Infrastructure",
    excerpt: "Leading cloud service provider announces comprehensive security upgrades following recent industry trends and customer feedback.",
    author: "Emily Rodriguez",
    publishedAt: "2024-01-29T06:45:00Z",
    category: "tech",
    tags: ["Cloud Security", "Infrastructure", "Updates", "Enterprise"],
    priority: "medium",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "tech-3",
    title: "New Quantum Encryption Standard Approved",
    excerpt: "International cybersecurity consortium approves new quantum-resistant encryption protocols for enterprise use, marking a milestone in post-quantum cryptography.",
    author: "Dr. Lisa Wang",
    publishedAt: "2024-01-28T14:10:00Z",
    category: "tech",
    tags: ["Quantum", "Encryption", "Standards", "Cryptography"],
    priority: "medium",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "tech-4",
    title: "5G Network Security Protocols Updated",
    excerpt: "Telecommunications industry implements enhanced security measures for 5G infrastructure to address emerging vulnerabilities.",
    author: "Robert Kim",
    publishedAt: "2024-01-28T11:30:00Z",
    category: "tech",
    tags: ["5G", "Network Security", "Telecommunications", "Infrastructure"],
    priority: "medium",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "tech-5",
    title: "Blockchain Technology Revolutionizes Identity Management",
    excerpt: "New blockchain-based identity verification systems promise to eliminate data breaches and provide users with complete control over their digital identities.",
    author: "Amanda Foster",
    publishedAt: "2024-01-27T16:20:00Z",
    category: "tech",
    tags: ["Blockchain", "Identity Management", "Privacy", "Innovation"],
    priority: "low",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "tech-6",
    title: "IoT Security Framework Gains Industry Adoption",
    excerpt: "Major manufacturers commit to implementing standardized security framework for Internet of Things devices across all product lines.",
    author: "Jennifer Taylor",
    publishedAt: "2024-01-27T09:45:00Z",
    category: "tech",
    tags: ["IoT", "Security Framework", "Standards", "Manufacturing"],
    priority: "medium",
    imageUrl: "/placeholder.svg"
  }
];

export default function TechNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterBy, setFilterBy] = useState("all");
  const [isAdmin] = useState(false); // In real app, this would come from auth context

  useEffect(() => {
    // Simulate API call to WordPress for tech articles
    const fetchTechArticles = async () => {
      setLoading(true);
      // In real app: const articles = await fetchFromWordPress({ category: "tech" });
      setTimeout(() => {
        setArticles(mockTechArticles);
        setFilteredArticles(mockTechArticles);
        setLoading(false);
      }, 1000);
    };

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
    console.log("Navigate to tech article:", id);
  };

  const handleAddArticle = () => {
    console.log("Open add article form");
    // In real app: open WordPress-compatible article editor
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
            {isAdmin && (
              <Button onClick={handleAddArticle} className="hidden md:flex">
                <Plus className="h-4 w-4 mr-2" />
                Add Article
              </Button>
            )}
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
        {isAdmin && (
          <div className="md:hidden mb-6">
            <Button onClick={handleAddArticle} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add New Article
            </Button>
          </div>
        )}

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
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}