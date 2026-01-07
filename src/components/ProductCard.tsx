import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Eye } from "lucide-react";
import { Product } from "@/data/mockData";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
        <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Button asChild size="sm" variant="secondary" className="shadow-lg">
            <Link to={`/product/${product.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              Xem chi tiết
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Size tag */}
        <span className="inline-block px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded mb-2">
          {product.size}
        </span>

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
          <Button size="sm" variant="outline" asChild>
            <a href="tel:0901234567">
              <Phone className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
