import { motion, Variants } from "framer-motion";
import { ArrowRight, Phone, Shield, Truck, Award, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-tiles.jpg";

const HeroSection = () => {
  const features = [
    { icon: Truck, text: "Giao hàng tận nơi", delay: 0 },
    { icon: Shield, text: "Bảo hành chính hãng", delay: 0.1 },
    { icon: Award, text: "Chất lượng cao cấp", delay: 0.2 },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-[700px] lg:min-h-[800px] overflow-hidden flex items-center">
      {/* Background Image with Premium Overlay */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0"
      >
        <img
          src={heroImage}
          alt="Showroom gạch cao cấp"
          className="w-full h-full object-cover"
        />
        {/* Multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-earth via-earth/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-earth via-earth/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-terracotta/10" />
      </motion.div>

      {/* Animated Particles/Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-terracotta/10 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Content */}
      <div className="relative container py-20 md:py-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Premium Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass border-primary/30 text-primary-foreground"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-primary" />
              </motion.div>
              <span className="text-sm font-medium tracking-wide">
                Nhà phân phối gạch chính hãng #1 Việt Nam
              </span>
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Main Heading with Gradient */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              <motion.span
                className="block text-primary-foreground"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Gạch Cao Cấp
              </motion.span>
              <span className="block mt-2 text-gradient-gold">
                Giá Tốt Nhất
              </span>
            </h1>
          </motion.div>

          {/* Description with better styling */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-primary-foreground/80 mb-10 max-w-xl leading-relaxed font-light"
          >
            Chuyên cung cấp các loại gạch ốp lát từ các nhà máy hàng đầu.{" "}
            <span className="text-primary font-medium">Giao hàng trực tiếp</span> - Không qua trung gian.
          </motion.p>

          {/* Premium CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-14">
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg" 
                className="h-14 px-8 text-base font-semibold shadow-glow bg-gradient-to-r from-primary to-terracotta hover:from-terracotta hover:to-primary transition-all duration-500"
                asChild
              >
                <Link to="/products">
                  Khám phá ngay
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base font-semibold border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm"
                asChild
              >
                <a href="tel:0901234567">
                  <Phone className="mr-2 h-5 w-5" />
                  0901 234 567
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Premium Feature Cards */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + feature.delay }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                }}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl glass cursor-pointer group"
              >
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-terracotta/30 flex items-center justify-center group-hover:from-primary/50 group-hover:to-terracotta/50 transition-all duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </motion.div>
                <span className="text-sm font-semibold text-primary-foreground">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating decoration on right side */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2"
        >
          <div className="w-72 h-72 rounded-3xl glass-dark p-6 rotate-12">
            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/40 to-terracotta/40 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-6xl font-bold text-primary-foreground/80"
              >
                G
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto fill-background">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
