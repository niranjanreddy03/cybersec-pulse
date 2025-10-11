-- Create table for storing fetched news articles
CREATE TABLE public.fetched_news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL UNIQUE,
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  source_name TEXT NOT NULL,
  source_id TEXT,
  author TEXT,
  content TEXT,
  category TEXT NOT NULL,
  fetched_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.fetched_news ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can view fetched news"
ON public.fetched_news
FOR SELECT
USING (true);

-- Create policy for edge function to insert news
CREATE POLICY "Service role can insert fetched news"
ON public.fetched_news
FOR INSERT
WITH CHECK (true);

-- Create policy for service role to update news
CREATE POLICY "Service role can update fetched news"
ON public.fetched_news
FOR UPDATE
USING (true);

-- Create index on URL for faster duplicate checking
CREATE INDEX idx_fetched_news_url ON public.fetched_news(url);

-- Create index on category for filtering
CREATE INDEX idx_fetched_news_category ON public.fetched_news(category);

-- Create index on fetched_at for sorting by recency
CREATE INDEX idx_fetched_news_fetched_at ON public.fetched_news(fetched_at DESC);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_fetched_news_updated_at
BEFORE UPDATE ON public.fetched_news
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();