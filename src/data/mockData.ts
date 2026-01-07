export interface Factory {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  size: string;
  price: number;
  factoryId: string;
  factoryName: string;
  available: boolean;
  description: string;
  visible: boolean;
}

export const factories: Factory[] = [
  {
    id: "f1",
    name: "Nhà máy Viglacera Hạ Long",
    address: "KCN Cái Lân, TP. Hạ Long, Quảng Ninh",
    phone: "0203 3846 789",
  },
  {
    id: "f2",
    name: "Nhà máy Prime Vĩnh Phúc",
    address: "KCN Bình Xuyên, Vĩnh Phúc",
    phone: "0211 3710 123",
  },
  {
    id: "f3",
    name: "Nhà máy Đồng Tâm Long An",
    address: "KCN Long Hậu, Long An",
    phone: "0272 3850 456",
  },
  {
    id: "f4",
    name: "Nhà máy Taicera Bình Dương",
    address: "KCN Việt Hương, Bình Dương",
    phone: "0274 3756 789",
  },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Gạch Granite Vân Đá Marble Trắng",
    image: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=400&h=400&fit=crop",
    size: "60x60cm",
    price: 185000,
    factoryId: "f1",
    factoryName: "Nhà máy Viglacera Hạ Long",
    available: true,
    description: "Gạch granite cao cấp vân đá marble trắng, bề mặt bóng kính, chống trơn trượt. Phù hợp lát phòng khách, sảnh lớn.",
    visible: true,
  },
  {
    id: "p2",
    name: "Gạch Men Bóng Vân Gỗ Sồi",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    size: "15x80cm",
    price: 145000,
    factoryId: "f2",
    factoryName: "Nhà máy Prime Vĩnh Phúc",
    available: true,
    description: "Gạch men giả gỗ sồi tự nhiên, vân gỗ chân thực. Độ cứng cao, chống mài mòn tốt.",
    visible: true,
  },
  {
    id: "p3",
    name: "Gạch Terrazzo Xám Nhạt",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=400&fit=crop",
    size: "80x80cm",
    price: 225000,
    factoryId: "f3",
    factoryName: "Nhà máy Đồng Tâm Long An",
    available: true,
    description: "Gạch terrazzo phong cách hiện đại, họa tiết đá cuội tự nhiên. Thích hợp cho không gian sang trọng.",
    visible: true,
  },
  {
    id: "p4",
    name: "Gạch Lát Sân Vân Cổ Điển",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop",
    size: "40x40cm",
    price: 95000,
    factoryId: "f4",
    factoryName: "Nhà máy Taicera Bình Dương",
    available: false,
    description: "Gạch lát sân vườn, chống nước, chịu lực tốt. Vân cổ điển Châu Âu.",
    visible: true,
  },
  {
    id: "p5",
    name: "Gạch Ốp Tường Vân Đá Cẩm Thạch",
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&h=400&fit=crop",
    size: "30x60cm",
    price: 135000,
    factoryId: "f1",
    factoryName: "Nhà máy Viglacera Hạ Long",
    available: true,
    description: "Gạch ốp tường vân đá cẩm thạch, bề mặt nhám. Phù hợp phòng tắm, nhà bếp.",
    visible: true,
  },
  {
    id: "p6",
    name: "Gạch Porcelain Trắng Tinh Khiết",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=400&fit=crop",
    size: "120x60cm",
    price: 320000,
    factoryId: "f2",
    factoryName: "Nhà máy Prime Vĩnh Phúc",
    available: true,
    description: "Gạch porcelain khổ lớn, màu trắng tinh khiết. Bề mặt siêu bóng, dễ vệ sinh.",
    visible: true,
  },
  {
    id: "p7",
    name: "Gạch Mosaic Họa Tiết Vintage",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&h=400&fit=crop",
    size: "30x30cm",
    price: 175000,
    factoryId: "f3",
    factoryName: "Nhà máy Đồng Tâm Long An",
    available: true,
    description: "Gạch mosaic họa tiết vintage, phong cách Địa Trung Hải. Tạo điểm nhấn độc đáo.",
    visible: true,
  },
  {
    id: "p8",
    name: "Gạch Granite Xám Đậm",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop",
    size: "60x60cm",
    price: 195000,
    factoryId: "f4",
    factoryName: "Nhà máy Taicera Bình Dương",
    available: true,
    description: "Gạch granite xám đậm cao cấp, vân đá tự nhiên. Chống trầy xước, bền màu.",
    visible: true,
  },
];

export const sizes = ["30x30cm", "30x60cm", "40x40cm", "60x60cm", "80x80cm", "120x60cm", "15x80cm"];

export const priceRanges = [
  { label: "Dưới 100.000đ", min: 0, max: 100000 },
  { label: "100.000đ - 200.000đ", min: 100000, max: 200000 },
  { label: "200.000đ - 300.000đ", min: 200000, max: 300000 },
  { label: "Trên 300.000đ", min: 300000, max: Infinity },
];
