import React from "react";
import Image from "next/image";
import styles from "./Footer.module.scss";

// Tạo các icon bổ sung cần thiết
const PhoneIcon: React.FC<{
  className?: string;
  size?: number | string;
  color?: string;
}> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9448 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.19 12.85C3.49997 10.2412 2.44824 7.27099 2.12 4.18C2.09513 3.90347 2.12809 3.62476 2.21692 3.36162C2.30575 3.09849 2.44849 2.85669 2.63622 2.65162C2.82394 2.44655 3.05226 2.28271 3.30052 2.17052C3.54878 2.05833 3.81781 2.00026 4.09 2H7.09C7.32178 1.99522 7.54823 2.06708 7.73885 2.20617C7.92947 2.34527 8.07334 2.54443 8.14 2.77C8.26407 3.22175 8.43214 3.66382 8.64 4.09C8.74704 4.35073 8.78618 4.63578 8.75372 4.91618C8.72126 5.19659 8.61838 5.46297 8.45 5.69L7.12 7.02C8.55654 9.58256 10.4175 11.4435 12.98 12.88L14.31 11.55C14.537 11.3816 14.8034 11.2787 15.0838 11.2463C15.3642 11.2138 15.6493 11.253 15.91 11.36C16.3362 11.5679 16.7782 11.7359 17.23 11.86C17.4556 11.9267 17.6547 12.0705 17.7938 12.2612C17.9329 12.4518 18.0048 12.6782 18 12.91V15.91C18 16.18 17.89 16.44 17.69 16.64C17.49 16.84 17.23 16.95 16.96 16.96L22 16.92Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EmailIcon: React.FC<{
  className?: string;
  size?: number | string;
  color?: string;
}> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="22,6 12,13 2,6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ClockIcon: React.FC<{
  className?: string;
  size?: number | string;
  color?: string;
}> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <polyline
      points="12,6 12,12 16,14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FacebookIcon: React.FC<{
  className?: string;
  size?: number | string;
  color?: string;
}> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TwitterIcon: React.FC<{
  className?: string;
  size?: number | string;
  color?: string;
}> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.957 14.8821 3.28445C14.0247 3.6119 13.2884 4.19439 12.773 4.95372C12.2575 5.71305 11.9877 6.61232 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39624C5.36074 6.60667 4.01032 5.43666 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const InstagramIcon: React.FC<{
  className?: string;
  size?: number | string;
  color?: string;
}> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="5"
      ry="5"
      stroke={color}
      strokeWidth="2"
    />
    <path
      d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7615 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z"
      stroke={color}
      strokeWidth="2"
    />
    <path d="M17.5 6.5H17.51" stroke={color} strokeWidth="2" />
  </svg>
);

const YoutubeIcon: React.FC<{
  className?: string;
  size?: number | string;
  color?: string;
}> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.4981 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92921 4.59318 2.50191 4.84824 2.16131 5.19941C1.82071 5.55057 1.57879 5.98541 1.46 6.46C1.14 8.20556 0.991387 9.97631 1.02 11.75C0.988901 13.537 1.13619 15.3213 1.46 17.08C1.59116 17.5398 1.8379 17.9581 2.17774 18.2945C2.51758 18.6308 2.93842 18.8738 3.4 19C5.12 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19.04C21.0708 18.9068 21.4981 18.6518 21.8387 18.3006C22.1793 17.9494 22.4212 17.5146 22.54 17.04C22.8468 15.3078 22.9915 13.5441 22.97 11.78C23.001 9.99295 22.8537 8.20864 22.53 6.45L22.54 6.42Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill={color} />
  </svg>
);

const LocationIcon: React.FC<{
  className?: string;
  size?: number | string;
  color?: string;
}> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2" />
  </svg>
);

