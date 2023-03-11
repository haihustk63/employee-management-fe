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
  loading,
}) => {
  const handleClick = (e: any) => {
    e.stopPropagation();
    onClick?.();
  };

  return (
    <Button
      onClick={handleClick}
      htmlType={htmlType}
      className={`app-button ${className}`}
      size={size}
      disabled={disabled}
      id={id}
      loading={loading}
    >
      {buttonTitle}
    </Button>
  );
};

export default AppButton;
