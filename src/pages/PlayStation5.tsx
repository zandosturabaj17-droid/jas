import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Gamepad2, Cpu, Wifi, Sparkles, Trophy, ShoppingCart } from "lucide-react";
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

  const specifications = [
    {
      icon: Cpu,
      title: "Процессор",
      description: "AMD Ryzen 8-ядерный @ 3.5 ГГц",
      color: "text-blue-400",
    },
    {
      icon: Zap,
      title: "Видеокарта",
      description: "RDNA 2 10.28 TFLOPS",
      color: "text-yellow-400",
    },
    {
      icon: Wifi,
      title: "Памяць",
      description: "16 ГБ GDDR6 + 448 ГБ SSD",
      color: "text-purple-400",
    },
    {
      icon: Gamepad2,
      title: "Контроллер",
      description: "DualSense с тактильной обратной связью",
      color: "text-pink-400",
    },
  ];

  const rentalPlans = [
    {
      duration: "1 день",
      price: "7 000₸",
      total: "1 день",
      bonus: "",
      discount: "0%",
      color: "from-blue-600 to-blue-700",
    },
    {
      duration: "2 дня",
      price: "14 000₸",
      total: "5 дней",
      bonus: "+3 дня в подарок",
      discount: "60%",
      color: "from-purple-600 to-purple-700",
    },
    {
      duration: "5 дней",
      price: "35 000₸",
      total: "7 дней",
      bonus: "+2 дня в подарок",
      discount: "40%",
      color: "from-gold to-gold-light",
      featured: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-plum-light/20 to-transparent -z-10" />
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left side - Text */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-gold/10 border border-gold/30"
                >
                  <Sparkles className="h-4 w-4 text-gold" />
                  <span className="text-sm font-semibold text-gold">Новое поколение</span>
                </motion.div>

                <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6 leading-tight">
                  PlayStation 5
                </h1>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Погружайтесь в будущее игр с консолью нового поколения. 
                  Невероятная производительность, потрясающая графика и тысячи игр ждут вас.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-gold" />
                    <span className="text-foreground font-semibold">150+ игр</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-gold" />
                    <span className="text-foreground font-semibold">4K / 120fps</span>
                  </div>
                </div>

                <Button size="lg" className="bg-gold hover:bg-gold/90 text-plum font-bold">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Заказать аренду
                </Button>
              </motion.div>

              {/* Right side - Console Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center"
              >
                <div className="relative">
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-9xl"
                  >
                    🕹️
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Технические характеристики
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Мощь и производительность нового поколения
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {specifications.map((spec, index) => (
                <motion.div
                  key={spec.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-gold/30 transition-all duration-300"
                >
                  <spec.icon className={`h-12 w-12 ${spec.color} mb-4`} />
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {spec.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {spec.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Rental Plans Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Выберите период аренды
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Чем дольше аренда — тем больше скидка
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rentalPlans.map((plan, index) => (
                <motion.div
                  key={plan.duration}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`relative p-8 rounded-2xl border transition-all duration-300 overflow-hidden group ${
                    plan.featured
                      ? "bg-gradient-to-br from-gold/20 to-gold/5 border-gold/50 shadow-glow scale-100 md:scale-105"
                      : "bg-secondary/30 border-border hover:border-gold/30"
                  }`}
                >
                  {plan.featured && (
                    <motion.div 
                      className="absolute -top-3 right-6"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="bg-gold text-plum px-3 py-1 rounded-full text-xs font-bold">
                        Лучший выбор
                      </span>
                    </motion.div>
                  )}

                  <div className="relative z-10">
                    <p className="text-sm text-muted-foreground mb-2">Срок аренды</p>
                    <h3 className="text-3xl font-bold text-foreground mb-4">
                      {plan.duration}
                    </h3>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-black text-gold">
                        {plan.price}
                      </span>
                      <span className="text-lg font-semibold text-green-400">
                        {plan.discount}
                      </span>
                    </div>

                    <div className="mb-4 p-3 rounded-lg bg-foreground/5 border border-gold/20">
                      <p className="text-lg font-bold text-gold mb-1">
                        {plan.total}
                      </p>
                      {plan.bonus && (
                        <p className="text-sm font-semibold text-green-400">
                          {plan.bonus}
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-6">
                      Включает доставку и настройку
                    </p>

                    <Button 
                      className={`w-full font-bold ${
                        plan.featured
                          ? "bg-gold hover:bg-gold/90 text-plum"
                          : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
                      }`}
                    >
                      Выбрать
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Console Card Section */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Полный пакет
              </h2>
              <p className="text-muted-foreground">
                Что входит в аренду
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center"
            >
              <ConsoleCard {...ps5Console} delay={0} />
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  Почему выбирают нас?
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Гарантия качества",
                      desc: "Каждая консоль проверена и продезинфицирована",
                    },
                    {
                      title: "Быстрая доставка",
                      desc: "Доставляем по Алматы за 24 часа",
                    },
                    {
                      title: "Поддержка 24/7",
                      desc: "Помощь доступна в любое время суток",
                    },
                    {
                      title: "Гибкие условия",
                      desc: "Продлите аренду или вернитесь в любой момент",
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center">
                          <Sparkles className="h-5 w-5 text-gold" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="sticky top-24 p-8 rounded-2xl bg-gradient-to-br from-plum-light/30 to-secondary/30 border border-gold/20 shadow-glow">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Начните прямо сейчас
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    Простой процесс в три шага: выбор, оформление и наслаждение
                  </p>
                  <Button size="lg" className="w-full bg-gold hover:bg-gold/90 text-plum font-bold mb-4">
                    Заказать PS5
                  </Button>
                  <Button size="lg" variant="outline" className="w-full">
                    Узнать подробнее
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PlayStation5;
