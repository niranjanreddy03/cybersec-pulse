import { useState, useEffect } from "react";
import { ArticleCard, Article } from "@/components/ui/article-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Search, Filter, Plus, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Mock cyber articles
const mockCyberArticles: Article[] = [
  {
    id: "cyber-1",
    title: "Critical Zero-Day Vulnerability Discovered in Popular Email Client",
    excerpt: "Security researchers have identified a severe zero-day vulnerability affecting millions of users worldwide. Immediate patching is recommended for all enterprise environments.",
    author: "Sarah Johnson",
    publishedAt: "2024-01-29T10:30:00Z",
    category: "cyber",
    tags: ["Zero-Day", "Email Security", "Vulnerability", "CVE-2024-001"],
    priority: "critical",
    featured: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "cyber-2",
    title: "Ransomware Attack Targets Healthcare Sector",
    excerpt: "Multiple healthcare facilities report coordinated ransomware attacks affecting patient data systems across three major metropolitan areas.",
    author: "David Thompson",
    publishedAt: "2024-01-28T16:20:00Z",
    category: "cyber",
    tags: ["Ransomware", "Healthcare", "Data Breach", "Patient Data"],
    priority: "critical",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "cyber-3",
    title: "Social Engineering Attacks Increase by 300%",
    excerpt: "Latest security report shows dramatic rise in social engineering tactics targeting remote workers, with phishing attempts reaching record levels.",
    author: "Alex Parker",
    publishedAt: "2024-01-28T12:30:00Z",
    category: "cyber",
    tags: ["Social Engineering", "Remote Work", "Phishing", "Statistics"],
    priority: "high",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "cyber-4",
    title: "State-Sponsored APT Group Targets Financial Institutions",
    excerpt: "Advanced persistent threat group linked to nation-state actors has been observed targeting major financial institutions using novel malware variants.",
    author: "Dr. Rachel Green",
    publishedAt: "2024-01-27T14:45:00Z",
    category: "cyber",
    tags: ["APT", "Financial", "Malware", "Nation-State"],
    priority: "high",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "cyber-5",
    title: "New MITRE ATT&CK Framework Update Released",
    excerpt: "MITRE releases significant update to ATT&CK framework, including new techniques observed in recent threat campaigns and updated detection strategies.",
    author: "James Wilson",
    publishedAt: "2024-01-27T09:15:00Z",
    category: "cyber",
    tags: ["MITRE", "ATT&CK", "Framework", "Threat Intelligence"],
    priority: "medium",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "cyber-6",
    title: "Critical Infrastructure Cybersecurity Guidelines Updated",
    excerpt: "Government agencies release updated cybersecurity guidelines for critical infrastructure operators following recent threat landscape analysis.",
    author: "Maria Santos",
    publishedAt: "2024-01-26T11:00:00Z",
    category: "cyber",
    tags: ["Critical Infrastructure", "Guidelines", "Government", "Compliance"],
    priority: "medium",
    imageUrl: "/placeholder.svg"
  }
];

export default function CyberNews() {
  const { toast } = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterBy, setFilterBy] = useState("all");
  const [isAdmin] = useState(false); // In real app, this would come from auth context

  // Convert NewsAPI response to Article format
  const convertToArticle = (newsItem: any): Article => ({
    id: newsItem.url || `article-${Date.now()}-${Math.random()}`,
    title: newsItem.title || "Untitled",
    excerpt: newsItem.description || "No description available",
    author: newsItem.author || newsItem.source?.name || "Unknown",
    publishedAt: newsItem.publishedAt || new Date().toISOString(),
    category: "cyber" as const,
    tags: ["Cybersecurity", "Security", "Threat"],
    priority: "medium" as const,
    featured: false,
    imageUrl: newsItem.urlToImage || "/placeholder.svg",
    content: newsItem.content || newsItem.description || "",
    url: newsItem.url
  });

  const fetchCyberArticles = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('fetch-news', {
        body: {
          query: "",
          category: "cybersecurity",
          pageSize: 20
        }
      });

      if (error) throw error;

      const newsData = data;
      if (newsData?.articles) {
        const convertedArticles = newsData.articles.map(convertToArticle);
        setArticles(convertedArticles);
        setFilteredArticles(convertedArticles);
      } else {
        // Fallback to mock data if API fails
        setArticles(mockCyberArticles);
        setFilteredArticles(mockCyberArticles);
      }
    } catch (error) {
      console.error('Error fetching cybersecurity news:', error);
      toast({
        title: "Error",
        description: "Failed to fetch latest cybersecurity news. Showing cached articles.",
        variant: "destructive"
      });
      // Fallback to mock data
      setArticles(mockCyberArticles);
      setFilteredArticles(mockCyberArticles);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCyberArticles();
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
        case "priority":
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - 
                 (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
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
    // For NewsAPI articles, navigate to external URL
    if (id.startsWith('http')) {
      window.open(id, '_blank');
    } else {
      window.location.href = `/article/${id}`;
    }
  };

  const handleAddArticle = () => {
    console.log("Open add article form");
    // In real app: open WordPress-compatible article editor
  };

  const criticalAlerts = articles.filter(article => article.priority === "critical");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading cybersecurity news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyber-critical/10 via-primary/10 to-accent/5 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-10 w-10 text-primary" />
                <div>
                  <h1 className="text-4xl font-bold">Cybersecurity News</h1>
                  <p className="text-muted-foreground">Critical threats, vulnerabilities, and security updates</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Threat Intelligence</Badge>
                <Badge variant="secondary">Vulnerabilities</Badge>
                <Badge variant="secondary">Incident Response</Badge>
                <Badge variant="secondary">Security Research</Badge>
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

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <div className="container mx-auto px-4 py-6">
          <Alert className="border-cyber-critical bg-cyber-critical/5">
            <AlertTriangle className="h-4 w-4 text-cyber-critical" />
            <AlertDescription className="font-medium">
              <span className="text-cyber-critical">Critical Security Alerts:</span> {criticalAlerts.length} active critical threats require immediate attention.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search threats, CVEs, attack vectors..."
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
                <SelectItem value="priority">Priority Level</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
                <SelectItem value="author">Author A-Z</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Threat Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Threats</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mobile Add Article Button */}
        {isAdmin && (
          <div className="md:hidden mb-6">
            <Button onClick={handleAddArticle} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Security Alert
            </Button>
          </div>
        )}

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredArticles.length} of {articles.length} security reports
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
            <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No security reports found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm 
                ? `No cybersecurity articles match your search for "${searchTerm}"`
                : "No cybersecurity articles available with the selected filters"
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

        {/* Threat Intelligence Summary */}
        {filteredArticles.length > 0 && (
          <div className="mt-12 grid md:grid-cols-4 gap-4">
            <div className="bg-cyber-critical/10 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-cyber-critical">
                {articles.filter(a => a.priority === "critical").length}
              </div>
              <div className="text-sm text-muted-foreground">Critical Threats</div>
            </div>
            <div className="bg-cyber-high/10 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-cyber-high">
                {articles.filter(a => a.priority === "high").length}
              </div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </div>
            <div className="bg-cyber-medium/10 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-cyber-medium">
                {articles.filter(a => a.priority === "medium").length}
              </div>
              <div className="text-sm text-muted-foreground">Medium Priority</div>
            </div>
            <div className="bg-cyber-low/10 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-cyber-low">
                {articles.filter(a => a.priority === "low").length}
              </div>
              <div className="text-sm text-muted-foreground">Low Priority</div>
            </div>
          </div>
        )}

        {/* Load More */}
        {filteredArticles.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Security Reports
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}