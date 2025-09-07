import React from 'react';
import { Input } from './input';
import { Textarea } from './textarea';
import { Label } from './label';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Search } from 'lucide-react';

interface SEOFieldsProps {
  title: string;
  metaDescription: string;
  slug: string;
  keywords: string;
  onTitleChange: (value: string) => void;
  onMetaDescriptionChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  onKeywordsChange: (value: string) => void;
}

export function SEOFields({
  title,
  metaDescription,
  slug,
  keywords,
  onTitleChange,
  onMetaDescriptionChange,
  onSlugChange,
  onKeywordsChange
}: SEOFieldsProps) {
  // Generate slug from title automatically
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (value: string) => {
    onTitleChange(value);
    if (!slug) {
      onSlugChange(generateSlug(value));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          SEO Optimization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="seo-title">SEO Title</Label>
          <Input
            id="seo-title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Optimized title for search engines"
            maxLength={60}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Recommended: 50-60 characters</span>
            <span className={title.length > 60 ? 'text-destructive' : ''}>
              {title.length}/60
            </span>
          </div>
        </div>

        <div>
          <Label htmlFor="meta-description">Meta Description</Label>
          <Textarea
            id="meta-description"
            value={metaDescription}
            onChange={(e) => onMetaDescriptionChange(e.target.value)}
            placeholder="Brief description for search engine results"
            rows={3}
            maxLength={160}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Recommended: 150-160 characters</span>
            <span className={metaDescription.length > 160 ? 'text-destructive' : ''}>
              {metaDescription.length}/160
            </span>
          </div>
        </div>

        <div>
          <Label htmlFor="slug">URL Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => onSlugChange(e.target.value)}
            placeholder="url-friendly-slug"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Preview: /articles/{slug || 'your-slug-here'}
          </p>
        </div>

        <div>
          <Label htmlFor="keywords">Focus Keywords</Label>
          <Input
            id="keywords"
            value={keywords}
            onChange={(e) => onKeywordsChange(e.target.value)}
            placeholder="keyword1, keyword2, keyword3"
          />
          <div className="flex flex-wrap gap-1 mt-2">
            {keywords.split(',').filter(Boolean).map((keyword, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {keyword.trim()}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}