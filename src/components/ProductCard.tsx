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
      whileHover={{ y: -12 }}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 border border-border/50"
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-terracotta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/50">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Availability badge with animation */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.05 }}
        >
          <Badge
            className={`absolute top-4 left-4 px-3 py-1.5 text-xs font-semibold backdrop-blur-sm ${
              product.available
                ? "bg-emerald-500/90 hover:bg-emerald-500 text-white border-emerald-400/50"
                : "bg-stone/90 hover:bg-stone text-white"
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
          className="absolute inset-0 bg-gradient-to-t from-earth/80 via-earth/40 to-transparent backdrop-blur-[2px] flex items-end justify-center pb-6 gap-3"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
          >
            <Button asChild size="sm" className="shadow-lg bg-primary hover:bg-primary/90">
              <Link to={`/product/${product.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                Xem chi tiết
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Button asChild size="sm" variant="secondary" className="shadow-lg">
              <a href="tel:0901234567">
                <Phone className="h-4 w-4 mr-2" />
                Gọi ngay
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 relative">
        {/* Size tag with gradient */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.05 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-accent to-accent/70 text-accent-foreground rounded-lg mb-3"
        >
          <Sparkles className="h-3 w-3" />
          {product.size}
        </motion.div>

        {/* Name with hover effect */}
        <h3 className="font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-300 text-lg leading-tight">
          <Link to={`/product/${product.id}`} className="flex items-start gap-1">
            {product.name}
            <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
          </Link>
        </h3>

        {/* Factory with icon */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-1 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
          {product.factoryName}
        </p>

        {/* Price section with premium styling */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold text-gradient-gold">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-muted-foreground font-medium">/m²</span>
          </div>
          <motion.div 
            whileHover={{ scale: 1.15, rotate: 5 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="icon" 
              className="h-11 w-11 rounded-xl shadow-lg bg-gradient-to-br from-primary to-terracotta hover:from-terracotta hover:to-primary transition-all duration-300"
              asChild
            >
              <a href="tel:0901234567">
                <Phone className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
