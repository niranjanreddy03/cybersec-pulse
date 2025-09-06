import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, User, Tag, Share2, BookOpen, Eye, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArticleCard, Article } from "@/components/ui/article-card";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SEOHead } from "@/components/ui/seo-head";

// Helper function to convert database article to Article interface
const convertDbArticle = (dbArticle: any): Article => ({
  id: dbArticle.id,
  title: dbArticle.title,
  excerpt: dbArticle.excerpt || dbArticle.content.substring(0, 200) + '...',
  content: dbArticle.content,
  author: dbArticle.author_name,
  publishedAt: dbArticle.published_at || dbArticle.created_at,
  category: dbArticle.category === 'cybersecurity' ? 'cyber' : 
           dbArticle.category === 'technology' ? 'tech' : dbArticle.category,
  tags: dbArticle.tags || [],
  priority: dbArticle.priority,
  featured: dbArticle.featured,
  imageUrl: dbArticle.image_url || "/placeholder.svg",
  readTime: `${Math.ceil(dbArticle.content.length / 1000)} min read`,
  views: Math.floor(Math.random() * 10000) + 1000 // Placeholder views
});
export default function Articles() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      
      const articles = (data || []).map(convertDbArticle);
      
      if (id) {
        const foundArticle = articles.find(a => a.id === id);
        setArticle(foundArticle || null);
        
        // Get related articles (same category, excluding current)
        const related = articles
          .filter(a => a.id !== id && a.category === foundArticle?.category)
          .slice(0, 3);
        setRelatedArticles(related);
      } else {
        // Show all articles if no ID provided
        setArticle(null);
        setRelatedArticles(articles);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: "Error",
        description: "Failed to load articles. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
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
      <>
        <SEOHead
          title="Cybersecurity Articles & Intelligence Reports"
          description="Stay ahead of cyber threats with our comprehensive collection of cybersecurity articles, threat intelligence reports, and expert analysis on the latest security trends."
          keywords={["cybersecurity", "articles", "threat intelligence", "security reports", "cyber threats", "infosec"]}
          canonicalUrl={`${window.location.origin}/articles`}
        />
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
      </>
    );
  }

  // Individual article page
  return (
    <>
      <SEOHead
        title={article.title}
        description={article.excerpt}
        keywords={[...article.tags, article.category, "cybersecurity", "security"]}
        canonicalUrl={`${window.location.origin}/articles/${article.id}`}
        ogImage={article.imageUrl !== "/placeholder.svg" ? article.imageUrl : undefined}
        articleData={{
          author: article.author,
          publishedTime: article.publishedAt,
          section: article.category,
          tags: article.tags
        }}
      />
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
    </>
  );
}