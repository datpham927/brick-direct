import { motion, Variants } from "framer-motion";
import { ArrowRight, Phone, Shield, Truck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-tiles.jpg";

const HeroSection = () => {
  const features = [
    { icon: Truck, text: "Giao hàng tận nơi" },
    { icon: Shield, text: "Bảo hành chính hãng" },
    { icon: Award, text: "Chất lượng cao cấp" },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden flex items-center">
      {/* Background Image with Overlay */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={heroImage}
          alt="Showroom gạch cao cấp"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-earth/95 via-earth/80 to-earth/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-earth/60 via-transparent to-transparent" />
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative container py-20 md:py-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Badge */}
          <motion.div variants={badgeVariants}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sand/20 backdrop-blur-sm text-sand text-sm mb-6 border border-sand/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sand opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sand"></span>
              </span>
              Nhà phân phối gạch chính hãng
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            <span className="text-sand italic">Gạch Cao Cấp</span>
            <br />
            <span className="text-sand/90 italic">Giá Tốt Nhất</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-sand/80 mb-8 max-w-xl leading-relaxed"
          >
            Chuyên cung cấp các loại gạch ốp lát từ các nhà máy hàng đầu Việt Nam. 
            Giao hàng trực tiếp từ nhà máy - Không qua trung gian.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button size="lg" variant="secondary" className="shadow-lg" asChild>
                <Link to="/products">
                  Xem sản phẩm
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-sand/40 text-sand hover:bg-sand/10 backdrop-blur-sm"
                asChild
              >
                <a href="tel:0901234567">
                  <Phone className="mr-2 h-4 w-4" />
                  0901 234 567
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Features */}
          <div className="flex flex-wrap gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, x: 5 }}
                className="flex items-center gap-2 text-sand/90"
              >
                <div className="w-10 h-10 rounded-full bg-sand/10 backdrop-blur-sm flex items-center justify-center border border-sand/20">
                  <feature.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
