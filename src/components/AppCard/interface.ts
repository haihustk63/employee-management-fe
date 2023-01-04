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
  onDelete?: any;
}

export interface IAppCardWithCoverProps {
  imageUrl?: string;
  title?: string;
  children?: any;
  backgroundColor?: AppColor;
  borderColor?: AppColor;
  hasBoxShadow?: boolean;
  horizontal?: boolean;
  onClick?: () => void;
}
