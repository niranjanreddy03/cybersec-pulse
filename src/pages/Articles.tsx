import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, User, Tag, Share2, BookOpen, Eye, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArticleCard, Article } from "@/components/ui/article-card";
import { Separator } from "@/components/ui/separator";

// Mock articles data - in real app, this would come from WordPress API
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Critical Zero-Day Vulnerability Discovered in Popular Email Client",
    excerpt: "Security researchers have identified a severe zero-day vulnerability affecting millions of users worldwide. Immediate patching is recommended.",
    content: `
      <h2>Executive Summary</h2>
      <p>Security researchers at CyberSec Labs have discovered a critical zero-day vulnerability (CVE-2024-0001) in the widely-used email client that affects over 50 million users globally. The vulnerability allows remote code execution through specially crafted email attachments.</p>
      
      <h2>Technical Analysis</h2>
      <p>The vulnerability stems from improper input validation in the attachment parsing mechanism. When a malicious attachment is processed, it can trigger a buffer overflow condition that allows attackers to execute arbitrary code with the privileges of the email client.</p>
      
      <h2>Impact Assessment</h2>
      <ul>
        <li><strong>Severity:</strong> Critical (CVSS 9.8)</li>
        <li><strong>Attack Vector:</strong> Network</li>
        <li><strong>Affected Versions:</strong> 3.0.0 - 3.2.1</li>
        <li><strong>Exploitation:</strong> Active exploitation detected in the wild</li>
      </ul>
      
      <h2>Mitigation Strategies</h2>
      <p>Users are strongly advised to:</p>
      <ol>
        <li>Update to version 3.2.2 immediately</li>
        <li>Disable automatic attachment processing</li>
        <li>Implement email filtering for suspicious attachments</li>
        <li>Monitor network traffic for anomalous activity</li>
      </ol>
      
      <h2>Timeline</h2>
      <ul>
        <li><strong>Discovery:</strong> January 25, 2024</li>
        <li><strong>Vendor Notification:</strong> January 26, 2024</li>
        <li><strong>Patch Release:</strong> January 29, 2024</li>
        <li><strong>Public Disclosure:</strong> January 29, 2024</li>
      </ul>
    `,
    author: "Sarah Johnson",
    publishedAt: "2024-01-29T10:30:00Z",
    category: "cyber",
    tags: ["Zero-Day", "Email Security", "Vulnerability"],
    priority: "critical",
    featured: true,
    imageUrl: "/placeholder.svg",
    readTime: "8 min read",
    views: 15420
  },
  {
    id: "2",
    title: "AI-Powered Threat Detection Systems Show 99% Accuracy Rate",
    excerpt: "New machine learning algorithms are revolutionizing cybersecurity defense mechanisms with unprecedented accuracy rates.",
    content: `
      <h2>Breakthrough in AI Security</h2>
      <p>Recent advances in machine learning have led to the development of AI-powered threat detection systems that achieve an unprecedented 99% accuracy rate in identifying cyber threats.</p>
      
      <h2>Technology Overview</h2>
      <p>The new systems utilize deep learning neural networks trained on massive datasets of threat patterns, enabling them to identify both known and unknown attack vectors with remarkable precision.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Real-time threat analysis</li>
        <li>Behavioral anomaly detection</li>
        <li>Automated response capabilities</li>
        <li>Continuous learning algorithms</li>
      </ul>
      
      <h2>Industry Impact</h2>
      <p>These systems represent a significant leap forward in cybersecurity automation, potentially reducing response times from hours to seconds while minimizing false positives.</p>
    `,
    author: "Michael Chen",
    publishedAt: "2024-01-29T08:15:00Z",
    category: "tech",
    tags: ["AI", "Machine Learning", "Threat Detection"],
    priority: "high",
    imageUrl: "/placeholder.svg",
    readTime: "6 min read",
    views: 8732
  }
];

export default function Articles() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Simulate API call to fetch specific article
      const foundArticle = mockArticles.find(a => a.id === id);
      setArticle(foundArticle || null);
      
      // Get related articles (same category, excluding current)
      const related = mockArticles
        .filter(a => a.id !== id && a.category === foundArticle?.category)
        .slice(0, 3);
      setRelatedArticles(related);
    } else {
      // Show all articles if no ID provided
      setArticle(null);
      setRelatedArticles(mockArticles);
    }
    setLoading(false);
  }, [id]);

  const handleReadMore = (articleId: string) => {
    navigate(`/articles/${articleId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <BookOpen className="h-12 w-12 animate-pulse text-primary mx-auto mb-6" />
          <div className="space-y-2">
            <p className="text-xl font-semibold text-foreground">Loading Article</p>
            <p className="text-muted-foreground">Fetching security intelligence...</p>
          </div>
        </div>
      </div>
    );
  }

  // Article listing page
  if (!id || !article) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Security Intelligence Articles</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              In-depth analysis, breaking news, and expert insights on cybersecurity and technology trends
            </p>
          </div>
          
          <div className="grid gap-8">
            {relatedArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onReadMore={handleReadMore}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Individual article page
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Button>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge 
                variant={article.priority === 'critical' ? 'destructive' : 
                        article.priority === 'high' ? 'default' : 'secondary'}
                className="capitalize"
              >
                {article.priority} Priority
              </Badge>
              <Badge variant="outline">{article.category}</Badge>
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{article.views?.toLocaleString()} views</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <Button size="sm" className="group">
                <Share2 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                Share Article
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Discuss
              </Button>
            </div>
          </header>

          {/* Article Image */}
          {article.imageUrl && (
            <div className="mb-8">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg border"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div 
              dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }}
              className="text-foreground [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:mb-4 [&>ul]:mb-4 [&>ol]:mb-4 [&>li]:mb-2"
            />
          </div>

          <Separator className="my-12" />

          {/* Author Info */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <CardTitle>{article.author}</CardTitle>
                  <p className="text-muted-foreground">Security Research Analyst</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Specialized in threat intelligence and vulnerability analysis with over 8 years of experience 
                in cybersecurity research and incident response.
              </p>
            </CardContent>
          </Card>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <ArticleCard
                    key={relatedArticle.id}
                    article={relatedArticle}
                    variant="compact"
                    onReadMore={handleReadMore}
                  />
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </div>
  );
}