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
          className="absolute -top-40 -right-40 w-60 md:w-80 h-60 md:h-80 rounded-full bg-violet/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-72 md:w-96 h-72 md:h-96 rounded-full bg-cyan/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="relative container py-12 md:py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand section */}
          <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                className="relative"
              >
                <div className="flex h-12 md:h-14 w-12 md:w-14 items-center justify-center rounded-2xl gradient-hero text-white font-bold text-xl md:text-2xl shadow-glow">
                  G
                </div>
                <motion.div
                  className="absolute -inset-1 rounded-2xl gradient-hero opacity-30 blur-sm -z-10"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Gạch Việt</h3>
                <p className="text-xs md:text-sm text-white/60 font-medium flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-cyan" />
                  Premium Quality
                </p>
              </div>
            </div>
            <p className="text-sm md:text-base text-white/70 leading-relaxed mb-4 md:mb-6">
              Chuyên phân phối gạch ốp lát cao cấp từ các nhà máy hàng đầu Việt Nam. 
              Cam kết chất lượng và giá tốt nhất.
            </p>
            <div className="flex gap-2 md:gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-cyan transition-all"
                >
                  <span className="text-xs font-semibold">{social.name.charAt(0)}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-base md:text-lg font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
              <span className="w-6 md:w-8 h-0.5 gradient-hero rounded-full" />
              Liên kết
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {[
                { to: "/", label: "Trang chủ" },
                { to: "/products", label: "Sản phẩm" },
                { to: "/contact", label: "Liên hệ" },
              ].map((link) => (
                <li key={link.to}>
                  <motion.div whileHover={{ x: 8 }} transition={{ duration: 0.2 }}>
                    <Link 
                      to={link.to} 
                      className="text-sm md:text-base text-white/70 hover:text-cyan transition-colors flex items-center gap-2 group"
                    >
                      <ArrowUpRight className="h-3.5 md:h-4 w-3.5 md:w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-base md:text-lg font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
              <span className="w-6 md:w-8 h-0.5 gradient-hero rounded-full" />
              Liên hệ
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li>
                <motion.a
                  href="tel:0901234567"
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2.5 md:gap-3 text-white/70 hover:text-cyan transition-colors group"
                >
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center group-hover:bg-cyan/20 transition-colors">
                    <Phone className="h-3.5 md:h-4 w-3.5 md:w-4 text-cyan" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-white/50">Hotline</p>
                    <p className="text-sm md:text-base font-semibold text-white">0901 234 567</p>
                  </div>
                </motion.a>
              </li>
              <li className="flex items-center gap-2.5 md:gap-3 text-white/70">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center">
                  <Mail className="h-3.5 md:h-4 w-3.5 md:w-4 text-violet-light" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-white/50">Email</p>
                  <p className="text-sm md:text-base font-semibold text-white">info@gachviet.vn</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5 md:gap-3 text-white/70">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-rose/10 border border-rose/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-3.5 md:h-4 w-3.5 md:w-4 text-rose" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-white/50">Địa chỉ</p>
                  <p className="text-xs md:text-sm text-white/80">123 Nguyễn Văn Linh, Q.7, TP.HCM</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Working hours */}
          <motion.div variants={itemVariants}>
            <h4 className="text-base md:text-lg font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
              <span className="w-6 md:w-8 h-0.5 gradient-hero rounded-full" />
              Giờ làm việc
            </h4>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-2.5 md:gap-3 text-white/70">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-emerald/10 border border-emerald/20 flex items-center justify-center">
                  <Clock className="h-3.5 md:h-4 w-3.5 md:w-4 text-emerald" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-white/50">Thứ 2 - Thứ 7</p>
                  <p className="text-sm md:text-base font-semibold text-white">7:30 - 17:30</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 md:gap-3 text-white/70">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-amber/10 border border-amber/20 flex items-center justify-center">
                  <Clock className="h-3.5 md:h-4 w-3.5 md:w-4 text-amber" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs text-white/50">Chủ nhật</p>
                  <p className="text-sm md:text-base font-semibold text-white">8:00 - 12:00</p>
                </div>
              </div>
            </div>
            
            {/* Newsletter hint */}
            <div className="mt-4 md:mt-6 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10">
              <p className="text-xs md:text-sm text-white/60">
                Liên hệ ngay để được tư vấn và báo giá tốt nhất!
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="container py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4"
        >
          <p className="text-xs md:text-sm text-white/50 flex items-center gap-1">
            © 2025 Gạch Việt. Made with <Heart className="h-3.5 md:h-4 w-3.5 md:w-4 text-rose fill-rose" /> in Vietnam
          </p>
          <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm text-white/50">
            <a href="#" className="hover:text-cyan transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-cyan transition-colors">Điều khoản sử dụng</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
