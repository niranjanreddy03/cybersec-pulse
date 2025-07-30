import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { Navigation } from "@/components/ui/navigation";
import Home from "./pages/Home";
import QuickNews from "./pages/QuickNews";
import TechNews from "./pages/TechNews";
import CyberNews from "./pages/CyberNews";
import Subscribe from "./pages/Subscribe";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import ArticleDetail from "./pages/ArticleDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = () => {
    navigate("/auth");
  };
  
  const handleSignup = () => {
    navigate("/auth");
  };
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const isAuthenticated = !!session;

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        isAuthenticated={isAuthenticated}
        onLoginClick={handleLogin}
        onSignupClick={handleSignup}
        onLogoutClick={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quick-news" element={<QuickNews />} />
        <Route path="/tech-news" element={<TechNews />} />
        <Route path="/cyber-news" element={<CyberNews />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
