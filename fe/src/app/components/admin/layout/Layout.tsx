import React from "react";
import AdminHeader from "./Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <AdminHeader />

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>

      {/* Admin Footer */}
      <footer className="bg-gray-800 text-white shadow-lg">admin footer</footer>
    </div>
  );
}
