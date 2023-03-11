import { ReactNode } from "react";

export interface IAppButton {
  buttonTitle: string | ReactNode;
  onClick?: any;
  htmlType?: "button" | "submit" | "reset" | undefined;
  className?: string;
  size?: "large" | "middle" | "small";
  disabled?: boolean;
  id?: string;
  loading?: boolean;
}
