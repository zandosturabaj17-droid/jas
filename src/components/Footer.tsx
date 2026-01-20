import { motion } from "framer-motion";
import { Instagram, MessageCircle, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img src="/logo.png" alt="JAS Logo" className="h-24 w-auto mb-4" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Премиальная аренда игровых консолей с доставкой по городу. Играй без границ.
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-foreground font-semibold mb-4">Быстрые ссылки</h4>
            <ul className="space-y-3">
              {["Каталог", "Тарифы", "Как это работает", "О нас"].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-gold transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-foreground font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:+77001234567" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors text-sm"
                >
                  <Phone className="h-4 w-4" />
                  +7 700 123 45 67
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors text-sm"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors text-sm"
                >
                  <Instagram className="h-4 w-4" />
                  @jas.rental
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © 2024 JAS. Все права защищены.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-gold transition-colors text-xs">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-muted-foreground hover:text-gold transition-colors text-xs">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
