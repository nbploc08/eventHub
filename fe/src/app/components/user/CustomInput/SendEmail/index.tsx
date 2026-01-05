import { BaseInput, BaseButton } from "@/app/bases";
import { SearchIcon } from "@/svgs/user/HomeIcons";
import React from "react";
import "./style.module.scss";

interface SendEmailProps {
  className?: string;
  inputProps?: React.ComponentProps<typeof BaseInput>;
  buttonProps?: React.ComponentProps<typeof BaseButton>;
  icon?: React.ReactNode;
  buttonLabel?: React.ReactNode;
}

export const SendEmail: React.FC<SendEmailProps> = ({
  className = "",
  inputProps = {},
  buttonProps = {},
  icon = <SearchIcon size={18} className="mr-[12px]" />, // Đổi thành <PlaneIcon ... /> nếu có
  buttonLabel = "Subscribe",
}) => {
  return (
    <div
      className={`flex items-center border border-[#d3f3e7] pl-[12px] rounded-full w-full max-w-[500px] ${className}`}
    >
      <BaseInput
        variant="borderless"
        className="text-[16px]"
        placeholder="Your email address"
        prefix={icon}
        {...inputProps}
      />
      <BaseButton
        shape="round"
        className="border-none! bg-[#3BB77E]! text-[#fff]! h-full px-[40px]! text-[16px]!"
        {...buttonProps}
      >
        {buttonLabel}
      </BaseButton>
    </div>
  );
};
