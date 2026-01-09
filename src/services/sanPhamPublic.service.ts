import { SanPham } from "@/types";
import axiosClient from "./axiosClient";

export const sanPhamPublicService = {
  topLuotXem() {
    return axiosClient.get<{ success: boolean; data: SanPham[] }>(
      "/san-pham/top-luot-xem"
    );
  },
  danhSach(params?: {
    tenSanPham?: string;
    kichThuoc?: string;
    nhaMayId?: string;
    giaTu?: number;
    giaDen?: number;
  }) {
    return axiosClient.get<{ success: boolean; data: SanPham[] }>(
      "/san-pham/cong-khai",
      { params }
    );
  },
  chiTiet(id: string) {
    return axiosClient.get<{ success: boolean; data: SanPham }>(
      `/san-pham/cong-khai/${id}`
    );
  },
};
