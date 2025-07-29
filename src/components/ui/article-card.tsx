import { Clock, User, ArrowRight, Shield, Cpu } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  publishedAt: string;
  category: "tech" | "cyber" | "general";
  tags: string[];
  imageUrl?: string;
  priority?: "critical" | "high" | "medium" | "low";
  featured?: boolean;
}

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "compact";
  onReadMore?: (id: string) => void;
}

export function ArticleCard({ article, variant = "default", onReadMore }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "cyber":
        return <Shield className="h-4 w-4" />;
      case "tech":
        return <Cpu className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "critical":
        return "bg-cyber-critical text-white";
      case "high":
        return "bg-cyber-high text-white";
      case "medium":
        return "bg-cyber-medium text-foreground";
      case "low":
        return "bg-cyber-low text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (variant === "featured") {
    return (
      <Card className="overflow-hidden hover:shadow-elevated transition-all duration-300 border-2 border-primary/20">
        <div className="relative h-64 bg-gradient-to-br from-primary/10 to-accent/10">
          {article.imageUrl && (
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="default" className="bg-primary text-primary-foreground">
              <span className="mr-1">{getCategoryIcon(article.category)}</span>
              Featured
            </Badge>
            {article.priority && (
              <Badge className={getPriorityColor(article.priority)}>
                {article.priority.toUpperCase()}
              </Badge>
            )}
          </div>
        </div>
        <CardHeader>
          <h2 className="text-2xl font-bold line-clamp-2 hover:text-primary transition-colors">
            {article.title}
          </h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDate(article.publishedAt)}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3 mb-4">{article.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => onReadMore?.(article.id)} 
            className="w-full group"
          >
            Read Full Article
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card className="overflow-hidden hover:shadow-card transition-all duration-200 cursor-pointer">
        <CardContent className="p-4">
          <div className="flex gap-3">
            {article.imageUrl && (
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  <span className="mr-1">{getCategoryIcon(article.category)}</span>
                  {article.category}
                </Badge>
                {article.priority && (
                  <Badge className={`text-xs ${getPriorityColor(article.priority)}`}>
                    {article.priority}
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold line-clamp-2 text-sm mb-2 hover:text-primary transition-colors">
                {article.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{article.author}</span>
                <span>{formatDate(article.publishedAt)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-card transition-all duration-300 group">
      <div className="relative h-48 bg-gradient-to-br from-muted/50 to-muted">
        {article.imageUrl && (
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="outline" className="bg-background/90 backdrop-blur-sm">
            <span className="mr-1">{getCategoryIcon(article.category)}</span>
            {article.category}
          </Badge>
          {article.priority && (
            <Badge className={getPriorityColor(article.priority)}>
              {article.priority}
            </Badge>
          )}
        </div>
      </div>
      <CardHeader>
        <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {article.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDate(article.publishedAt)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{article.excerpt}</p>
        <div className="flex flex-wrap gap-1">
          {article.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onReadMore?.(article.id)}
          className="w-full group"
        >
          Read More
          <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
}