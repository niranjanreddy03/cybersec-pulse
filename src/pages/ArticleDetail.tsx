import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, User, Tag, Share2, Bookmark, ExternalLink } from "lucide-react";
import { Article } from "@/components/ui/article-card";

// Mock article data (in real app, this would come from API)
const mockFullArticles: Record<string, Article & { content: string }> = {
  "1": {
    id: "1",
    title: "Critical Zero-Day Vulnerability Discovered in Popular Email Client",
    excerpt: "Security researchers have identified a severe zero-day vulnerability affecting millions of users worldwide. Immediate patching is recommended.",
    author: "Sarah Johnson",
    publishedAt: "2024-01-29T10:30:00Z",
    category: "cyber",
    tags: ["Zero-Day", "Email Security", "Vulnerability"],
    priority: "critical",
    featured: true,
    imageUrl: "/placeholder.svg",
    content: `
# Critical Zero-Day Vulnerability in Email Client

Security researchers at CyberSec Labs have identified a critical zero-day vulnerability (CVE-2024-0001) in one of the world's most popular email clients, affecting an estimated 50 million users globally.

## Vulnerability Details

The vulnerability, classified as a remote code execution (RCE) flaw, allows attackers to execute arbitrary code on victim systems by sending specially crafted email messages. The exploit requires no user interaction beyond opening the malicious email.

### Technical Analysis

- **CVSS Score**: 9.8 (Critical)
- **Attack Vector**: Network
- **Attack Complexity**: Low
- **Privileges Required**: None
- **User Interaction**: None

## Impact Assessment

Organizations and individuals using the affected email client are at immediate risk of:

- Remote code execution
- Data exfiltration
- Credential theft
- Lateral movement within networks
- Ransomware deployment

## Immediate Actions Required

1. **Disable automatic email preview** in the affected client
2. **Update to the latest version** immediately once patches are available
3. **Monitor network traffic** for suspicious activity
4. **Implement additional email security controls**

## Mitigation Strategies

While patches are being developed, organizations should:

- Deploy email security gateways with advanced threat protection
- Implement network segmentation to limit potential damage
- Conduct immediate security awareness training
- Consider temporarily switching to alternative email clients

## Timeline

- **Discovery**: January 28, 2024
- **Vendor Notification**: January 29, 2024 (Coordinated disclosure)
- **Public Disclosure**: January 29, 2024
- **Patch Expected**: Within 72 hours

## Industry Response

Major cybersecurity vendors have already updated their threat intelligence feeds to detect exploitation attempts. The US-CERT has issued an emergency advisory recommending immediate action.

This vulnerability represents one of the most critical email security threats discovered in recent years, with potential for widespread exploitation if not addressed promptly.

For more information and updates, follow our security advisory feed.
    `
  },
  "tech-1": {
    id: "tech-1",
    title: "AI-Powered Threat Detection Systems Show 99% Accuracy Rate",
    excerpt: "New machine learning algorithms are revolutionizing cybersecurity defense mechanisms with unprecedented accuracy rates.",
    author: "Michael Chen",
    publishedAt: "2024-01-29T08:15:00Z",
    category: "tech",
    tags: ["AI", "Machine Learning", "Threat Detection"],
    priority: "high",
    imageUrl: "/placeholder.svg",
    content: `
# AI Revolution in Cybersecurity: 99% Threat Detection Accuracy Achieved

A groundbreaking study conducted by the Institute of Advanced Cybersecurity has revealed that next-generation AI-powered threat detection systems are achieving unprecedented accuracy rates of 99% in identifying and mitigating cyber threats.

## The Technology Behind the Breakthrough

The new systems leverage advanced machine learning algorithms, including:

### Deep Learning Neural Networks
- Multi-layer perceptron architectures
- Convolutional neural networks for pattern recognition
- Recurrent neural networks for sequence analysis

### Advanced Analytics
- Behavioral analytics and anomaly detection
- Real-time threat intelligence correlation
- Predictive threat modeling

## Performance Metrics

The study, conducted over 12 months across 500 enterprise environments, showed:

- **99.2% accuracy** in threat detection
- **0.1% false positive rate**
- **Sub-second response times**
- **95% reduction** in security analyst workload

## Real-World Applications

Organizations implementing these AI systems report:

1. **Automated Incident Response**: Threats are contained within seconds of detection
2. **Proactive Threat Hunting**: AI identifies potential threats before they manifest
3. **Enhanced SOC Efficiency**: Security teams can focus on strategic initiatives

## Industry Impact

Major cybersecurity vendors are racing to integrate these capabilities:

- **CrowdStrike** announced AI-enhanced endpoint protection
- **Palo Alto Networks** unveiled autonomous security operations
- **Microsoft** integrated AI into Azure Sentinel

## Challenges and Considerations

Despite the promising results, experts caution about:

- **Adversarial AI attacks** targeting ML models
- **Data privacy concerns** with AI processing
- **Need for continuous model training** and updates

## Future Outlook

The integration of AI in cybersecurity is expected to:

- Reduce average breach detection time from 207 days to under 24 hours
- Lower cybersecurity costs by 40% over the next five years
- Enable real-time threat response across global infrastructures

This technological advancement represents a paradigm shift in how organizations defend against evolving cyber threats.
    `
  }
};

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<(Article & { content: string }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Simulate API call
      setTimeout(() => {
        const foundArticle = mockFullArticles[id];
        if (foundArticle) {
          setArticle(foundArticle);
        }
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500/10 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-500/10 text-orange-700 border-orange-200';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-500/10 text-green-700 border-green-200';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-4">The article you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-8">
              {/* Priority Badge */}
              <Badge className={`mb-4 ${getPriorityColor(article.priority)}`}>
                {article.priority.toUpperCase()} PRIORITY
              </Badge>

              {/* Title */}
              <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mb-6">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
                {article.url && (
                  <Button variant="outline" size="sm" onClick={() => window.open(article.url, '_blank')}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Original Source
                  </Button>
                )}
              </div>

              <Separator />

              {/* Article Image */}
              {article.imageUrl && article.imageUrl !== "/placeholder.svg" && (
                <div className="my-8">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              )}

              {/* Excerpt */}
              <div className="text-lg text-muted-foreground mb-8 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                {article.excerpt}
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {article.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('# ')) {
                    return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{paragraph.slice(2)}</h1>;
                  } else if (paragraph.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">{paragraph.slice(3)}</h2>;
                  } else if (paragraph.startsWith('### ')) {
                    return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{paragraph.slice(4)}</h3>;
                  } else if (paragraph.startsWith('- **')) {
                    return <li key={index} className="ml-4 mb-1">{paragraph.slice(2)}</li>;
                  } else if (paragraph.startsWith('- ')) {
                    return <li key={index} className="ml-4 mb-1">{paragraph.slice(2)}</li>;
                  } else if (paragraph.trim() === '') {
                    return <br key={index} />;
                  } else {
                    return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
                  }
                })}
              </div>

              {/* Article Footer */}
              <Separator className="my-8" />
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Published on {formatDate(article.publishedAt)} by {article.author}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    Share Article
                  </Button>
                  <Button size="sm" onClick={() => navigate('/')}>
                    Read More Articles
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}