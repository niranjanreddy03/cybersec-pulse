import { supabase } from "@/integrations/supabase/client";

export interface ArticleImageResult {
  id: string;
  title: string;
  success: boolean;
  imageUrl?: string;
  error?: string;
}

export interface ArticleImageResponse {
  message: string;
  results?: ArticleImageResult[];
  articleId?: string;
  imageUrl?: string;
}

export class ArticleImageService {
  static async updateAllArticleImages(): Promise<ArticleImageResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('generate-article-images', {
        body: { action: 'update-all-articles' }
      });

      if (error) {
        throw new Error(error.message);
      }

      return data as ArticleImageResponse;
    } catch (error) {
      console.error('Error updating all article images:', error);
      throw error;
    }
  }

  static async updateSingleArticleImage(articleId: string): Promise<ArticleImageResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('generate-article-images', {
        body: { 
          action: 'update-single-article',
          articleId 
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      return data as ArticleImageResponse;
    } catch (error) {
      console.error('Error updating article image:', error);
      throw error;
    }
  }

  static async getArticlesWithoutImages() {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title, category, created_at')
        .or('image_url.is.null,image_url.eq.')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching articles without images:', error);
      throw error;
    }
  }
}