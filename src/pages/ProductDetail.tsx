import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone, MapPin, Building2, Ruler, Tag, CheckCircle, XCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { products, factories } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const factory = factories.find((f) => f.id === product?.factoryId);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Related products (same factory, excluding current)
  const relatedProducts = products
    .filter((p) => p.id !== id && p.factoryId === product?.factoryId && p.visible)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Không tìm thấy sản phẩm
            </h1>
            <Button asChild>
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại danh sách
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted py-4">
          <div className="container">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground">
                Trang chủ
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link to="/products" className="text-muted-foreground hover:text-foreground">
                Sản phẩm
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium line-clamp-1">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Product detail */}
        <section className="py-12">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Image */}
              <div className="animate-fade-in">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    className={`absolute top-4 left-4 ${
                      product.available
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-stone hover:bg-stone"
                    }`}
                  >
                    {product.available ? "Còn hàng" : "Hết hàng"}
                  </Badge>
                </div>
              </div>

              {/* Info */}
              <div className="animate-slide-in">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-accent text-accent-foreground rounded-lg">
                    {product.size}
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Price */}
                <div className="bg-accent rounded-xl p-6 mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Giá bán</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-muted-foreground">/m²</span>
                  </div>
                </div>

                {/* Specs */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Ruler className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Kích thước</p>
                      <p className="font-medium text-foreground">{product.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Nhà máy sản xuất</p>
                      <p className="font-medium text-foreground">{product.factoryName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.available ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-stone" />
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">Tình trạng</p>
                      <p className="font-medium text-foreground">
                        {product.available ? "Còn hàng - Sẵn sàng giao" : "Tạm hết hàng"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="flex-1" asChild>
                    <a href="tel:0901234567">
                      <Phone className="mr-2 h-5 w-5" />
                      Gọi đặt hàng ngay
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/contact">
                      <MapPin className="mr-2 h-5 w-5" />
                      Xem địa chỉ
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Factory info */}
        {factory && (
          <section className="py-12 bg-muted">
            <div className="container">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Thông tin nhà máy
              </h2>
              <div className="bg-card rounded-xl p-6 shadow-card">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {factory.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{factory.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <a href={`tel:${factory.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                          {factory.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="py-12">
            <div className="container">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Sản phẩm cùng nhà máy
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
