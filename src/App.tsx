import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Electricity from "./pages/Electricity";
import Gas from "./pages/Gas";
import Municipal from "./pages/Municipal";
import Emergency from "./pages/Emergency";
import Auth from "./pages/Auth";
import KioskHome from "./pages/KioskHome";
import Track from "./pages/Track";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/kiosk" element={<KioskHome />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/electricity" element={<Electricity />} />
              <Route path="/gas" element={<Gas />} />
              <Route path="/municipal" element={<Municipal />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/track" element={<Track />} />
              <Route path="/admin" element={<AdminDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
