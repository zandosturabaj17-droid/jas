import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gamepad2, Truck, Shield } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-plum-dark via-background to-plum-light opacity-80" />
      
      {/* Animated background circles */}
      <motion.div 
        className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gold/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-milk/5 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <img src="/logo.png" alt="JAS Logo" className="h-48 md:h-64 w-auto" />
        </motion.div>
        <p className="text-muted-foreground text-lg mb-6 tracking-widest uppercase">
          Premium Console Rental
        </p>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6"
        >
          Аренда PlayStation
          <br />
          <span className="text-gold">с доставкой до двери</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Выбери консоль, оформи заказ и получи её уже сегодня. 
          Играй столько, сколько хочешь — без обязательств.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button variant="hero" size="xl">
            <Gamepad2 className="mr-2 h-5 w-5" />
            Выбрать консоль
          </Button>
          <Button variant="outline" size="lg">
            Как это работает?
          </Button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: Truck, title: "Быстрая доставка", desc: "Привезём в течение 2 часов" },
            { icon: Gamepad2, title: "PS5 & PS4", desc: "Выбор игр и аксессуаров" },
            { icon: Shield, title: "Безопасно", desc: "Страховка включена" },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              className="flex flex-col items-center p-6 rounded-2xl bg-secondary/30 backdrop-blur-sm border border-border hover:border-gold/30 transition-all duration-300"
            >
              <feature.icon className="h-10 w-10 text-gold mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
