import { Button, ButtonProps } from "antd";
import React from "react";

export const BaseButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props}>{props.children}</Button>;
};
