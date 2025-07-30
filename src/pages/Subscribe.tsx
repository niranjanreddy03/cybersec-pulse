import { useState } from "react";
import { NewsletterSignup } from "@/components/ui/newsletter-signup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Shield, Clock, Users, CheckCircle, Star, Globe } from "lucide-react";

export default function Subscribe() {
  const [selectedPlan, setSelectedPlan] = useState<string>("free");

  const plans = [
    {
      id: "free",
      name: "Free Newsletter",
      price: "Free",
      description: "Essential cybersecurity updates",
      features: [
        "Weekly cybersecurity digest",
        "Breaking security alerts",
        "Tech industry news",
        "Basic threat intelligence"
      ],
      badge: "Most Popular"
    },
    {
      id: "pro",
      name: "Pro Intelligence",
      price: "$19/month",
      description: "Advanced threat intelligence",
      features: [
        "Daily security briefings",
        "Exclusive threat reports",
        "Industry analyst insights",
        "Early access to research",
        "Custom threat feeds",
        "Priority support"
      ],
      badge: "Recommended"
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      description: "Complete security intelligence",
      features: [
        "Real-time threat alerts",
        "Custom intelligence reports",
        "Dedicated account manager",
        "API access",
        "Custom integrations",
        "Team collaboration tools",
        "24/7 support"
      ],
      badge: "Enterprise"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Verified Intelligence",
      description: "All news and threats are verified by our security experts"
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Get critical security alerts as they happen"
    },
    {
      icon: Users,
      title: "Expert Analysis",
      description: "In-depth analysis from cybersecurity professionals"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Worldwide cybersecurity news and threat intelligence"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CISO, TechCorp",
      content: "The threat intelligence updates have been invaluable for our security team. We've prevented several attacks thanks to early warnings.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Security Analyst",
      content: "Best cybersecurity newsletter I've subscribed to. The analysis is always spot-on and actionable.",
      rating: 5
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Cybersecurity Researcher",
      content: "Professional, timely, and comprehensive. This has become an essential part of my daily security briefing.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/5 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Mail className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-bold">Subscribe for Updates</h1>
            </div>
            <p className="text-xl text-muted-foreground mb-6">
              Stay ahead of cyber threats with our comprehensive security intelligence and news updates. 
              Join over 50,000 security professionals who trust our reporting.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                <Shield className="h-3 w-3 mr-1" />
                Trusted by Fortune 500
              </Badge>
              <Badge variant="outline">50K+ Subscribers</Badge>
              <Badge variant="outline">Daily Updates</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Subscribe?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center hover:shadow-card transition-all">
                <CardContent className="p-6">
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your Plan</h2>
          <p className="text-center text-muted-foreground mb-12">
            Select the level of cybersecurity intelligence that fits your needs
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative hover:shadow-lg transition-all cursor-pointer ${
                  selectedPlan === plan.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary mb-2">{plan.price}</div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full" 
                    variant={selectedPlan === plan.id ? "default" : "outline"}
                  >
                    {plan.id === "enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mb-16">
          <div className="max-w-2xl mx-auto">
            <NewsletterSignup 
              title="Start with Free Newsletter"
              description="Get started with our free cybersecurity newsletter and upgrade anytime."
            />
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Subscribers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-card transition-all">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">How often will I receive updates?</h3>
                <p className="text-muted-foreground">
                  Free subscribers receive weekly digests and breaking alerts. Pro subscribers get daily briefings, 
                  and Enterprise customers receive real-time notifications.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
                <p className="text-muted-foreground">
                  Yes, you can cancel your subscription at any time. No long-term commitments required.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Is my email secure?</h3>
                <p className="text-muted-foreground">
                  Absolutely. We use industry-standard encryption and never share your information with third parties. 
                  Your privacy and security are our top priorities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}