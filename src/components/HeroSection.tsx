import { motion, Variants } from "framer-motion";
import { ArrowRight, Phone, Shield, Truck, Award, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-tiles.jpg";

const HeroSection = () => {
  const features = [
    { icon: Truck, text: "Giao hàng tận nơi", color: "from-cyan to-teal" },
    { icon: Shield, text: "Bảo hành chính hãng", color: "from-violet to-indigo" },
    { icon: Award, text: "Chất lượng cao cấp", color: "from-rose to-amber" },
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
    <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] overflow-hidden flex items-center">
      {/* Background Image with Modern Overlay */}
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
        {/* Modern gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate via-slate/95 to-slate/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate via-slate/50 to-transparent" />
        <div className="absolute inset-0 gradient-mesh opacity-60" />
      </motion.div>

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 md:top-20 md:right-20 w-48 md:w-96 h-48 md:h-96 rounded-full bg-violet/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 md:left-20 w-32 md:w-64 h-32 md:h-64 rounded-full bg-cyan/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-40 md:w-80 h-40 md:h-80 rounded-full bg-rose/10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative container py-12 md:py-20 lg:py-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Premium Badge */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-2.5 rounded-full glass border-white/30"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-cyan" />
              </motion.div>
              <span className="text-xs md:text-sm font-medium tracking-wide text-white">
                Nhà phân phối gạch chính hãng #1 Việt Nam
              </span>
              <div className="hidden sm:flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-amber text-amber" />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={itemVariants} className="mb-4 md:mb-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              <span className="block text-white">
                Gạch Cao Cấp
              </span>
              <span className="block mt-2 text-gradient">
                Giá Tốt Nhất
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-8 md:mb-10 max-w-xl leading-relaxed font-light"
          >
            Chuyên cung cấp các loại gạch ốp lát từ các nhà máy hàng đầu.{" "}
            <span className="text-cyan font-medium">Giao hàng trực tiếp</span> - Không qua trung gian.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-10 md:mb-14">
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Button 
                size="lg" 
                className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 text-sm md:text-base font-semibold shadow-glow gradient-hero hover:opacity-90 transition-all duration-500"
                asChild
              >
                <Link to="/products">
                  Khám phá ngay
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  >
                    <ArrowRight className="h-4 md:h-5 w-4 md:w-5" />
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-12 md:h-14 px-6 md:px-8 text-sm md:text-base font-semibold border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                asChild
              >
                <a href="tel:0901234567">
                  <Phone className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                  0901 234 567
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.03, 
                  y: -5,
                }}
                className="flex items-center gap-3 px-4 md:px-5 py-3 md:py-4 rounded-2xl glass-dark cursor-pointer group"
              >
                <motion.div 
                  className={`w-10 md:w-12 h-10 md:h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="h-5 md:h-6 w-5 md:w-6 text-white" />
                </motion.div>
                <span className="text-sm md:text-base font-semibold text-white">
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
          className="hidden xl:block absolute right-10 top-1/2 -translate-y-1/2"
        >
          <div className="w-72 h-72 rounded-3xl glass-dark p-6 rotate-12">
            <div className="w-full h-full rounded-2xl gradient-ocean opacity-60 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-6xl font-bold text-white/80"
              >
                G
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto fill-background">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
