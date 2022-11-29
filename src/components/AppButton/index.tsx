import { Button } from "antd";
import { FC } from "react";

import { IAppButton } from "./interface";

const AppButton: FC<IAppButton> = ({
  buttonTitle,
  onClick,
  htmlType,
  className,
  size,
}) => {
  return (
    <Button
      onClick={onClick}
      htmlType={htmlType}
      className={`app-button ${className}`}
      size={size}
    >
      {buttonTitle}
    </Button>
  );
};

export default AppButton;
