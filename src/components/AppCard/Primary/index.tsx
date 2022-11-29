import React, { FC } from "react";
import { Typography } from "antd";
import { IAppCardPrimaryProps } from "../interface";

const { Text, Title } = Typography;

const AppPrimaryCard: FC<IAppCardPrimaryProps> = ({
  title,
  borderColor,
  backgroundColor,
  hasBoxShadow,
  children,
  onClick,
}) => {
  return (
    <div
      className="app-primary-card"
      style={
        {
          border: `1px solid var(--bs-${borderColor}-rgb)`,
          backgroundColor: backgroundColor
            ? `var(--bs-${backgroundColor}-rgb)`
            : "var(--bs-white)",
          boxShadow: hasBoxShadow ? "var(--common-box-shadow)" : "",
        } as React.CSSProperties
      }
      onClick={onClick}
    >
      <Title level={3} className="title">
        {title}
      </Title>
      <div className="content">{children}</div>
    </div>
  );
};

export default AppPrimaryCard;
