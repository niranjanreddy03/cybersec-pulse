import { Home, Shield, Cpu, User } from "lucide-react";
import { NavLink } from "react-router-dom";

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16 px-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 flex-1 ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`
          }
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </NavLink>

        <NavLink
          to="/cyber-news"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 flex-1 ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`
          }
        >
          <Shield className="h-5 w-5" />
          <span className="text-xs">Cyber</span>
        </NavLink>

        <NavLink
          to="/tech-news"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 flex-1 ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`
          }
        >
          <Cpu className="h-5 w-5" />
          <span className="text-xs">Tech</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 flex-1 ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`
          }
        >
          <User className="h-5 w-5" />
          <span className="text-xs">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
}
