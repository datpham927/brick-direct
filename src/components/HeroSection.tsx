import { ArrowRight, Phone, Shield, Truck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const features = [
    { icon: Truck, text: "Giao hàng tận nơi" },
    { icon: Shield, text: "Bảo hành chính hãng" },
    { icon: Award, text: "Chất lượng cao cấp" },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative container py-20 md:py-28">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground"></span>
            </span>
            Nhà phân phối gạch chính hãng
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in">
            Gạch Cao Cấp
            <br />
            <span className="text-sand">Giá Tốt Nhất</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-xl animate-fade-in">
            Chuyên cung cấp các loại gạch ốp lát từ các nhà máy hàng đầu Việt Nam. 
            Giao hàng trực tiếp từ nhà máy - Không qua trung gian.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mb-12 animate-fade-in">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/products">
                Xem sản phẩm
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <a href="tel:0901234567">
                <Phone className="mr-2 h-4 w-4" />
                0901 234 567
              </a>
            </Button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-6 animate-fade-in">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-primary-foreground/90">
                <feature.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
