import { BaseInput, BaseDropdown } from "@/app/bases";
import { SearchIcon } from "@/svgs/user/HomeIcons";
import React from "react";

interface HeaderInputProps {
  className?: string;
  dropdownProps?: React.ComponentProps<typeof BaseDropdown>;
  inputProps?: React.ComponentProps<typeof BaseInput>;
  onSearch?: (value: string) => void;
}

export const HeaderInput: React.FC<HeaderInputProps> = ({
  className = "",
  dropdownProps = {},
  inputProps = {},
  // TODO: Add onSearch
  // onSearch,
}) => {
  return (
    <div
      className={
        "flex border px-[20px] border-[#BCE3C9] border-[2px] py-[16px] items-center rounded-[4px] p-2 " +
        className
      }
    >
      <BaseDropdown className="mr-[8px]" {...dropdownProps} />
      <div className="flex border-l-[#cacaca] border-l-[1px] w-full items-center justify-between">
        <BaseInput variant="borderless" {...inputProps} />
        <SearchIcon color="#777777" />
      </div>
    </div>
  );
};
