
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Airdrop from "./pages/Airdrop";
import Roadmap from "./pages/Roadmap";
import { useAuth } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

// Protected route component to redirect unauthenticated users
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authState } = useAuth();
  
  if (authState.isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!authState.user) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route 
              path="/airdrop" 
              element={
                <ProtectedRoute>
                  <Airdrop />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
