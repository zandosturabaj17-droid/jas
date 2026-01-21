import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import OrderDialog from "./OrderDialog";

interface ConsoleCardProps {
  name: string;
  price: number;
  image: string;
  features: string[];
  popular?: boolean;
  delay?: number;
}

const ConsoleCard = ({ name, price, image, features, popular = false, delay = 0 }: ConsoleCardProps) => {
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <>
      <OrderDialog 
        open={orderOpen} 
        onOpenChange={setOrderOpen} 
        consoleName={name}
        price={price}
      />
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className={`relative rounded-3xl p-8 transition-all duration-300 ${
        popular 
          ? "bg-card-gradient shadow-card border-2 border-gold/30" 
          : "bg-secondary/40 backdrop-blur-sm border border-border hover:border-gold/20"
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-gold to-gold-light text-plum px-4 py-1 rounded-full text-sm font-bold">
            Популярный
          </span>
        </div>
      )}

      {/* Console image placeholder */}
      <div className="relative w-full h-48 mb-6 flex items-center justify-center">
        <motion.div 
          className="w-40 h-40 rounded-2xl bg-plum/10 flex items-center justify-center overflow-hidden"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {image.includes('/') || image.includes('.') ? (
            <img src={image} alt={name} className="w-full h-full object-contain" />
          ) : (
            <span className="text-6xl">{image}</span>
          )}
        </motion.div>
      </div>

      {/* Console name */}
      <h3 className={`text-2xl font-bold mb-2 ${popular ? "text-plum" : "text-foreground"}`}>
        {name}
      </h3>

      {/* Price */}
      <div className="mb-6">
        <span className={`text-4xl font-extrabold ${popular ? "text-plum" : "text-gold"}`}>
          {price.toLocaleString()}₸
        </span>
        <span className={`text-sm ml-2 ${popular ? "text-plum/60" : "text-muted-foreground"}`}>
          / сутки
        </span>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className={`flex items-center gap-3 text-sm ${popular ? "text-plum/80" : "text-muted-foreground"}`}>
            <Check className={`h-4 w-4 flex-shrink-0 ${popular ? "text-gold" : "text-gold"}`} />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Button 
        variant={popular ? "gold" : "outline"} 
        className="w-full"
        size="lg"
        onClick={() => setOrderOpen(true)}
      >
        Арендовать
      </Button>
    </motion.div>
    </>
  );
};

export default ConsoleCard;
