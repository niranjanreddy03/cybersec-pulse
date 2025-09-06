import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Users, AlertTriangle, Gavel, Shield, Mail } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Please read these terms carefully before using our cybersecurity news platform.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          {/* Acceptance of Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gavel className="h-5 w-5 mr-2 text-primary" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                By accessing and using CyberSecBulletain ("the Service"), you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to abide by the above, please 
                do not use this service.
              </p>
            </CardContent>
          </Card>

          {/* Use License */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Use License
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Permission is granted to temporarily download one copy of the materials on CyberSecBulletain 
                for personal, non-commercial transitory viewing only.
              </p>
              
              <div>
                <h3 className="font-semibold mb-2">This license shall automatically terminate if you violate any of these restrictions:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Modify or copy the materials</li>
                  <li>Use materials for commercial purposes or public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or proprietary notations from the materials</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                User Accounts and Conduct
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Account Registration</h3>
                <p className="text-muted-foreground">
                  To access certain features, you may be required to create an account. You are responsible 
                  for maintaining the confidentiality of your account credentials.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Prohibited Activities</h3>
                <p className="text-muted-foreground mb-2">You agree not to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Use the service for any unlawful purpose or illegal activity</li>
                  <li>Transmit viruses, malware, or other harmful code</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Impersonate others or provide false information</li>
                  <li>Spam or send unsolicited communications</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Content and Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Content and Intellectual Property
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Our Content</h3>
                <p className="text-muted-foreground">
                  All content on CyberSecBulletain, including articles, images, graphics, logos, and software, 
                  is the property of CyberSecBulletain or its content suppliers and is protected by copyright laws.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">User-Generated Content</h3>
                <p className="text-muted-foreground">
                  By submitting content to our platform, you grant us a non-exclusive, worldwide, royalty-free 
                  license to use, modify, and display such content in connection with our service.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Privacy and Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Privacy and Data Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your privacy is important to us. Our collection and use of personal information is governed 
                by our Privacy Policy, which is incorporated into these Terms of Service by reference.
              </p>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
                Disclaimers and Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Service Availability</h3>
                <p className="text-muted-foreground">
                  We strive to provide reliable service but cannot guarantee uninterrupted access. 
                  The service is provided "as is" without warranties of any kind.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Information Accuracy</h3>
                <p className="text-muted-foreground">
                  While we make every effort to provide accurate and up-to-date cybersecurity information, 
                  we cannot guarantee the accuracy, completeness, or timeliness of all content.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Limitation of Liability</h3>
                <p className="text-muted-foreground">
                  CyberSecBulletain shall not be liable for any indirect, incidental, special, consequential, 
                  or punitive damages resulting from your use of the service.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Advertising */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Advertising and Third-Party Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our website may contain advertisements and links to third-party websites. We are not 
                responsible for the content, privacy policies, or practices of third-party sites. 
                Advertisements are provided by Google AdSense and other advertising partners.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
                Termination
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may terminate or suspend your account and access to the service immediately, without 
                prior notice, for conduct that we believe violates these Terms of Service or is harmful 
                to other users, us, or third parties.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Changes to Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. We will notify users of significant 
                changes via email or prominent notice on our website. Continued use of the service after 
                changes constitutes acceptance of the new terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Email:</strong> legal@cybersecbulletain.com</p>
                <p><strong>Address:</strong> 123 Security Street, Cyber City, CC 12345</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-12" />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>
            These Terms of Service are effective as of {new Date().toLocaleDateString()} and will remain 
            in effect except with respect to any changes in their provisions in the future.
          </p>
        </div>
      </div>
    </div>
  );
}