import { Tooltip } from "antd";
import React, { FC } from "react";
import { IAppTooltip } from "./interface";

const AppTooltip: FC<IAppTooltip> = ({
  arrowPointAtCenter = true,
  autoAdjustOverflow,
  color,
  defaultOpen,
  mouseEnterDelay = 0,
  open,
  overlayClassName,
  placement,
  title,
  trigger,
  zIndex = 999,
  children,
}) => {
  return (
    <div className="app-tooltip">
      <Tooltip
        title={title}
        overlayClassName={overlayClassName}
        arrowPointAtCenter={arrowPointAtCenter}
        color={color}
        placement={placement}
        trigger={trigger}
        mouseEnterDelay={mouseEnterDelay}
        open={open}
        zIndex={zIndex}
      >
        {children}
      </Tooltip>
    </div>
  );
};

export default AppTooltip;
