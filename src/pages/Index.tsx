import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { Button } from "@/components/ui/button";
import { products, priceRanges, factories } from "@/data/mockData";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedFactory, setSelectedFactory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.visible) return false;

      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Size filter
      if (selectedSize !== "all" && product.size !== selectedSize) {
        return false;
      }

      // Factory filter
      if (selectedFactory !== "all" && product.factoryId !== selectedFactory) {
        return false;
      }

      // Price range filter
      if (selectedPriceRange !== "all") {
        const range = priceRanges[parseInt(selectedPriceRange)];
        if (product.price < range.min || product.price > range.max) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedSize, selectedFactory, selectedPriceRange]);

  const activeFiltersCount = [
    searchQuery,
    selectedSize !== "all" ? selectedSize : "",
    selectedFactory !== "all" ? selectedFactory : "",
    selectedPriceRange !== "all" ? selectedPriceRange : "",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSize("all");
    setSelectedFactory("all");
    setSelectedPriceRange("all");
  };

  // Featured products (first 4)
  const featuredProducts = products.filter((p) => p.visible).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Products */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Sản phẩm nổi bật
                </h2>
                <p className="text-muted-foreground mt-1">
                  Các loại gạch được ưa chuộng nhất
                </p>
              </div>
              <Button variant="outline" asChild className="hidden sm:flex">
                <Link to="/products">
                  Xem tất cả
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Button variant="outline" asChild>
                <Link to="/products">
                  Xem tất cả sản phẩm
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* All Products with Filters */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Tất cả sản phẩm
              </h2>
              <p className="text-muted-foreground">
                Tìm kiếm và lọc theo nhu cầu của bạn
              </p>
            </div>

            {/* Filters */}
            <div className="mb-8">
              <ProductFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                selectedFactory={selectedFactory}
                setSelectedFactory={setSelectedFactory}
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
                onClearFilters={clearFilters}
                activeFiltersCount={activeFiltersCount}
              />
            </div>

            {/* Results count */}
            <p className="text-sm text-muted-foreground mb-6">
              Hiển thị {filteredProducts.length} sản phẩm
            </p>

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-xl">
                <p className="text-lg text-muted-foreground mb-4">
                  Không tìm thấy sản phẩm phù hợp
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Xóa bộ lọc
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Factory Partners */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Đối tác nhà máy
              </h2>
              <p className="text-muted-foreground">
                Hợp tác với các nhà máy gạch uy tín hàng đầu
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {factories.map((factory) => (
                <div
                  key={factory.id}
                  className="bg-card rounded-xl p-6 text-center shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">
                      {factory.name.charAt(9)}
                    </span>
                  </div>
                  <h3 className="font-medium text-foreground text-sm line-clamp-2">
                    {factory.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 gradient-hero">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Cần tư vấn về sản phẩm?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto">
              Liên hệ ngay với chúng tôi để được tư vấn và báo giá tốt nhất
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <a href="tel:0901234567">Gọi ngay: 0901 234 567</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link to="/contact">Xem địa chỉ</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
