import { Tooltip } from "antd";
import React, { FC } from "react";
import { IAppTooltip } from "./interface";

const AppTooltip: FC<IAppTooltip> = ({
  arrowPointAtCenter = true,
  mouseEnterDelay = 0,
  zIndex = 999,
  children,
  ...props
}) => {
  return (
    <div className="app-tooltip">
      <Tooltip
        arrowPointAtCenter={arrowPointAtCenter}
        mouseEnterDelay={mouseEnterDelay}
        {...props}
      >
        {children}
      </Tooltip>
    </div>
  );
};

export default AppTooltip;
