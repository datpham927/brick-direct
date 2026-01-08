import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Sparkles, Building2, Trophy, Users, Package, TrendingUp } from "lucide-react";
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

  const featuredProducts = products.filter((p) => p.visible).slice(0, 4);

  const stats = [
    { icon: Package, value: "500+", label: "Sản phẩm", color: "from-blue-500 to-cyan-500" },
    { icon: Users, value: "10K+", label: "Khách hàng", color: "from-violet-500 to-purple-500" },
    { icon: Building2, value: "50+", label: "Nhà máy", color: "from-amber-500 to-orange-500" },
    { icon: TrendingUp, value: "99%", label: "Hài lòng", color: "from-emerald-500 to-teal-500" },
  ];

  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Section */}
        <section className="py-16 bg-card relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-terracotta/5" />
          <div className="container relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative group"
                >
                  <div className="p-6 rounded-3xl bg-background border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-500">
                    <motion.div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <stat.icon className="h-7 w-7 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-extrabold text-foreground mb-1">{stat.value}</h3>
                    <p className="text-muted-foreground font-medium">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 bg-background relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-terracotta/5 blur-3xl" />
          </div>
          
          <div className="container relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={sectionVariants}
              className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
            >
              <motion.div variants={titleVariants}>
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    Bán chạy nhất
                  </span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
                  Sản phẩm <span className="text-gradient-gold">nổi bật</span>
                </h2>
                <p className="text-muted-foreground mt-3 max-w-lg text-lg">
                  Khám phá bộ sưu tập gạch cao cấp được khách hàng yêu thích nhất
                </p>
              </motion.div>
              <motion.div variants={titleVariants}>
                <Button variant="outline" size="lg" asChild className="group h-12 px-6 rounded-xl border-2">
                  <Link to="/products">
                    <span className="font-semibold">Xem tất cả</span>
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* All Products with Filters */}
        <section className="py-24 bg-muted/30 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/50 to-transparent" />
          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3">
                Tất cả <span className="text-gradient-gold">sản phẩm</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Tìm kiếm và lọc theo nhu cầu của bạn
              </p>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-10"
            >
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
            </motion.div>

            {/* Results count */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-muted-foreground mb-8 font-medium"
            >
              Hiển thị <span className="text-foreground font-bold">{filteredProducts.length}</span> sản phẩm
            </motion.p>

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 bg-card rounded-3xl border border-border/50 shadow-card"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Package className="h-10 w-10 text-muted-foreground" />
                </div>
                <p className="text-xl text-muted-foreground mb-6">
                  Không tìm thấy sản phẩm phù hợp
                </p>
                <Button variant="outline" onClick={clearFilters} size="lg" className="h-12 px-8 rounded-xl">
                  Xóa bộ lọc
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Factory Partners */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-terracotta/5 blur-3xl" />
          </div>
          
          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Trophy className="h-4 w-4" />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  Đối tác tin cậy
                </span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3">
                Nhà máy <span className="text-gradient-gold">hợp tác</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                Hợp tác với các nhà máy gạch uy tín hàng đầu Việt Nam
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {factories.map((factory, index) => (
                <motion.div
                  key={factory.id}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-card rounded-3xl p-8 text-center shadow-card hover:shadow-card-hover transition-all duration-500 border border-border/50 group-hover:border-primary/30">
                    <motion.div
                      whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary/20 to-terracotta/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-terracotta/30 transition-all"
                    >
                      <span className="text-3xl font-bold text-gradient-gold">
                        {factory.name.charAt(9)}
                      </span>
                    </motion.div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {factory.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 gradient-dark" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-terracotta/10 blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
          </div>
          
          <div className="relative container text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary-foreground mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">Tư vấn miễn phí</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-6 leading-tight">
                Cần tư vấn về <span className="text-gradient-gold">sản phẩm?</span>
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
                Liên hệ ngay với đội ngũ chuyên gia của chúng tôi để được tư vấn và báo giá tốt nhất
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    size="lg" 
                    className="h-14 px-10 text-base shadow-glow bg-gradient-to-r from-primary to-terracotta hover:from-terracotta hover:to-primary rounded-2xl"
                    asChild
                  >
                    <a href="tel:0901234567">
                      Gọi ngay: 0901 234 567
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-10 text-base border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-2xl"
                    asChild
                  >
                    <Link to="/contact">Xem địa chỉ showroom</Link>
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
