/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { Button } from "@/components/ui/button";

import { sanPhamPublicService } from "@/services/sanPhamPublic.service";
import { nhaMayPublicService } from "@/services/nhaMayPublic.service";
import { NhaMayPublic, SanPham } from "@/types";
const priceRanges = [
  { label: "Dưới 150.000đ", min: 0, max: 150000 },
  { label: "150.000đ - 250.000đ", min: 150000, max: 250000 },
  { label: "Trên 250.000đ", min: 250000, max: 1000000 },
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedFactory, setSelectedFactory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");

  const [products, setProducts] = useState<SanPham[]>([]);
  const [factories, setFactories] = useState<NhaMayPublic[]>([]);
  const [loading, setLoading] = useState(true);

  /* ===== LOAD FACTORIES PUBLIC ===== */
  useEffect(() => {
    const fetchFactories = async () => {
      try {
        const res: any = await nhaMayPublicService.danhSach();
        setFactories(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFactories();
  }, []);

  /* ===== LOAD PRODUCTS PUBLIC (FILTER ON SERVER) ===== */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res: any = await sanPhamPublicService.danhSach({
          tenSanPham: searchQuery || undefined,
          kichThuoc: selectedSize !== "all" ? selectedSize : undefined,
          nhaMayId: selectedFactory !== "all" ? selectedFactory : undefined,
        });
        setProducts(res.data || []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, selectedSize, selectedFactory]);

  /* ===== FILTER PRICE RANGE ON CLIENT (GIỮ NGUYÊN LOGIC CŨ) ===== */
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedPriceRange !== "all") {
        const range = priceRanges[parseInt(selectedPriceRange)];
        if (p.giaBanMacDinh < range.min || p.giaBanMacDinh > range.max) {
          return false;
        }
      }
      return true;
    });
  }, [products, selectedPriceRange]);

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
                factories={factories}
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
              {loading
                ? "Đang tải..."
                : `Hiển thị ${filteredProducts.length} sản phẩm`}
            </p>

            {/* Products grid */}
            {!loading && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p._id}
                    product={{
                      id: p._id,
                      name: p.tenSanPham,
                      image: p.hinhAnh,
                      size: p.kichThuoc,
                      price: p.giaBanMacDinh,
                      factoryId: p.nhaMayId?._id || "",
                      factoryName: p.nhaMayId?.tenNhaMay || "",
                      available: p.tinhTrangSanXuat === "CON_SAN_XUAT",
                      description: p.moTa || "",
                      visible: true,
                    }}
                  />
                ))}
              </div>
            ) : !loading ? (
              <div className="text-center py-16 bg-muted rounded-xl">
                <p className="text-lg text-muted-foreground mb-4">
                  Không tìm thấy sản phẩm phù hợp
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Xóa bộ lọc
                </Button>
              </div>
            ) : (
              <div className="text-center py-16 bg-muted rounded-xl">
                <p className="text-lg text-muted-foreground">
                  Đang tải dữ liệu...
                </p>
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
