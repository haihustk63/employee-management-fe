import { ReactNode } from "react";

export interface IAppTagProps {
  closable?: boolean;
  closeIcon?: ReactNode;
  color?: string;
  icon?: ReactNode;
  onClose?: (e: any) => void;
  onClick?: (e: any) => void;
  children?: any;
}
