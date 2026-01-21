import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import ConsoleCard from "@/components/ConsoleCard";

const PlayStation5 = () => {
  const ps5Console = {
    name: "PlayStation 5",
    price: 7000,
    image: "🕹️",
    features: [
      "1 геймпад DualSense",
      "Доступ к 150+ играм",
      "4K / 120fps",
      "Бесплатная доставка",
      "SSD Ultra-быстрая загрузка",
    ],
    popular: true,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                PlayStation 5
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto text-lg">
                Новое поколение консолей для незабываемого игрового опыта. 
                Каждая консоль проходит полную проверку и санитарную обработку перед доставкой
              </p>
            </motion.div>

            {/* Console card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex justify-center"
            >
              <div className="w-full md:w-1/2">
                <ConsoleCard {...ps5Console} delay={0} />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PlayStation5;
