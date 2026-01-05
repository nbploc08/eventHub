"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserIcon, ShoppingCartIcon, HeartIcon } from "@/svgs/user/HomeIcons";
import styles from "./Header.module.scss";
import { HeaderInput } from "../CustomInput";

// Compare Icon
const CompareIcon: React.FC<{
  className?: string;
  size?: number | string;
  color?: string;
}> = ({ className = "", size = 20, color = "currentColor" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 20V10M12 20V4M6 20V14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Data
const headerItems = [
  { id: "compare", label: "So sánh", icon: CompareIcon, href: "#" },
  { id: "wishlist", label: "Yêu thích", icon: HeartIcon, href: "#" },
  {
    id: "cart",
    label: "Giỏ hàng",
    icon: ShoppingCartIcon,
    href: "#",
    badge: 2,
  },
  { id: "account", label: "Tài khoản", icon: UserIcon, href: "#" },
];

const navigationItems = [
  { label: "Trang chủ", href: "#", active: true },
  { label: "Giới thiệu", href: "#" },
  { label: "Sản phẩm", href: "#" },
  { label: "Tin tức", href: "#" },
  { label: "Khuyến mãi", href: "#" },
  { label: "Liên hệ", href: "#" },
];

const dropdownData = {
  items: [
    { key: "1", label: "Tất cả danh mục" },
    { key: "2", label: "Điện tử" },
    { key: "3", label: "Thời trang" },
    { key: "4", label: "Đồ gia dụng" },
    { key: "5", label: "Đồ dùng học tập" },
    { key: "6", label: "Đồ dùng gia đình" },
    { key: "7", label: "Đồ dùng cá nhân" },
    { key: "8", label: "Đồ dùng công nghiệp" },
  ],
  label: "Tất cả danh mục",
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 50;
          setIsScrolled(scrolled);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Header Top */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.container}>
            <div className={styles.topContent}>
              {/* Logo */}
              <div className={styles.logoContainer}>
                <Image
                  className={styles.logoImage}
                  src="/minishop-logo.png"
                  alt="Mini Shop Logo"
                  width={70}
                  height={0}
                />
              </div>

              {/* Search */}
              <div className={styles.searchInputContainer}>
                <HeaderInput
                  dropdownProps={dropdownData}
                  inputProps={{ placeholder: "Tìm kiếm sản phẩm..." }}
                  className={styles.searchInput}
                />
              </div>

              {/* Header Items */}
              <div className={styles.headerItems}>
                {headerItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={item.id} className={styles.headerItem}>
                      <a href={item.href} className={styles.headerLink}>
                        <div className={styles.iconWrapper}>
                          <IconComponent size={22} className={styles.icon} />
                          {item.badge && (
                            <span className={styles.badge}>{item.badge}</span>
                          )}
                        </div>
                        <span className={styles.label}>{item.label}</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Navigation */}
      <div
        className={`${styles.navSection} ${isScrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.container}>
          <div className={styles.navContent}>
            {/* Browse Button */}
            <button className={styles.browseButton}>Danh mục hàng hóa</button>

            {/* Navigation */}
            <nav className={styles.navigation}>
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`${styles.navLink} ${
                    item.active ? styles.active : ""
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Phone Info */}
            <div className={styles.phoneInfo}>
              <div className={styles.phoneNumber}>1900 - 888</div>
              <div className={styles.phoneSupport}>Hỗ trợ trực tuyến</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
