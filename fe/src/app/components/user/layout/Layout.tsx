import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.scss";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className={`${styles.container} px-4`}>
        <div className="bg-white rounded-t-lg shadow-sm">
          <main className="py-8">{children}</main>
        </div>
      </div>

      <div className={`${styles.container} px-4`}>
        <Footer />
      </div>
    </div>
  );
}
