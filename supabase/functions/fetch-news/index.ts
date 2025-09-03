import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: {
    source: { id: string; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query = 'cybersecurity OR technology', pageSize = 20, category = 'all' } = await req.json();
    
    // Define category-specific queries
    const categoryQueries = {
      'cybersecurity': 'cybersecurity OR "cyber security" OR hacking OR malware OR ransomware OR "data breach"',
      'technology': 'technology OR "artificial intelligence" OR AI OR "machine learning" OR software OR hardware',
      'business': 'business OR startup OR "venture capital" OR IPO OR merger OR acquisition',
      'science': 'science OR research OR discovery OR breakthrough OR innovation OR study',
      'health': 'health OR medical OR healthcare OR medicine OR pharmaceutical OR "clinical trial"',
      'finance': 'finance OR banking OR cryptocurrency OR bitcoin OR "financial technology" OR fintech',
      'all': query
    };
    
    const searchQuery = categoryQueries[category as keyof typeof categoryQueries] || query;
    
    const newsApiKey = Deno.env.get('NEWS_API_KEY');
    if (!newsApiKey) {
      throw new Error('NEWS_API_KEY is not configured');
    }

    // Construct NewsAPI URL
    const newsApiUrl = new URL('https://newsapi.org/v2/everything');
    newsApiUrl.searchParams.append('q', searchQuery);
    newsApiUrl.searchParams.append('pageSize', pageSize.toString());
    newsApiUrl.searchParams.append('sortBy', 'publishedAt');
    newsApiUrl.searchParams.append('language', 'en');
    
    console.log('Fetching news from NewsAPI:', newsApiUrl.toString());

    const response = await fetch(newsApiUrl.toString(), {
      headers: {
        'X-API-Key': newsApiKey,
        'User-Agent': 'CyberNews-App/1.0',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('NewsAPI error:', response.status, errorText);
      throw new Error(`NewsAPI error: ${response.status} ${errorText}`);
    }

    const newsData: NewsAPIResponse = await response.json();
    
    console.log(`Successfully fetched ${newsData.articles?.length || 0} articles`);

    return new Response(
      JSON.stringify(newsData),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );

  } catch (error) {
    console.error('Error fetching news:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        status: 'error'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});