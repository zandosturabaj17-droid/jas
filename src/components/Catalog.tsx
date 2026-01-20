import { motion } from "framer-motion";
import ConsoleCard from "./ConsoleCard";

const consoles = [
  {
    name: "PlayStation 4 Pro",
    price: 5000,
    image: "🎮",
    features: [
      "1 геймпад DualShock 4",
      "Доступ к 100+ играм",
      "Full HD / 4K",
      "Бесплатная доставка",
    ],
    popular: false,
  },
  {
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
  },
];

const Catalog = () => {
  return (
    <section className="py-24 px-4" id="catalog">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Выбери свою консоль
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Каждая консоль проходит полную проверку и санитарную обработку перед доставкой
          </p>
        </motion.div>

        {/* Console cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {consoles.map((console, index) => (
            <ConsoleCard
              key={console.name}
              {...console}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
