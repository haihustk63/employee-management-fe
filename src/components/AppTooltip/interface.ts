import { ReactNode } from "react";

export interface IAppTooltip {
  title?: string;
  arrowPointAtCenter?: boolean;
  autoAdjustOverflow?: boolean;
  color?: string;
  defaultOpen?: boolean;
  mouseEnterDelay?: number;
  overlayClassName?: string;
  className?: string;
  placement?:
    | "top"
    | "left"
    | "right"
    | "bottom"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | "leftTop"
    | "leftBottom"
    | "rightTop"
    | "rightBottom";
  trigger?: "hover" | "focus" | "click" | Array<string>;
  open?: boolean;
  zIndex?: number;
  children?: ReactNode;
}
