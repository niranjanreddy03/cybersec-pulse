import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArticleImageService, type ArticleImageResult } from "@/lib/articleImageService";
import { Image, RefreshCw, Wand2 } from "lucide-react";

export function ArticleImageManager() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ArticleImageResult[]>([]);
  const [articlesWithoutImages, setArticlesWithoutImages] = useState<any[]>([]);
  const { toast } = useToast();

  const loadArticlesWithoutImages = async () => {
    try {
      const articles = await ArticleImageService.getArticlesWithoutImages();
      setArticlesWithoutImages(articles);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load articles without images",
        variant: "destructive",
      });
    }
  };

  const updateAllImages = async () => {
    setLoading(true);
    setResults([]);
    
    try {
      const response = await ArticleImageService.updateAllArticleImages();
      
      if (response.results) {
        setResults(response.results);
        
        const successCount = response.results.filter(r => r.success).length;
        const failureCount = response.results.filter(r => !r.success).length;
        
        toast({
          title: "Images Updated",
          description: `Successfully updated ${successCount} articles${failureCount > 0 ? `, ${failureCount} failed` : ''}`,
        });
      } else {
        toast({
          title: "Info",
          description: response.message,
        });
      }
      
      // Refresh the list
      await loadArticlesWithoutImages();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update article images",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSingleImage = async (articleId: string) => {
    setLoading(true);
    
    try {
      const response = await ArticleImageService.updateSingleArticleImage(articleId);
      
      toast({
        title: "Image Updated",
        description: response.message,
      });
      
      // Refresh the list
      await loadArticlesWithoutImages();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update article image",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Load articles on component mount
  useState(() => {
    loadArticlesWithoutImages();
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Image className="h-5 w-5" />
          <span>Article Image Manager</span>
        </CardTitle>
        <CardDescription>
          Add AI-generated or placeholder images to articles automatically
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Articles without images: <strong>{articlesWithoutImages.length}</strong>
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadArticlesWithoutImages}
              disabled={loading}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button
              onClick={updateAllImages}
              disabled={loading || articlesWithoutImages.length === 0}
            >
              <Wand2 className="h-4 w-4 mr-2" />
              {loading ? "Updating..." : "Update All Images"}
            </Button>
          </div>
        </div>

        {articlesWithoutImages.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Articles needing images:</h4>
              <div className="space-y-2">
                {articlesWithoutImages.map((article) => (
                  <div
                    key={article.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{article.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(article.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateSingleImage(article.id)}
                      disabled={loading}
                    >
                      <Wand2 className="h-3 w-3 mr-1" />
                      Add Image
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {results.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Recent Updates:</h4>
              <div className="space-y-2">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{result.title}</p>
                      {result.error && (
                        <p className="text-xs text-destructive mt-1">{result.error}</p>
                      )}
                      {result.imageUrl && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Image: {result.imageUrl}
                        </p>
                      )}
                    </div>
                    <Badge variant={result.success ? "default" : "destructive"}>
                      {result.success ? "Success" : "Failed"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• AI images require Hugging Face API token (set in Edge Function secrets)</p>
          <p>• Falls back to category-appropriate placeholder images</p>
          <p>• Images are automatically assigned based on article category and content</p>
        </div>
      </CardContent>
    </Card>
  );
}