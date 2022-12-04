import { CSSProperties, ReactNode } from "react";

export interface IAppModalProps {
  afterClose?: () => void;
  bodyStyle?: CSSProperties;
  cancelText?: string;
  centered?: boolean;
  closable?: boolean;
  closeIcon?: ReactNode;
  confirmLoading?: boolean;
  destroyOnClose?: boolean;
  footer?: ReactNode;
  //whether support press ecs to close
  keyboard?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  maskStyle?: CSSProperties;
  okText?: ReactNode;
  okType?: string;
  title?: string;
  open?: boolean;
  wrapClassName?: string;
  zIndex?: number;
  onCancel?: () => void;
  onOk?: () => void;
  children?: ReactNode;
}
