import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Placeholder images mapped to categories
const placeholderImages = {
  tech: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', // Circuit board
  cyber: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80', // Java programming
  general: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80', // Gray laptop
  news: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80', // Colorful code
  quick: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=1200&q=80', // Woman with laptop
}

async function generateImageWithAI(prompt: string, hf: HfInference): Promise<string | null> {
  try {
    console.log('Generating AI image for prompt:', prompt)
    
    const image = await hf.textToImage({
      inputs: prompt,
      model: 'black-forest-labs/FLUX.1-schnell',
    })

    // Convert the blob to a base64 string
    const arrayBuffer = await image.arrayBuffer()
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
    
    return `data:image/png;base64,${base64}`
  } catch (error) {
    console.error('Error generating AI image:', error)
    return null
  }
}

function getImagePromptForArticle(title: string, category: string, excerpt?: string): string {
  const basePrompt = `Professional, high-quality illustration for a ${category} article titled "${title}".`
  
  if (category.toLowerCase().includes('cyber')) {
    return `${basePrompt} Cybersecurity themed, modern, digital security concept, professional technology background`
  } else if (category.toLowerCase().includes('tech')) {
    return `${basePrompt} Technology themed, modern gadgets, programming, innovation, clean professional background`
  } else if (category.toLowerCase().includes('news')) {
    return `${basePrompt} News themed, professional journalism, information, modern news concept`
  } else {
    return `${basePrompt} Professional, clean, modern illustration related to: ${excerpt || title}`
  }
}

function getPlaceholderImage(category: string): string {
  const categoryLower = category.toLowerCase()
  
  if (categoryLower.includes('cyber')) return placeholderImages.cyber
  if (categoryLower.includes('tech')) return placeholderImages.tech
  if (categoryLower.includes('news')) return placeholderImages.news
  if (categoryLower.includes('quick')) return placeholderImages.quick
  
  return placeholderImages.general
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { action, articleId } = await req.json()

    if (action === 'update-all-articles') {
      // Get all articles without images
      const { data: articles, error: fetchError } = await supabaseClient
        .from('articles')
        .select('id, title, category, excerpt, image_url')
        .or('image_url.is.null,image_url.eq.')

      if (fetchError) {
        throw new Error(`Failed to fetch articles: ${fetchError.message}`)
      }

      if (!articles || articles.length === 0) {
        return new Response(
          JSON.stringify({ message: 'No articles found that need images' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      const hfToken = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN')
      const hf = hfToken ? new HfInference(hfToken) : null

      const results = []

      for (const article of articles) {
        let imageUrl = null

        // Try to generate AI image if HF token is available
        if (hf) {
          const prompt = getImagePromptForArticle(article.title, article.category, article.excerpt)
          imageUrl = await generateImageWithAI(prompt, hf)
        }

        // Fall back to placeholder image if AI generation failed
        if (!imageUrl) {
          imageUrl = getPlaceholderImage(article.category)
        }

        // Update the article with the image URL
        const { error: updateError } = await supabaseClient
          .from('articles')
          .update({ image_url: imageUrl })
          .eq('id', article.id)

        if (updateError) {
          console.error(`Failed to update article ${article.id}:`, updateError)
          results.push({ 
            id: article.id, 
            title: article.title, 
            success: false, 
            error: updateError.message 
          })
        } else {
          console.log(`Successfully updated article ${article.id} with image`)
          results.push({ 
            id: article.id, 
            title: article.title, 
            success: true, 
            imageUrl: imageUrl.startsWith('data:') ? 'AI Generated' : imageUrl
          })
        }
      }

      return new Response(
        JSON.stringify({ 
          message: `Processed ${articles.length} articles`, 
          results 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (action === 'update-single-article' && articleId) {
      // Get single article
      const { data: article, error: fetchError } = await supabaseClient
        .from('articles')
        .select('id, title, category, excerpt')
        .eq('id', articleId)
        .single()

      if (fetchError || !article) {
        throw new Error('Article not found')
      }

      const hfToken = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN')
      const hf = hfToken ? new HfInference(hfToken) : null

      let imageUrl = null

      // Try to generate AI image if HF token is available
      if (hf) {
        const prompt = getImagePromptForArticle(article.title, article.category, article.excerpt)
        imageUrl = await generateImageWithAI(prompt, hf)
      }

      // Fall back to placeholder image if AI generation failed
      if (!imageUrl) {
        imageUrl = getPlaceholderImage(article.category)
      }

      // Update the article with the image URL
      const { error: updateError } = await supabaseClient
        .from('articles')
        .update({ image_url: imageUrl })
        .eq('id', articleId)

      if (updateError) {
        throw new Error(`Failed to update article: ${updateError.message}`)
      }

      return new Response(
        JSON.stringify({ 
          message: 'Article updated successfully', 
          articleId,
          imageUrl: imageUrl.startsWith('data:') ? 'AI Generated' : imageUrl
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action. Use "update-all-articles" or "update-single-article"' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred', details: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})