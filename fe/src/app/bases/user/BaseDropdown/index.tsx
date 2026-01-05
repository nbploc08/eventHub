import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

interface BaseDropdownProps {
  className?: string;
  items?: MenuProps["items"];
  label?: React.ReactNode;
  menuProps?: Omit<React.ComponentProps<typeof Dropdown>["menu"], "items">;
  dropdownProps?: Omit<React.ComponentProps<typeof Dropdown>, "menu">;
}

export const BaseDropdown: React.FC<BaseDropdownProps> = ({
  className = "",
  items = [
    {
      key: "1",
      label: <span>1st menu item</span>,
    },
    {
      key: "2",
      label: <span>2nd menu item</span>,
    },
    {
      key: "3",
      danger: true,
      label: "3rd menu item (danger)",
    },
  ],
  label = (
    <span style={{ fontWeight: "700", whiteSpace: "nowrap", fontSize: "14px" }}>
      All Categories
    </span>
  ),
  menuProps = {},
  dropdownProps = {},
}) => {
  return (
    <Dropdown
      menu={{ items, ...menuProps }}
      className={"flex align-center " + className}
      trigger={["click"]}
      {...dropdownProps}
    >
      <Space>
        <span style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{label}</span>
        <DownOutlined className="text-[12px] text-[#777777] mr-[8px]" />
      </Space>
    </Dropdown>
  );
};
