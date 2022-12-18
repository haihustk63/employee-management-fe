import { ReactNode } from "react";

export interface IAppNotificationProps {
  bottom?: number;
  btn?: ReactNode;
  className?: string;
  closeIcon?: ReactNode;
  description: ReactNode;
  duration?: number;
  icon?: ReactNode;
  message: ReactNode;
  placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  top?: number;
  onClick?: Function;
  onClose?: Function;
  key?: string;
  type?: "success" | "info" | "warning" | "error" | "open";
}
