import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Điện thoại",
      content: "0901 234 567",
      description: "Gọi ngay để được tư vấn",
      action: { label: "Gọi ngay", href: "tel:0901234567" },
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@gachviet.vn",
      description: "Gửi email cho chúng tôi",
      action: { label: "Gửi email", href: "mailto:info@gachviet.vn" },
    },
    {
      icon: MessageCircle,
      title: "Zalo",
      content: "0901 234 567",
      description: "Nhắn tin qua Zalo",
      action: { label: "Chat Zalo", href: "https://zalo.me/0901234567" },
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page header */}
        <section className="gradient-hero py-16">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Liên hệ với chúng tôi
            </h1>
            <p className="text-primary-foreground/90 max-w-xl mx-auto">
              Đội ngũ tư vấn sẵn sàng hỗ trợ bạn chọn gạch phù hợp với công trình
            </p>
          </div>
        </section>

        {/* Contact cards */}
        <section className="py-12 -mt-8">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-6">
              {contactInfo.map((item, index) => (
                <Card key={index} className="shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-lg font-medium text-primary mb-1">
                      {item.content}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <Button variant="outline" asChild className="w-full">
                      <a href={item.action.href}>{item.action.label}</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Store info */}
        <section className="py-12 bg-muted">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-lg h-[400px] animate-fade-in">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0441559429196!2d106.71882931480146!3d10.732608892350954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85b%3A0x91d99c94b7ae6b9d!2sNguyen%20Van%20Linh%2C%20District%207%2C%20Ho%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1704067200000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bản đồ cửa hàng Gạch Việt"
                ></iframe>
              </div>

              {/* Info */}
              <div className="animate-slide-in">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Showroom Gạch Việt
                </h2>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Địa chỉ</h3>
                      <p className="text-muted-foreground">
                        123 Nguyễn Văn Linh, Phường Tân Phong,<br />
                        Quận 7, TP. Hồ Chí Minh
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Giờ làm việc</h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>Thứ 2 - Thứ 7: 7:30 - 17:30</p>
                        <p>Chủ nhật: 8:00 - 12:00</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Hotline</h3>
                      <a
                        href="tel:0901234567"
                        className="text-xl font-bold text-primary hover:underline"
                      >
                        0901 234 567
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button size="lg" asChild>
                    <a
                      href="https://www.google.com/maps/dir//123+Nguyen+Van+Linh,+District+7,+Ho+Chi+Minh+City"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin className="mr-2 h-5 w-5" />
                      Chỉ đường đến showroom
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-earth">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-sand mb-4">
              Sẵn sàng bắt đầu dự án của bạn?
            </h2>
            <p className="text-sand/80 mb-8 max-w-xl mx-auto">
              Liên hệ ngay để được tư vấn miễn phí và nhận báo giá tốt nhất
            </p>
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:0901234567">
                <Phone className="mr-2 h-5 w-5" />
                Gọi ngay: 0901 234 567
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
