
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// import { ReactLenis } from "@studio-freight/react-lenis"; // Removed in favor of SmoothScroll component
import SmoothScroll from "@/components/SmoothScroll";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import MouseTrail from "@/components/MouseTrail";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import About from "./pages/About";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <SmoothScroll>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </SmoothScroll>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AnimatedBackground>
        <MouseTrail />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </AnimatedBackground>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
