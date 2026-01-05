import React from "react";
import type { Metadata } from "next";
import { ROUTERS } from "@/utils/constant";

export const metadata: Metadata = {
  title: "Admin Dashboard - MiniShop",
  description: "Trang quản trị của MiniShop",
  robots: { index: false, follow: false, noarchive: true, nosnippet: true },
};

export default function AdminHome() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h1 className="text-3xl font-bold text-gray-800">
        {ROUTERS.PUBLIC.ADMIN_PANEL}
      </h1>
    </div>
  );
}
