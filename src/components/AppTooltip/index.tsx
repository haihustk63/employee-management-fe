import { Tooltip } from "antd";
import { FC } from "react";
import { IAppTooltip } from "./interface";

const AppTooltip: FC<IAppTooltip> = ({
  arrowPointAtCenter = true,
  mouseEnterDelay = 0,
  zIndex = 999,
  children,
  ...props
}) => {
  return (
    <Tooltip
      arrowPointAtCenter={arrowPointAtCenter}
      mouseEnterDelay={mouseEnterDelay}
      overlayClassName="app-tooltip"
      {...props}
    >
      {children}
    </Tooltip>
  );
};

export default AppTooltip;
