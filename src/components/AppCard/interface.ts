type AppColor =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger";

export interface IAppCardPrimaryProps {
  title?: string;
  borderColor?: AppColor;
  backgroundColor?: AppColor;
  hasBoxShadow?: boolean;
  children?: any;
  onClick?: () => void;
}

export interface IAppCardWithCoverProps {
  imageUrl?: string;
  title?: string;
  excerpt?: string;
  backgroundColor?: AppColor;
  borderColor?: AppColor;
  hasBoxShadow?: boolean;
  horizontal?: boolean;
  onClick?: () => void;
}
