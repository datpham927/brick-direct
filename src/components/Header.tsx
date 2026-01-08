import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/products", label: "Sản phẩm" },
    { href: "/contact", label: "Liên hệ" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-card/95 backdrop-blur-xl shadow-premium border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      {/* Top bar with gradient */}
      <div className="bg-gradient-to-r from-earth via-earth/95 to-earth">
        <div className="container flex h-11 items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <motion.a
              href="tel:0901234567"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-primary-foreground/90 hover:text-primary transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                <Phone className="h-3.5 w-3.5" />
              </div>
              <span className="font-medium">0901 234 567</span>
            </motion.a>
            <span className="hidden sm:flex items-center gap-2 text-primary-foreground/70">
              <MapPin className="h-3.5 w-3.5" />
              <span>123 Nguyễn Văn Linh, Q.7, TP.HCM</span>
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="hidden md:flex items-center gap-2 text-primary-foreground/80"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-medium">Giao hàng tận nơi - Giá tốt nhất thị trường</span>
          </motion.div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-terracotta text-primary-foreground font-bold text-xl shadow-glow">
              G
            </div>
            <motion.div
              className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary to-terracotta opacity-30 blur-sm -z-10"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
              Gạch Việt
            </h1>
            <p className="text-xs text-muted-foreground font-medium">Premium Quality</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link
                to={link.href}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive(link.href)
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-terracotta rounded-xl shadow-glow"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* CTA button */}
        <div className="hidden md:flex items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.05, y: -2 }} 
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              asChild 
              className="h-12 px-6 rounded-xl shadow-glow bg-gradient-to-r from-primary to-terracotta hover:from-terracotta hover:to-primary transition-all duration-500"
            >
              <a href="tel:0901234567">
                <Phone className="h-4 w-4 mr-2" />
                <span className="font-semibold">Gọi ngay</span>
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-12 w-12 rounded-xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.div>
        </Button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-border bg-card"
          >
            <nav className="container py-6 flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-5 py-4 rounded-2xl text-base font-semibold transition-all block ${
                      isActive(link.href)
                        ? "bg-gradient-to-r from-primary to-terracotta text-primary-foreground shadow-glow"
                        : "text-foreground hover:bg-accent"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Button 
                  asChild 
                  className="w-full h-14 rounded-2xl text-base shadow-glow bg-gradient-to-r from-primary to-terracotta"
                >
                  <a href="tel:0901234567">
                    <Phone className="h-5 w-5 mr-2" />
                    Gọi đặt hàng ngay
                  </a>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
