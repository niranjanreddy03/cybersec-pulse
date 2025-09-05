import { Shield, Users, Award, Globe, TrendingUp, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewsletterSignup } from "@/components/ui/newsletter-signup";
import { useNavigate } from "react-router-dom";
export default function About() {
  const navigate = useNavigate();
  const teamMembers = [{
    name: "Niranjan Reddy",
    role: "Research Analyst",
    expertise: "Threat Intelligence, Security Research",
    experience: "5+ years"
  }, {
    name: "Deekshith",
    role: "Editor",
    expertise: "Content Strategy, Security Analysis",
    experience: "4+ years"
  }];
  const values = [{
    icon: Shield,
    title: "Security First",
    description: "Every article is verified by security experts before publication"
  }, {
    icon: Zap,
    title: "Real-Time Updates",
    description: "Breaking news and critical alerts delivered as they happen"
  }, {
    icon: Users,
    title: "Community Driven",
    description: "Built by security professionals, for security professionals"
  }, {
    icon: Globe,
    title: "Global Coverage",
    description: "Comprehensive coverage of worldwide cybersecurity events"
  }];
  const stats = [{
    label: "Security Professionals",
    value: "50,000+",
    icon: Users
  }, {
    label: "Articles Published",
    value: "10,000+",
    icon: Award
  }, {
    label: "Countries Covered",
    value: "120+",
    icon: Globe
  }, {
    label: "Daily Readers",
    value: "25,000+",
    icon: TrendingUp
  }];
  return <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/5 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="h-12 w-12 text-primary" />
              <h1 className="text-5xl font-bold">CyberSecBulletain</h1>
            </div>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Your trusted source for cybersecurity and technology news. We deliver 
              verified, expert-analyzed security intelligence to help professionals 
              stay ahead of emerging threats and industry developments.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="outline" className="text-sm px-4 py-2">Established 2025</Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">Bangalore India</Badge>
              <Badge variant="outline" className="text-sm px-4 py-2">CyberSecBulletain</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission Statement */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              To provide cybersecurity professionals and technology leaders with timely, 
              accurate, and actionable intelligence that enables informed decision-making 
              and proactive threat mitigation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => <Card key={index} className="text-center hover:shadow-card transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-16">
          
        </section>

        {/* Editorial Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Editorial Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our team of seasoned cybersecurity experts and technology journalists 
              ensures every piece of content meets the highest standards of accuracy and relevance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => <Card key={index} className="hover:shadow-card transition-all">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-sm text-primary font-medium">{member.role}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">{member.expertise}</p>
                  <Badge variant="secondary" className="text-xs">
                    {member.experience}
                  </Badge>
                </CardContent>
              </Card>)}
          </div>
        </section>

        {/* Editorial Standards */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Editorial Standards</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-accent/20 p-1 rounded-full mt-1">
                    <Shield className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Expert Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      Every security article is reviewed by certified cybersecurity professionals
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-accent/20 p-1 rounded-full mt-1">
                    <Award className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Source Validation</h3>
                    <p className="text-sm text-muted-foreground">
                      All information is cross-referenced with multiple authoritative sources
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-accent/20 p-1 rounded-full mt-1">
                    <Zap className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Rapid Response</h3>
                    <p className="text-sm text-muted-foreground">
                      Critical security alerts are published within hours of discovery
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">Content Categories</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Threat Intelligence</span>
                  <Badge variant="outline">Daily</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Vulnerability Reports</span>
                  <Badge variant="outline">Real-time</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Technology Reviews</span>
                  <Badge variant="outline">Weekly</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Industry Analysis</span>
                  <Badge variant="outline">Monthly</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mb-16">
          <div className="max-w-2xl mx-auto">
            <NewsletterSignup title="Stay Informed" description="Get the latest cybersecurity and technology news delivered directly to your inbox." />
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Contact Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a security tip, story idea, or need to reach our editorial team? 
              We're here to help keep the cybersecurity community informed.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <Card className="hover:shadow-card transition-all">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Email</h4>
                      <p className="text-primary font-medium mb-1">info@cybersecbulletain.com</p>
                      <p className="text-sm text-muted-foreground">For editorial inquiries and news tips</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-card transition-all">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Response Time</h4>
                      <p className="text-primary font-medium mb-1">&lt; 2 hours</p>
                      <p className="text-sm text-muted-foreground">For urgent security matters</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-card transition-all">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Headquarters</h4>
                      <p className="text-primary font-medium mb-1">Bangalore India</p>
                      <p className="text-sm text-muted-foreground">Global cybersecurity news center</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">First Name *</label>
                        <input 
                          type="text"
                          placeholder="Your first name" 
                          className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                          required 
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Last Name *</label>
                        <input 
                          type="text"
                          placeholder="Your last name" 
                          className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                          required 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Email Address *</label>
                      <input 
                        type="email" 
                        placeholder="your.email@company.com" 
                        className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                        required 
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Subject *</label>
                      <input 
                        type="text"
                        placeholder="Brief description of your inquiry" 
                        className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                        required 
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Message *</label>
                      <textarea 
                        placeholder="Provide details about your inquiry, news tip, or feedback..."
                        className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background min-h-32"
                        required 
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Join Community CTA */}
        <section className="text-center bg-gradient-to-r from-primary to-accent rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg mb-8 opacity-90">
            Connect with cybersecurity professionals and stay informed about the latest threats
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" onClick={() => navigate('/subscribe')} className="border-white bg-white/10 text-white hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/25 active:scale-95">
              Subscribe to Newsletter
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/articles')} className="border-white bg-white/10 text-white hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/25 active:scale-95">
              Read Latest Articles
            </Button>
          </div>
        </section>
      </div>
    </div>;
}