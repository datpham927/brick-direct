import axiosClient from "./axiosClient";

export const nhaMayPublicService = {
  danhSach: () => {
    return axiosClient.get("/nha-may/cong-khai");
  },
};
