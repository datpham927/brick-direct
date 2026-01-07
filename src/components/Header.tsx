import { motion } from "framer-motion";
import { Phone, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
      className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
    >
      {/* Top bar */}
      <div className="gradient-hero">
        <div className="container flex h-10 items-center justify-between text-sm text-primary-foreground">
          <div className="flex items-center gap-4">
            <motion.a
              href="tel:0901234567"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>0901 234 567</span>
            </motion.a>
            <span className="hidden sm:flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>123 Nguyễn Văn Linh, Q.7, TP.HCM</span>
            </span>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden md:block"
          >
            Giao hàng tận nơi - Giá tốt nhất thị trường
          </motion.span>
        </div>
      </div>

      {/* Main nav */}
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl"
          >
            G
          </motion.div>
          <div>
            <h1 className="text-lg font-bold text-foreground leading-tight">Gạch Việt</h1>
            <p className="text-xs text-muted-foreground">Chất lượng - Uy tín</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                  isActive(link.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* CTA button */}
        <div className="hidden md:flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button asChild>
              <a href="tel:0901234567">
                <Phone className="h-4 w-4 mr-2" />
                Gọi ngay
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.div>
        </Button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden overflow-hidden border-t border-border bg-card"
      >
        <nav className="container py-4 flex flex-col gap-2">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors block ${
                  isActive(link.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : -20 }}
            transition={{ delay: 0.3 }}
          >
            <Button asChild className="mt-2 w-full">
              <a href="tel:0901234567">
                <Phone className="h-4 w-4 mr-2" />
                Gọi đặt hàng ngay
              </a>
            </Button>
          </motion.div>
        </nav>
      </motion.div>
    </motion.header>
  );
};

export default Header;
