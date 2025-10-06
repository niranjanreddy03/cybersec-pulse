import { Shield } from "lucide-react";
import { NavLink } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-background border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CyberSecBulletain
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted source for cybersecurity news, threat intelligence, and expert analysis.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><NavLink to="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</NavLink></li>
              <li><NavLink to="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</NavLink></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CyberSecBulletain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}