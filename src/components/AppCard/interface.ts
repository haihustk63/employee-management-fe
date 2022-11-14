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
  hasBorder?: boolean;
  hasBoxShadow?: boolean;
  children?: any;
  onClick?: () => void;
}
