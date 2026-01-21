import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";

const navLinks = [
  { label: "Каталог", href: "#catalog" },
  { label: "Тарифы", href: "#tariffs" },
  { label: "Как это работает", href: "#how-it-works" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="JAS Logo" className="h-14 w-auto" />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="minimal" size="sm" onClick={() => navigate("/login")}>
              <User className="h-4 w-4 mr-2" />
              Войти
            </Button>
            <Button variant="gold" size="sm" onClick={() => navigate("/rent")}>
              Заказать
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-foreground hover:text-gold transition-colors text-lg font-medium"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border flex flex-col gap-3">
                <Button variant="plum" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Войти
                </Button>
                <Button variant="gold" className="w-full" onClick={() => {
                  navigate("/rent");
                  setIsOpen(false);
                }}>
                  Заказать
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
