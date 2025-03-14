
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import OnboardingPage from "./pages/OnboardingPage";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import SearchPage from "./pages/SearchPage";
import NewRequestPage from "./pages/NewRequestPage";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";

// Create a new query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem('authenticated');
    setIsAuthenticated(auth === 'true');

    // If this is the first visit, make sure to show onboarding
    if (auth === null) {
      localStorage.setItem('authenticated', 'false');
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('authenticated', 'true');
    setIsAuthenticated(true);
  };

  // Provide the login function to the app context
  const contextValue = {
    isAuthenticated,
    login: handleLogin,
    logout: () => {
      localStorage.setItem('authenticated', 'false');
      setIsAuthenticated(false);
    }
  };

  // Don't render anything until we know if the user is authenticated
  if (isAuthenticated === null) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <OnboardingPage onLogin={handleLogin} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/new" element={<NewRequestPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
