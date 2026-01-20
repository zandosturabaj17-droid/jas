import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, Zap, Trophy } from "lucide-react";

const tariffs = [
  {
    icon: Clock,
    name: "Выходные",
    duration: "3 дня",
    discount: "-10%",
    description: "Идеально для игрового уикенда с друзьями",
    color: "text-milk",
  },
  {
    icon: Zap,
    name: "Марафон",
    duration: "7 дней",
    discount: "-20%",
    description: "Пройди любую игру от начала до конца",
    color: "text-gold",
    featured: true,
  },
  {
    icon: Trophy,
    name: "До победного",
    duration: "10 дней",
    discount: "-25%",
    description: "Максимальная скидка для настоящих геймеров",
    color: "text-gold-light",
  },
];

const Tariffs = () => {
  return (
    <section className="py-24 px-4" id="tariffs">
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
            Специальные тарифы
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Чем дольше аренда — тем выгоднее. Выбери свой формат игры
          </p>
        </motion.div>

        {/* Tariff cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tariffs.map((tariff, index) => (
            <motion.div
              key={tariff.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                tariff.featured
                  ? "bg-plum-light border-gold/40 shadow-glow"
                  : "bg-secondary/30 border-border hover:border-gold/20"
              }`}
            >
              {tariff.featured && (
                <motion.div 
                  className="absolute -top-3 right-6"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="bg-gold text-plum px-3 py-1 rounded-full text-xs font-bold">
                    Выгодно
                  </span>
                </motion.div>
              )}

              <tariff.icon className={`h-10 w-10 ${tariff.color} mb-4`} />
              
              <h3 className="text-xl font-bold text-foreground mb-1">
                {tariff.name}
              </h3>
              
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-extrabold text-gold">
                  {tariff.duration}
                </span>
                <span className="text-lg font-semibold text-green-400">
                  {tariff.discount}
                </span>
              </div>
              
              <p className="text-muted-foreground text-sm mb-6">
                {tariff.description}
              </p>

              <Button 
                variant={tariff.featured ? "gold" : "plum"}
                className="w-full"
              >
                Выбрать
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tariffs;
