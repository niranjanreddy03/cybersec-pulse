import { Home, Search, FileText, User } from "lucide-react";
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
          to="/articles"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 flex-1 ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`
          }
        >
          <Search className="h-5 w-5" />
          <span className="text-xs">Search</span>
        </NavLink>

        <NavLink
          to="/quick-news"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 flex-1 ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`
          }
        >
          <FileText className="h-5 w-5" />
          <span className="text-xs">News</span>
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
