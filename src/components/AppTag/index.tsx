import { Tag } from "antd";
import React, { FC } from "react";
import { IAppTagProps } from "./interface";

const AppTag: FC<IAppTagProps> = ({
  closable,
  closeIcon,
  color = "success",
  icon,
  onClose,
  onClick,
  children,
}) => {
  return (
    <div className="app-tag" onClick={onClick}>
      <Tag
        closable={closable}
        closeIcon={closeIcon}
        color={color}
        icon={icon}
        onClose={onClose}
      >
        {children}
      </Tag>
    </div>
  );
};

export default AppTag;
