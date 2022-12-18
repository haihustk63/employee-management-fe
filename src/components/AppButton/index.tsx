import { Button } from "antd";
import { FC } from "react";

import { IAppButton } from "./interface";

const AppButton: FC<IAppButton> = ({
  buttonTitle,
  onClick,
  htmlType,
  className,
  size,
  disabled,
  id,
}) => {
  return (
    <Button
      onClick={onClick}
      htmlType={htmlType}
      className={`app-button ${className}`}
      size={size}
      disabled={disabled}
      id={id}
    >
      {buttonTitle}
    </Button>
  );
};

export default AppButton;
