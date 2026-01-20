import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Catalog from "@/components/Catalog";
import HowItWorks from "@/components/HowItWorks";
import Tariffs from "@/components/Tariffs";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Catalog />
        <HowItWorks />
        <Tariffs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
