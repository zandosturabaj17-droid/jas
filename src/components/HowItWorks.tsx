import { motion } from "framer-motion";
import { Smartphone, CreditCard, Truck, Gamepad2 } from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    title: "Выбери консоль",
    description: "Открой каталог и выбери PS5 или PS4 с нужными играми",
  },
  {
    icon: CreditCard,
    title: "Оформи заказ",
    description: "Укажи адрес и удобное время доставки",
  },
  {
    icon: Truck,
    title: "Получи доставку",
    description: "Курьер привезёт консоль в течение 2 часов",
  },
  {
    icon: Gamepad2,
    title: "Играй!",
    description: "Наслаждайся игрой столько, сколько захочешь",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4 bg-secondary/20" id="how-it-works">
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
            Как это работает
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Всего 4 простых шага до твоего игрового вечера
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
              )}

              {/* Step number */}
              <motion.div 
                className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-plum-light border-2 border-gold/30 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <step.icon className="h-8 w-8 text-gold" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold text-plum text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
              </motion.div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
