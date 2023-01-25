import { ReactNode } from "react";

type AppColor = "blue" | "green" | "red" | "gray";

export interface IAppCardPrimaryProps {
  title?: string | ReactNode;
  borderColor?: AppColor;
  borderType?: string;
  backgroundColor?: AppColor;
  hasBoxShadow?: boolean;
  children?: any;
  onClick?: any;
  onDelete?: any;
  className?: string;
}

export interface IAppCardWithCoverProps {
  imageUrl?: string;
  title?: string;
  children?: any;
  backgroundColor?: AppColor;
  borderColor?: AppColor;
  hasBoxShadow?: boolean;
  horizontal?: boolean;
  className?: string;
  onClick?: () => void;
}
