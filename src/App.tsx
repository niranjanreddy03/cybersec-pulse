import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import Home from "./pages/Home";
import TechNews from "./pages/TechNews";
import CyberNews from "./pages/CyberNews";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // In real app, these would come from Supabase auth context
  const isAuthenticated = false;
  
  const handleLogin = () => {
    console.log("Open login modal");
    // In real app: open Supabase auth login
  };
  
  const handleSignup = () => {
    console.log("Open signup modal");
    // In real app: open Supabase auth signup
  };
  
  const handleLogout = () => {
    console.log("Logout user");
    // In real app: call Supabase auth logout
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navigation 
              isAuthenticated={isAuthenticated}
              onLoginClick={handleLogin}
              onSignupClick={handleSignup}
              onLogoutClick={handleLogout}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tech-news" element={<TechNews />} />
              <Route path="/cyber-news" element={<CyberNews />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
