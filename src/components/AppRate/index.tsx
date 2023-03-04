import { RATE_LEVELS } from "@/constants/common";
import { Rate } from "antd";
import { FC } from "react";
import { IAppRateProps } from "./interface";

const AppRate: FC<IAppRateProps> = ({
  allowClear = true,
  allowHalf = false,
  tooltips = RATE_LEVELS,
  defaultValue = 0,
  ...props
}) => {
  return (
    <div className="app-rate">
      <Rate
        allowClear={allowClear}
        allowHalf={allowHalf}
        tooltips={tooltips}
        defaultValue={defaultValue}
        {...props}
      />
    </div>
  );
};

export default AppRate;
