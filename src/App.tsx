import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { UserProvider } from "@/contexts/UserContext";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import { Dashboard } from "./pages/Dashboard";
import { Settings } from "./pages/Settings";
import { Reports } from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="admybrand-ui-theme">
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={
                <Layout>
                  <Dashboard />
                </Layout>
              } />
              <Route path="/settings" element={
                <Layout>
                  <Settings />
                </Layout>
              } />
              <Route path="/reports" element={
                <Layout>
                  <Reports />
                </Layout>
              } />
              <Route path="/campaigns" element={
                <Layout>
                  <Dashboard />
                </Layout>
              } />
              <Route path="/revenue" element={
                <Layout>
                  <Dashboard />
                </Layout>
              } />
              <Route path="/users" element={
                <Layout>
                  <Dashboard />
                </Layout>
              } />
              <Route path="/performance" element={
                <Layout>
                  <Dashboard />
                </Layout>
              } />
              <Route path="/export" element={
                <Layout>
                  <Reports />
                </Layout>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
