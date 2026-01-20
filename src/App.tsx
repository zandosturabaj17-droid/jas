import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Tariffs from "./components/Tariffs";
import Catalog from "./components/Catalog";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const HomePage = () => (
  <div className="min-h-screen bg-black">
    <Navbar />
    <Hero />
    <HowItWorks />
    <Tariffs />
    <Catalog />
    <Footer />
  </div>
);

const App = () => (
  <Router>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  </Router>
);

export default App;
