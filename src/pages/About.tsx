import { Shield, Users, Award, Globe, TrendingUp, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
export default function About() {
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
            {values.map((value, index) => {})}
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

        {/* Contact CTA */}
        <section className="text-center bg-gradient-to-r from-primary to-accent rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg mb-8 opacity-90">
            Connect with cybersecurity professionals and stay informed about the latest threats
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Subscribe to Newsletter
            </Button>
            <Button size="lg" variant="outline" className="border-white hover:bg-white text-zinc-950">
              Contact Editorial Team
            </Button>
          </div>
        </section>
      </div>
    </div>;
}