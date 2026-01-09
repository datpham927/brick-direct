/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Eye } from "lucide-react";

interface ProductCardProps {
  product: any;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

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
      className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
    >
      {/* ===== IMAGE ===== */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Status */}
        <Badge
          className={`absolute top-3 left-3 ${
            product.available
              ? "bg-green-500 hover:bg-green-600"
              : "bg-destructive hover:bg-destructive"
          }`}
        >
          {product.available ? "Còn sản xuất" : "Ngừng sản xuất"}
        </Badge>

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
        >
          <Button asChild size="sm" variant="secondary">
            <Link to={`/product/${product.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              Xem chi tiết
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="p-4">
        {/* Size */}
        <span className="inline-block mb-2 px-2 py-1 text-xs rounded bg-accent">
          {product.size}
        </span>

        {/* Name */}
        <h3 className="font-semibold line-clamp-2 mb-1 hover:text-primary">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Factory */}
        <p className="text-xs text-muted-foreground mb-2">
          {product.factoryName}
        </p>

        {/* Views */}
        <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
          <Eye className="h-3 w-3" />
          {product.views} lượt xem
        </p>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-muted-foreground"> /m²</span>
          </div>

          <Button size="sm" variant="outline" asChild>
            <a href="tel:0901234567">
              <Phone className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
