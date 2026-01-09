/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Sparkles, Building2 } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import { Button } from "@/components/ui/button";

import { sanPhamPublicService } from "@/services/sanPhamPublic.service";
import { NhaMayPublic, SanPham } from "@/types";
import { factories } from "@/data/mockData";
import { nhaMayPublicService } from "@/services/nhaMayPublic.service";

/* ===== GIỮ NGUYÊN PRICE RANGE ===== */
const priceRanges = [
  { min: 0, max: 150000 },
  { min: 150000, max: 250000 },
  { min: 250000, max: 1000000 },
];

const Index = () => {
  /* ===== FILTER STATE (GIỮ NGUYÊN UI) ===== */
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedFactory, setSelectedFactory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");

  /* ===== DATA STATE ===== */
  const [products, setProducts] = useState<SanPham[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<SanPham[]>([]);
  const [factories, setFactories] = useState<NhaMayPublic[]>([]);
  useEffect(() => {
    const fetchFactories = async () => {
      try {
        const res: any = await nhaMayPublicService.danhSach();
        setFactories(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFactories();
  }, []);

  /* ===== API: TOP LƯỢT XEM ===== */
  useEffect(() => {
    const fetchTopLuotXem = async () => {
      try {
        const res: any = await sanPhamPublicService.topLuotXem();
        setFeaturedProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTopLuotXem();
  }, []);

  /* ===== API: DANH SÁCH CÔNG KHAI ===== */
  useEffect(() => {
    const fetchDanhSach = async () => {
      try {
        const res: any = await sanPhamPublicService.danhSach({
          tenSanPham: searchQuery || undefined,
          kichThuoc: selectedSize !== "all" ? selectedSize : undefined,
          nhaMayId: selectedFactory !== "all" ? selectedFactory : undefined,
        });
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDanhSach();
  }, [searchQuery, selectedSize, selectedFactory]);

  /* ===== FILTER (GIỮ NGUYÊN LOGIC CŨ) ===== */
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

  /* ===== ANIMATION (GIỮ NGUYÊN) ===== */
  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ===== HERO ===== */}
        <HeroSection />

        {/* ===== SẢN PHẨM NỔI BẬT ===== */}
        <section className="py-20 bg-background">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
              className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
            >
              <motion.div variants={titleVariants}>
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-sm font-medium uppercase tracking-wider">
                    Bán chạy nhất
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Sản phẩm nổi bật
                </h2>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Các loại gạch được khách hàng ưa chuộng nhất tại showroom
                </p>
              </motion.div>

              <motion.div variants={titleVariants}>
                <Button variant="outline" asChild className="group">
                  <Link to="/products">
                    Xem tất cả
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((p, index) => (
                <ProductCard
                  key={p._id}
                  index={index}
                  product={{
                    id: p._id,
                    name: p.tenSanPham,
                    image: p.hinhAnh,
                    size: p.kichThuoc,
                    price: p.giaBanMacDinh,
                    factoryName: p.nhaMayId.tenNhaMay,
                    views: p.luotXem,
                    available: p.tinhTrangSanXuat === "CON_SAN_XUAT",
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ===== TẤT CẢ SẢN PHẨM ===== */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Tất cả sản phẩm
              </h2>
              <p className="text-muted-foreground">
                Tìm kiếm và lọc theo nhu cầu của bạn
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
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
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-muted-foreground mb-6"
            >
              Hiển thị {filteredProducts.length} sản phẩm
            </motion.p>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((p, index) => (
                  <ProductCard
                    key={p._id}
                    index={index}
                    product={{
                      id: p._id,
                      name: p.tenSanPham,
                      image: p.hinhAnh,
                      size: p.kichThuoc,
                      price: p.giaBanMacDinh,
                      factoryName: p.nhaMayId.tenNhaMay,
                      views: p.luotXem,
                      available: p.tinhTrangSanXuat === "CON_SAN_XUAT",
                    }}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 bg-card rounded-xl"
              >
                <p className="text-lg text-muted-foreground mb-4">
                  Không tìm thấy sản phẩm phù hợp
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Xóa bộ lọc
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* ===== FACTORY + CTA ===== */}
        {/* Factory Partners */}
        <section className="py-20 bg-background overflow-hidden">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-2 text-primary mb-2">
                <Building2 className="h-5 w-5" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Đối tác tin cậy
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Nhà máy hợp tác
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Hợp tác với các nhà máy gạch uy tín hàng đầu Việt Nam
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {factories.map((factory, index) => (
                <motion.div
                  key={factory._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-card rounded-xl p-6 text-center shadow-card hover:shadow-card-hover transition-shadow duration-300 border border-border/50"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center"
                  >
                    <span className="text-2xl font-bold text-primary">
                      {factory.tenNhaMay.charAt(0)}
                    </span>
                  </motion.div>

                  <h3 className="font-medium text-foreground text-sm line-clamp-2">
                    {factory.tenNhaMay}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 gradient-hero" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            viewport={{ once: true }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative container text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Cần tư vấn về sản phẩm?
              </h2>
              <p className="text-primary-foreground/90 mb-8 max-w-xl mx-auto text-lg">
                Liên hệ ngay với chúng tôi để được tư vấn và báo giá tốt nhất
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    className="shadow-lg"
                    asChild
                  >
                    <a href="tel:0901234567">Gọi ngay: 0901 234 567</a>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                    asChild
                  >
                    <Link to="/contact">Xem địa chỉ</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
