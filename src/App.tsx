
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AirdropPage from "./pages/AirdropPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component to redirect unauthenticated users
// We need to move this component outside of the main App function
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authState } = useAuth();
  
  if (authState.isLoading) {
    return <div className="min-h-screen bg-cosmic-dark flex items-center justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-cosmic-purple border-t-transparent rounded-full"></div>
    </div>;
  }
  
  return authState.user ? <>{children}</> : <Navigate to="/" replace />;
};

// We need to separate the routes component to use the auth context
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route 
        path="/airdrop" 
        element={
          <ProtectedRoute>
            <AirdropPage />
          </ProtectedRoute>
        } 
      />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
