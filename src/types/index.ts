export interface SanPham {
  _id: string;
  maSanPham: string;
  tenSanPham: string;
  kichThuoc: string;
  nhaMayId: {
    _id: string;
    tenNhaMay: string;
    soDienThoai?: string;
    diaChi?: string;
  };
  giaBanMacDinh: number;
  hinhAnh?: string;
  moTa?: string;
  luotXem: number;
  hienThi: boolean;
  tinhTrangSanXuat: "CON_SAN_XUAT" | "NGUNG_SAN_XUAT";
  ngayTao: string;
  ngayCapNhat: string;
}
export interface NhaMayPublic {
  _id: string;
  tenNhaMay: string;
  soDienThoai?: string;
  diaChi?: string;
}
