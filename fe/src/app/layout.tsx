import type { Metadata } from "next";
import { ConfigProvider, App } from "antd";
import "antd/dist/reset.css";
import "./globals.scss";

export const metadata: Metadata = {
  title: "MiniShop",
  description: "Cửa hàng tạp hóa mini",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <style>{`
          /* Critical CSS to prevent FOUC */
          body { 
            margin: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          /* Hide content until styles are loaded */
          .ant-btn {
            display: inline-block;
            font-weight: 400;
            line-height: 1.5715;
            color: rgba(0, 0, 0, 0.88);
            text-align: center;
            text-decoration: none;
            vertical-align: middle;
            cursor: pointer;
            user-select: none;
            border: 1px solid transparent;
            padding: 4px 15px;
            font-size: 14px;
            border-radius: 6px;
            transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
          }
          .ant-btn-primary {
            color: #fff;
            background-color: #1677ff;
            border-color: #1677ff;
            box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
          }
          .ant-btn-default {
            color: rgba(0, 0, 0, 0.88);
            background-color: #fff;
            border-color: #d9d9d9;
          }
          .ant-space {
            display: inline-flex;
            align-items: center;
          }
          .ant-space-item:not(:last-child) {
            margin-right: 8px;
          }
        `}</style>
      </head>
      <body suppressHydrationWarning>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#1677ff",
            },
          }}
        >
          <App>{children}</App>
        </ConfigProvider>
      </body>
    </html>
  );
}
