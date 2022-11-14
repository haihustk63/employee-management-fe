import { Button } from "antd";
import { FC } from "react";

import { IAppButton } from "./interface";

const AppButton: FC<IAppButton> = ({ buttonTitle, onClick, htmlType }) => {
  return (
    <Button onClick={onClick} htmlType={htmlType}>
      {buttonTitle}
    </Button>
  );
};

export default AppButton;
