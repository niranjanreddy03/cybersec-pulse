import { Mail, Phone, MapPin, Clock, Shield, Send, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    department: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      organization: "",
      department: "",
      subject: "",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "info@cybersecbulletain.com",
      description: "For editorial inquiries and news tips"
    },
    {
      icon: Phone,
      title: "Cyber Crime Helpline",
      details: "1930",
      description: "Indian Cyber Crime Helpline - 24/7"
    },
    {
      icon: MapPin,
      title: "Headquarters",
      details: "Bangalore India CyberSecBulletain",
      description: "Global cybersecurity news center"
    },
    {
      icon: Clock,
      title: "Response Time",
      details: "< 2 hours",
      description: "For urgent security matters"
    }
  ];

  const departments = [
    { value: "editorial", label: "Editorial Team" },
    { value: "tips", label: "News Tips" },
    { value: "technical", label: "Technical Support" },
    { value: "partnership", label: "Partnerships" },
    { value: "general", label: "General Inquiry" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/5 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <MessageSquare className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-bold">Contact Us</h1>
            </div>
            <p className="text-xl text-muted-foreground mb-6">
              Have a security tip, story idea, or need to reach our editorial team? 
              We're here to help keep the cybersecurity community informed.
            </p>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent">
              <Shield className="h-3 w-3 mr-1" />
              Secure Communications Available
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-card transition-all">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
                      <p className="text-primary font-medium mb-1">{info.details}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Emergency Contact */}
            <Card className="border-cyber-critical/20 bg-cyber-critical/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyber-critical">
                  <Shield className="h-5 w-5" />
                  Critical Security Incidents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  For immediate reporting of zero-day vulnerabilities, active breaches, 
                  or other critical security incidents that require urgent public awareness.
                </p>
                <Button className="bg-cyber-critical hover:bg-cyber-critical/90 text-white">
                  Report Critical Incident
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName" 
                        placeholder="Your first name" 
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Your last name" 
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@company.com" 
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required 
                    />
                  </div>

                  <div>
                    <Label htmlFor="organization">Organization</Label>
                    <Input 
                      id="organization" 
                      placeholder="Your company or organization" 
                      value={formData.organization}
                      onChange={(e) => handleInputChange("organization", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.value} value={dept.value}>
                            {dept.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input 
                      id="subject" 
                      placeholder="Brief description of your inquiry" 
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required 
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Provide details about your inquiry, news tip, or feedback..."
                      className="min-h-32"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required 
                    />
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium mb-1">Security Notice</p>
                      <p className="text-muted-foreground">
                        For sensitive security information, consider using our secure contact methods. 
                        Do not include credentials, private keys, or other sensitive data in this form.
                      </p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}