import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import ProductInsights from "./pages/ProductInsights";
import Upload from "./pages/Upload";
import ContentStudio from "./pages/ContentStudio";
import VisualCreator from "./pages/VisualCreator";
import CarouselMaker from "./pages/CarouselMaker";
import VideoAds from "./pages/VideoAds";
import Campaigns from "./pages/Campaigns";
import Automation from "./pages/Automation";
import Publish from "./pages/Publish";
import Performance from "./pages/Performance";
import Library from "./pages/Library";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/insights" element={<Insights />} />
          <Route path="/dashboard/product-insights" element={<ProductInsights />} />
          <Route path="/dashboard/upload" element={<Upload />} />
          <Route path="/dashboard/content" element={<ContentStudio />} />
          <Route path="/dashboard/visual-creator" element={<VisualCreator />} />
          <Route path="/dashboard/carousel-maker" element={<CarouselMaker />} />
          <Route path="/dashboard/video-ads" element={<VideoAds />} />
          <Route path="/dashboard/campaigns" element={<Campaigns />} />
          <Route path="/dashboard/automation" element={<Automation />} />
          <Route path="/dashboard/publish" element={<Publish />} />
          <Route path="/dashboard/performance" element={<Performance />} />
          <Route path="/dashboard/library" element={<Library />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
