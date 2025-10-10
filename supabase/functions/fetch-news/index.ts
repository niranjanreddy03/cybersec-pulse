import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

interface GNewsResponse {
  totalArticles: number;
  articles: GNewsArticle[];
}

interface OTXPulse {
  id: string;
  name: string;
  description: string;
  created: string;
  modified: string;
  author_name: string;
  tags: string[];
  references: string[];
}

interface OTXResponse {
  results: OTXPulse[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pageSize = 20 } = await req.json();
    
    const gnewsApiKey = Deno.env.get('GNEWS_API_KEY');
    const otxApiKey = Deno.env.get('OTX_API_KEY');
    
    if (!gnewsApiKey) {
      throw new Error('GNEWS_API_KEY is not configured');
    }
    
    if (!otxApiKey) {
      throw new Error('OTX_API_KEY is not configured');
    }

    console.log('Fetching cybersecurity news from GNews and OTX...');

    // Fetch from GNews - cybersecurity articles
    const gnewsUrl = new URL('https://gnews.io/api/v4/search');
    gnewsUrl.searchParams.append('q', 'cybersecurity OR "cyber attack" OR hacking OR malware OR ransomware OR "data breach" OR "cyber threat"');
    gnewsUrl.searchParams.append('lang', 'en');
    gnewsUrl.searchParams.append('max', Math.min(pageSize, 10).toString());
    gnewsUrl.searchParams.append('apikey', gnewsApiKey);
    
    console.log('Fetching from GNews...');
    const gnewsResponse = await fetch(gnewsUrl.toString());
    
    let gnewsArticles: GNewsArticle[] = [];
    if (gnewsResponse.ok) {
      const gnewsData: GNewsResponse = await gnewsResponse.json();
      gnewsArticles = gnewsData.articles || [];
      console.log(`Fetched ${gnewsArticles.length} articles from GNews`);
    } else {
      console.error('GNews error:', gnewsResponse.status, await gnewsResponse.text());
    }

    // Fetch from OTX - threat intelligence pulses
    const otxUrl = 'https://otx.alienvault.com/api/v1/pulses/subscribed';
    
    console.log('Fetching from OTX...');
    const otxResponse = await fetch(otxUrl, {
      headers: {
        'X-OTX-API-KEY': otxApiKey,
      },
    });
    
    let otxPulses: OTXPulse[] = [];
    if (otxResponse.ok) {
      const otxData: OTXResponse = await otxResponse.json();
      otxPulses = otxData.results?.slice(0, Math.min(pageSize, 10)) || [];
      console.log(`Fetched ${otxPulses.length} threat pulses from OTX`);
    } else {
      console.error('OTX error:', otxResponse.status, await otxResponse.text());
    }

    // Convert OTX pulses to article format
    const otxArticles = otxPulses.map(pulse => ({
      source: { id: 'otx', name: 'AlienVault OTX' },
      author: pulse.author_name,
      title: pulse.name,
      description: pulse.description,
      url: `https://otx.alienvault.com/pulse/${pulse.id}`,
      urlToImage: 'https://cybersixgill.com/wp-content/uploads/2021/06/AlienVault-OTX.png',
      publishedAt: pulse.modified,
      content: pulse.description,
    }));

    // Convert GNews articles to NewsAPI format
    const gnewsFormattedArticles = gnewsArticles.map(article => ({
      source: { id: article.source.url, name: article.source.name },
      author: article.source.name,
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.image,
      publishedAt: article.publishedAt,
      content: article.content,
    }));

    // Combine articles from both sources
    const combinedArticles = [...gnewsFormattedArticles, ...otxArticles];
    
    console.log(`Total combined articles: ${combinedArticles.length}`);

    return new Response(
      JSON.stringify({
        status: 'ok',
        totalResults: combinedArticles.length,
        articles: combinedArticles,
      }),
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