import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-earth text-sand">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
                G
              </div>
              <div>
                <h3 className="text-lg font-bold text-sand">Gạch Việt</h3>
                <p className="text-xs text-sand/70">Chất lượng - Uy tín</p>
              </div>
            </div>
            <p className="text-sm text-sand/80 leading-relaxed">
              Chuyên phân phối các loại gạch ốp lát cao cấp từ các nhà máy uy tín hàng đầu Việt Nam.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-base font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-sand/80 hover:text-sand transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sand/80 hover:text-sand transition-colors">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sand/80 hover:text-sand transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  <a href="tel:0901234567" className="text-sand hover:text-primary transition-colors">
                    0901 234 567
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <a href="mailto:info@gachviet.vn" className="text-sand/80 hover:text-sand transition-colors">
                  info@gachviet.vn
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-sand/80">123 Nguyễn Văn Linh, Q.7, TP.HCM</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-base font-semibold mb-4">Giờ làm việc</h4>
            <ul className="space-y-2 text-sm text-sand/80">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Thứ 2 - Thứ 7: 7:30 - 17:30</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>Chủ nhật: 8:00 - 12:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-sand/20">
        <div className="container py-4 text-center text-sm text-sand/60">
          © 2025 Gạch Việt. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
