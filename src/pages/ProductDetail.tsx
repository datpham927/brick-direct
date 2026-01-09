/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  MapPin,
  Building2,
  Ruler,
  CheckCircle,
  XCircle,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";

import { sanPhamPublicService } from "@/services/sanPhamPublic.service";
import { SanPham } from "@/types";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<SanPham | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<SanPham[]>([]);
  const [loading, setLoading] = useState(true);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  /* ================= FETCH CHI TIẾT (+1 VIEW) ================= */
  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        const res: any = await sanPhamPublicService.chiTiet(id);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  /* ================= FETCH SẢN PHẨM LIÊN QUAN ================= */
  useEffect(() => {
    if (!product) return;

    const fetchRelated = async () => {
      const res: any = await sanPhamPublicService.danhSach({
        nhaMayId: product.nhaMayId._id,
      });

      const filtered = res.data
        .filter((p: SanPham) => p._id !== product._id)
        .slice(0, 4);

      setRelatedProducts(filtered);
    };

    fetchRelated();
  }, [product]);

  /* ================= NOT FOUND ================= */
  if (!loading && !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
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

  if (!product) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ================= BREADCRUMB ================= */}
        <div className="bg-muted py-4">
          <div className="container">
            <nav className="flex items-center gap-2 text-sm">
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground"
              >
                Trang chủ
              </Link>
              <span>/</span>
              <Link
                to="/products"
                className="text-muted-foreground hover:text-foreground"
              >
                Sản phẩm
              </Link>
              <span>/</span>
              <span className="font-medium line-clamp-1">
                {product.tenSanPham}
              </span>
            </nav>
          </div>
        </div>

        {/* ================= PRODUCT DETAIL ================= */}
        <section className="py-12">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Image */}
              <div>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                  <img
                    src={product.hinhAnh}
                    alt={product.tenSanPham}
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    className={`absolute top-4 left-4 ${
                      product.tinhTrangSanXuat === "CON_SAN_XUAT"
                        ? "bg-green-500"
                        : "bg-stone"
                    }`}
                  >
                    {product.tinhTrangSanXuat === "CON_SAN_XUAT"
                      ? "Còn sản xuất"
                      : "Ngừng sản xuất"}
                  </Badge>
                </div>
              </div>

              {/* Info */}
              <div>
                <span className="inline-block px-3 py-1 mb-4 text-sm bg-accent rounded-lg">
                  {product.kichThuoc}
                </span>

                <h1 className="text-2xl md:text-3xl font-bold mb-4">
                  {product.tenSanPham}
                </h1>

                <p className="text-muted-foreground mb-6">{product.moTa}</p>

                {/* Price */}
                <div className="bg-accent rounded-xl p-6 mb-6">
                  <p className="text-sm mb-1">Giá bán</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">
                      {formatPrice(product.giaBanMacDinh)}
                    </span>
                    <span>/m²</span>
                  </div>
                </div>

                {/* Specs */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Ruler className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm">Kích thước</p>
                      <p className="font-medium">{product.kichThuoc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm">Nhà máy sản xuất</p>
                      <p className="font-medium">
                        {product.nhaMayId.tenNhaMay}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {product.tinhTrangSanXuat === "CON_SAN_XUAT" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-stone" />
                    )}
                    <div>
                      <p className="text-sm">Tình trạng</p>
                      <p className="font-medium">
                        {product.tinhTrangSanXuat === "CON_SAN_XUAT"
                          ? "Còn sản xuất"
                          : "Ngừng sản xuất"}
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

        {/* ================= RELATED PRODUCTS ================= */}
        {relatedProducts.length > 0 && (
          <section className="py-12">
            <div className="container">
              <h2 className="text-xl font-bold mb-6">Sản phẩm cùng nhà máy</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard
                    key={p._id}
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
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
