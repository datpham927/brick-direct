import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { Button } from "@/components/ui/button";
import { products, priceRanges } from "@/data/mockData";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedFactory, setSelectedFactory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.visible) return false;

      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      if (selectedSize !== "all" && product.size !== selectedSize) {
        return false;
      }

      if (selectedFactory !== "all" && product.factoryId !== selectedFactory) {
        return false;
      }

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page header */}
        <section className="bg-muted py-12">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Sản phẩm gạch
            </h1>
            <p className="text-muted-foreground">
              Khám phá bộ sưu tập gạch ốp lát cao cấp từ các nhà máy uy tín
            </p>
          </div>
        </section>

        {/* Products section */}
        <section className="py-12">
          <div className="container">
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
              <div className="text-center py-16 bg-muted rounded-xl">
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
      </main>

      <Footer />
    </div>
  );
};

export default Products;
