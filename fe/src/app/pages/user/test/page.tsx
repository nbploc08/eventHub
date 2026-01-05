"use client";

import {
  HomeIcon,
  ShoppingCartIcon,
  SearchIcon,
  UserIcon,
  HeartIcon,
  StarIcon,
  SettingsIcon,
  MenuIcon,
} from "@/svgs/user/HomeIcons";
import { Button, Space } from "antd";
import { HeaderInput, SendEmail } from "@/app/components/user/CustomInput";

export default function HomePage() {
  const handleClick = () => {
    alert("Antd đã hoạt động tốt!");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      {/* Antd Demo Section */}
      <section className="mb-8 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Antd Components Demo</h2>
        <Space size="middle" wrap>
          <Button type="primary" onClick={handleClick}>
            Primary Button
          </Button>
          <Button type="default">Default Button</Button>
          <Button type="dashed">Dashed Button</Button>
          <Button type="text">Text Button</Button>
          <Button type="link">Link Button</Button>
          <Button danger>Danger Button</Button>
        </Space>
        <div className="mt-4">
          <Space size="middle">
            <Button size="large" type="primary">
              Large
            </Button>
            <Button size="middle" type="primary">
              Middle
            </Button>
            <Button size="small" type="primary">
              Small
            </Button>
          </Space>
        </div>
      </section>

      {/* Basic Icons */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Basic Icons</h2>
        <div className="flex gap-4 items-center">
          <HomeIcon />
          <ShoppingCartIcon />
          <SearchIcon />
          <UserIcon />
          <HeartIcon />
          <StarIcon />
          <SettingsIcon />
          <MenuIcon />
        </div>
      </section>

      {/* Custom Sizes */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Custom Sizes</h2>
        <div className="flex gap-4 items-center">
          <HomeIcon size={16} />
          <HomeIcon size={24} />
          <HomeIcon size={32} />
          <HomeIcon size={48} />
        </div>
      </section>

      {/* Custom Colors */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Custom Colors</h2>
        <div className="flex gap-4 items-center">
          <HeartIcon color="#ef4444" />
          <StarIcon color="#fbbf24" />
          <UserIcon color="#3b82f6" />
          <ShoppingCartIcon color="#10b981" />
        </div>
      </section>

      {/* Custom CSS Classes */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">With CSS Classes</h2>
        <div className="flex gap-4 items-center">
          <SearchIcon className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" />
          <HeartIcon className="text-red-500 hover:scale-110 transition-transform cursor-pointer" />
          <StarIcon className="text-yellow-500 hover:rotate-12 transition-transform cursor-pointer" />
          <SettingsIcon className="text-purple-500 animate-pulse" />
        </div>
      </section>

      {/* Combined Props */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Combined Props</h2>
        <div className="flex gap-6 items-center">
          <MenuIcon
            size={32}
            color="#4f46e5"
            className="hover:scale-125 transition-transform cursor-pointer"
          />
          <ShoppingCartIcon
            size={28}
            className="text-green-600 hover:text-green-800 transition-colors"
          />
          <UserIcon
            size={36}
            color="#dc2626"
            className="hover:opacity-75 transition-opacity"
          />
        </div>
      </section>
      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Custom Input Component</h2>
        <HeaderInput
          dropdownProps={{
            items: [
              { key: "1", label: "All Categories" },
              { key: "2", label: "Electronics" },
              { key: "3", label: "Fashion" },
            ],
            label: "All Categories",
          }}
          inputProps={{
            placeholder: "Search products...",
          }}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </section>
      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Custom Email Input</h2>
        <SendEmail className="h-[64px]" />
      </section>
    </div>
  );
}