export default function Footer() {
  const FooterSection: React.FC<{
    title: string;
    children: React.ReactNode;
  }> = ({ title, children }) => (
    <div className={styles.footerSection}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      <ul className={styles.sectionList}>{children}</ul>
    </div>
  );

  const FooterLink: React.FC<{ href?: string; children: React.ReactNode }> = ({
    href = "#",
    children,
  }) => (
    <li className={styles.listItem}>
      <a href={href} className={styles.link}>
        {children}
      </a>
    </li>
  );

  const ContactInfo: React.FC<{
    icon: React.ReactNode;
    children: React.ReactNode;
  }> = ({ icon, children }) => (
    <div className={styles.contactInfo}>
      <div className={styles.contactIcon}>{icon}</div>
      <div className={styles.contactText}>{children}</div>
    </div>
  );

  const SocialIcon: React.FC<{ href?: string; children: React.ReactNode }> = ({
    href = "#",
    children,
  }) => (
    <a href={href} className={styles.socialIcon}>
      {children}
    </a>
  );

  const HotlineBox: React.FC<{ number: string; hours: string }> = ({
    number,
    hours,
  }) => (
    <div className={styles.hotlineBox}>
      <div className={styles.hotlineNumber}>
        <PhoneIcon size={20} color="#00b853" />
        <span>{number}</span>
      </div>
      <div className={styles.hotlineHours}>{hours}</div>
    </div>
  );

  return (
    <footer className={`${styles.footer} bg-white`}>
      {/* Logo và thông tin liên hệ */}
      <div className={styles.footerTop}>
        <div className={styles.topGrid}>
          <div className={styles.logoSection}>
            <div className={styles.logoContainer}>
              <Image
                className={styles.logoImage}
                src="/minishop-logo.png"
                alt="logo"
                width={60}
                height={0}
              />
              <p className={styles.tagline}>
                Cửa hàng tạp hóa Mini Shop. Cung cấp các sản phẩm thực phẩm và
                hàng tiêu dùng. Chúng tôi cung cấp các sản phẩm chất lượng cao
                và giá cả hợp lý, toàn bộ sản phẩm được nhập khẩu trực tiếp từ
                các nhà cung cấp uy tín.
              </p>
            </div>

            <div className={`${styles.contactList} flex flex-col gap-3`}>
              <ContactInfo icon={<LocationIcon size={16} color="#666" />}>
                <strong>Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, TP. HCM
              </ContactInfo>
              <ContactInfo icon={<PhoneIcon size={16} color="#666" />}>
                <strong>Gọi cho chúng tôi:</strong> (+91) - 540-025-124553
              </ContactInfo>
              <ContactInfo icon={<EmailIcon size={16} color="#666" />}>
                <strong>Email:</strong> minishop@gmail.com
              </ContactInfo>
              <ContactInfo icon={<ClockIcon size={16} color="#666" />}>
                <strong>Giờ mở cửa:</strong> 10:00 - 18:00, Thứ 2 - Thứ 7
              </ContactInfo>
            </div>
          </div>

          <FooterSection title="Công ty">
            <FooterLink>Về chúng tôi</FooterLink>
            <FooterLink>Thông tin giao hàng</FooterLink>
            <FooterLink>Chính sách bảo mật</FooterLink>
            <FooterLink>Điều khoản & Điều kiện</FooterLink>
            <FooterLink>Liên hệ chúng tôi</FooterLink>
            <FooterLink>Trung tâm hỗ trợ</FooterLink>
            <FooterLink>Quản lý chất lượng</FooterLink>
          </FooterSection>

          <FooterSection title="Tài khoản">
            <FooterLink>Đăng nhập</FooterLink>
            <FooterLink>Xem giỏ hàng</FooterLink>
            <FooterLink>Danh sách yêu thích</FooterLink>
            <FooterLink>Theo dõi đơn hàng</FooterLink>
            <FooterLink>Lịch sử mua hàng</FooterLink>
            <FooterLink>Chi tiết vận chuyển</FooterLink>
            <FooterLink>So sánh sản phẩm</FooterLink>
          </FooterSection>

          <FooterSection title="Doanh nghiệp">
            <FooterLink>Trở thành nhà cung cấp</FooterLink>
            <FooterLink>Chương trình liên kết</FooterLink>
            <FooterLink>Kinh doanh nông sản</FooterLink>
            <FooterLink>Giới thiệu sản phẩm mới</FooterLink>
            <FooterLink>Chính sách hỗ trợ</FooterLink>
            <FooterLink>Chính sách đổi trả</FooterLink>
            <FooterLink>Chính sách bảo hành</FooterLink>
          </FooterSection>

          <FooterSection title="Phổ biến">
            <FooterLink>Sữa & Sữa có hương vị</FooterLink>
            <FooterLink>Bơ và Margarine</FooterLink>
            <FooterLink>Thay thế trứng</FooterLink>
            <FooterLink>Mứt</FooterLink>
            <FooterLink>Kem chua và Dips</FooterLink>
            <FooterLink>Trà & Kombucha</FooterLink>
            <FooterLink>Phô mai</FooterLink>
          </FooterSection>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.bottomContent}>
          <div className={styles.bottomRow}>
            <div className={styles.copyright}>
              ©{new Date().getFullYear()}, Mini Shop cửa hàng thực phẩm gia đình
              <br />
              Bản quyền thuộc về Mini Shop
            </div>

            <div className={styles.hotlineContainer}>
              <HotlineBox number="1900 - 6666" hours="Làm việc 8:00 - 22:00" />
              <HotlineBox number="1900 - 8888" hours="24/7 Hỗ trợ trực tuyến" />
            </div>
          </div>

          <div className={styles.socialSection}>
            <span className={styles.followText}>Theo dõi chúng tôi</span>
            <div className={styles.socialIcons}>
              <SocialIcon>
                <FacebookIcon size={20} color="#1877f2" />
              </SocialIcon>
              <SocialIcon>
                <TwitterIcon size={20} color="#1da1f2" />
              </SocialIcon>
              <SocialIcon>
                <InstagramIcon size={20} color="#e4405f" />
              </SocialIcon>
              <SocialIcon>
                <YoutubeIcon size={20} color="#ff0000" />
              </SocialIcon>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
