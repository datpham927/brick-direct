import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Eye } from "lucide-react";
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ y: -8 }}
      className="group relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        {/* Availability badge */}
        <Badge
          className={`absolute top-3 left-3 ${
            product.available
              ? "bg-green-500 hover:bg-green-600"
              : "bg-stone hover:bg-stone"
          }`}
        >
          {product.available ? "Còn hàng" : "Hết hàng"}
        </Badge>

        {/* Quick actions overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center gap-3"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Button asChild size="sm" variant="secondary" className="shadow-lg">
              <Link to={`/product/${product.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                Xem chi tiết
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Size tag */}
        <motion.span
          whileHover={{ scale: 1.05 }}
          className="inline-block px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded mb-2"
        >
          {product.size}
        </motion.span>

        {/* Name */}
        <h3 className="font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Factory */}
        <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
          {product.factoryName}
        </p>

        {/* Price and action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-muted-foreground">/m²</span>
          </div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button size="sm" variant="outline" asChild>
              <a href="tel:0901234567">
                <Phone className="h-3.5 w-3.5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
