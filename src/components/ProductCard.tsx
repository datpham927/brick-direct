import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Eye, Sparkles, ArrowUpRight } from "lucide-react";
import { Product } from "@/data/mockData";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        type: "spring",
        stiffness: 80,
      }}
      whileHover={{ y: -8 }}
      className="group relative bg-card rounded-2xl md:rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 border border-border/50"
    >
      {/* Gradient glow on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-violet/5 via-transparent to-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-secondary">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Availability badge */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.05 }}
        >
          <Badge
            className={`absolute top-3 left-3 md:top-4 md:left-4 px-2.5 md:px-3 py-1 md:py-1.5 text-xs font-semibold backdrop-blur-sm ${
              product.available
                ? "bg-emerald/90 hover:bg-emerald text-white border-emerald/50"
                : "bg-muted-foreground/90 text-white"
            }`}
          >
            {product.available ? (
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Còn hàng
              </span>
            ) : (
              "Hết hàng"
            )}
          </Badge>
        </motion.div>

        {/* Quick actions overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-slate/90 via-slate/50 to-transparent backdrop-blur-[2px] flex items-end justify-center pb-4 md:pb-6 gap-2 md:gap-3"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
          >
            <Button asChild size="sm" className="shadow-lg gradient-hero hover:opacity-90 text-xs md:text-sm">
              <Link to={`/product/${product.id}`}>
                <Eye className="h-3.5 md:h-4 w-3.5 md:w-4 mr-1.5 md:mr-2" />
                Xem chi tiết
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Button asChild size="sm" variant="secondary" className="shadow-lg text-xs md:text-sm">
              <a href="tel:0901234567">
                <Phone className="h-3.5 md:h-4 w-3.5 md:w-4 mr-1.5 md:mr-2" />
                Gọi ngay
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5 relative">
        {/* Size tag */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.05 }}
          className="inline-flex items-center gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 text-xs font-semibold bg-accent text-accent-foreground rounded-lg mb-2 md:mb-3"
        >
          <Sparkles className="h-3 w-3" />
          {product.size}
        </motion.div>

        {/* Name */}
        <h3 className="font-bold text-foreground line-clamp-2 mb-1.5 md:mb-2 group-hover:text-primary transition-colors duration-300 text-base md:text-lg leading-tight">
          <Link to={`/product/${product.id}`} className="flex items-start gap-1">
            {product.name}
            <ArrowUpRight className="h-3.5 md:h-4 w-3.5 md:w-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
          </Link>
        </h3>

        {/* Factory */}
        <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-1 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
          {product.factoryName}
        </p>

        {/* Price section */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-extrabold text-gradient">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-muted-foreground font-medium">/m²</span>
          </div>
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="icon" 
              className="h-10 w-10 md:h-11 md:w-11 rounded-xl shadow-lg gradient-ocean hover:opacity-90 transition-all duration-300"
              asChild
            >
              <a href="tel:0901234567">
                <Phone className="h-4 md:h-5 w-4 md:w-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
