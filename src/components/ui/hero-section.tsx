import { Shield, TrendingUp, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-cybersec.jpg";
export function HeroSection() {
  return <section className="relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Cybersecurity News" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <Badge className="mb-6 bg-accent text-accent-foreground hover:bg-accent-hover">
            <Shield className="h-3 w-3 mr-1" />
            Trusted Cybersecurity News
          </Badge>
          
          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Stay Ahead of 
            <span className="block bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
              Cyber Threats
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
            Your trusted source for the latest cybersecurity news, tech innovations, 
            and threat intelligence. Professional coverage for security professionals.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent-hover">
              <TrendingUp className="h-4 w-4 mr-2" />
              Latest News
            </Button>
            <Button size="lg" variant="outline" className="border-white hover:bg-white text-zinc-950">
              Subscribe for Updates
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 text-white">
              <div className="bg-white/20 p-2 rounded-lg">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">24/7</div>
                <div className="text-sm text-white/80">News Coverage</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-white">
              <div className="bg-white/20 p-2 rounded-lg">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">Verified</div>
                <div className="text-sm text-white/80">Threat Intel</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-white">
              <div className="bg-white/20 p-2 rounded-lg">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">50K+</div>
                <div className="text-sm text-white/80">Professionals</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-accent/20 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
    </section>;
}