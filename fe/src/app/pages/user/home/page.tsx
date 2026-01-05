import React from "react";
import type { Metadata } from "next";
import { ROUTERS } from "@/utils/constant";

export const metadata: Metadata = {
  title: "Trang chủ - MiniShop",
  description: "Cửa hàng tạp hóa mini tiện lợi cho mọi gia đình",
  robots: { index: true, follow: true },
};

export default function HomePage() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h1 className="text-3xl font-bold text-gray-800">
        {ROUTERS.PUBLIC.HOME} Trang chủ
      </h1>
    </div>
  );
}
