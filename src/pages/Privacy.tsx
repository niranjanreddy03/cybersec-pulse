import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Eye, Cookie, UserCheck, Mail, Lock } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-primary" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <p className="text-muted-foreground">
                  When you create an account or subscribe to our newsletter, we may collect:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>Email address</li>
                  <li>Name (if provided)</li>
                  <li>Account preferences</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Usage Information</h3>
                <p className="text-muted-foreground">
                  We automatically collect information about how you use our service:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>Pages visited and articles read</li>
                  <li>Time spent on our website</li>
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="h-5 w-5 mr-2 text-primary" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide and improve our cybersecurity news service</li>
                <li>Send newsletters and important security updates</li>
                <li>Personalize your experience and content recommendations</li>
                <li>Analyze usage patterns to improve our website</li>
                <li>Communicate with you about our services</li>
                <li>Ensure the security and integrity of our platform</li>
              </ul>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cookie className="h-5 w-5 mr-2 text-primary" />
                Cookies and Tracking Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We use cookies and similar technologies to enhance your browsing experience:
              </p>
              
              <div>
                <h3 className="font-semibold mb-2">Essential Cookies</h3>
                <p className="text-muted-foreground">
                  Required for basic website functionality, user authentication, and security.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Analytics Cookies</h3>
                <p className="text-muted-foreground">
                  Help us understand how visitors interact with our website to improve performance.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Advertising Cookies</h3>
                <p className="text-muted-foreground">
                  Used to display relevant advertisements through Google AdSense and other advertising partners.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="h-5 w-5 mr-2 text-primary" />
                Data Sharing and Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">When We Share Information</h3>
                <p className="text-muted-foreground mb-2">
                  We may share your information in limited circumstances:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>With service providers who help us operate our website</li>
                  <li>To comply with legal obligations or protect our rights</li>
                  <li>In connection with a business transfer or merger</li>
                  <li>With your explicit consent</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Data Security</h3>
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="h-5 w-5 mr-2 text-primary" />
                Your Rights and Choices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access, update, or delete your personal information</li>
                <li>Unsubscribe from our newsletters at any time</li>
                <li>Opt out of certain data collection and use</li>
                <li>Request a copy of your data</li>
                <li>File a complaint with supervisory authorities</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Email:</strong> privacy@cybersecbulletain.com</p>
                <p><strong>Address:</strong> 123 Security Street, Cyber City, CC 12345</p>
                <p><strong>Response Time:</strong> We aim to respond within 48 hours</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>
            This Privacy Policy is effective as of {new Date().toLocaleDateString()} and will remain in effect 
            except with respect to any changes in its provisions in the future, which will be in effect 
            immediately after being posted on this page.
          </p>
        </div>
      </div>
    </div>
  );
}