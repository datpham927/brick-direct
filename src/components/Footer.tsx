import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowUpRight, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      }
    },
  };

  const socialLinks = [
    { name: "Facebook", url: "#" },
    { name: "Zalo", url: "#" },
    { name: "Instagram", url: "#" },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-dark" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-terracotta/5 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="relative container py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                className="relative"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-terracotta text-primary-foreground font-bold text-2xl shadow-glow">
                  G
                </div>
                <motion.div
                  className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary to-terracotta opacity-30 blur-sm -z-10"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-primary-foreground">Gạch Việt</h3>
                <p className="text-sm text-primary-foreground/60 font-medium flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Premium Quality
                </p>
              </div>
            </div>
            <p className="text-primary-foreground/70 leading-relaxed mb-6">
              Chuyên phân phối gạch ốp lát cao cấp từ các nhà máy hàng đầu Việt Nam. 
              Cam kết chất lượng và giá tốt nhất.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary-foreground/80 hover:bg-primary/20 hover:text-primary transition-all"
                >
                  <span className="text-xs font-semibold">{social.name.charAt(0)}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold text-primary-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-primary to-terracotta rounded-full" />
              Liên kết
            </h4>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Trang chủ" },
                { to: "/products", label: "Sản phẩm" },
                { to: "/contact", label: "Liên hệ" },
              ].map((link) => (
                <li key={link.to}>
                  <motion.div whileHover={{ x: 8 }} transition={{ duration: 0.2 }}>
                    <Link 
                      to={link.to} 
                      className="text-primary-foreground/70 hover:text-primary transition-colors flex items-center gap-2 group"
                    >
                      <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold text-primary-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-primary to-terracotta rounded-full" />
              Liên hệ
            </h4>
            <ul className="space-y-4">
              <li>
                <motion.a
                  href="tel:0901234567"
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/50">Hotline</p>
                    <p className="font-semibold text-primary-foreground">0901 234 567</p>
                  </div>
                </motion.a>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/50">Email</p>
                  <p className="font-semibold text-primary-foreground">info@gachviet.vn</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/70">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/50">Địa chỉ</p>
                  <p className="text-primary-foreground/80">123 Nguyễn Văn Linh, Q.7, TP.HCM</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Working hours */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold text-primary-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-primary to-terracotta rounded-full" />
              Giờ làm việc
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/50">Thứ 2 - Thứ 7</p>
                  <p className="font-semibold text-primary-foreground">7:30 - 17:30</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-primary-foreground/50">Chủ nhật</p>
                  <p className="font-semibold text-primary-foreground">8:00 - 12:00</p>
                </div>
              </div>
            </div>
            
            {/* Newsletter hint */}
            <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/10">
              <p className="text-sm text-primary-foreground/60">
                Liên hệ ngay để được tư vấn và báo giá tốt nhất!
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="relative border-t border-primary-foreground/10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-primary-foreground/50 flex items-center gap-1">
            © 2025 Gạch Việt. Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> in Vietnam
          </p>
          <div className="flex items-center gap-6 text-sm text-primary-foreground/50">
            <a href="#" className="hover:text-primary transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-primary transition-colors">Điều khoản sử dụng</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
