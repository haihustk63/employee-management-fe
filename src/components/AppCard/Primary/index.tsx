import { Typography } from "antd";
import cx from "classnames";
import React, { FC } from "react";
import { IAppCardPrimaryProps } from "../interface";

const { Text, Title } = Typography;

const AppPrimaryCard: FC<IAppCardPrimaryProps> = ({
  title,
  borderColor,
  borderType = "solid",
  backgroundColor,
  hasBoxShadow,
  className,
  children,
  id,
}) => {
  return (
    <div
      className={cx("app-primary-card", className)}
      id={id}
      style={
        {
          border: `1px ${borderType} var(--color-primary-${borderColor})`,
          backgroundColor: backgroundColor
            ? `var(--color-secondary-${backgroundColor})`
            : "var(--bs-white)",
          boxShadow: hasBoxShadow ? "var(--common-box-shadow)" : "",
        } as React.CSSProperties
      }
    >
      {!!title && (
        <Title level={3} className="title">
          {title}
        </Title>
      )}
      <div className="content">{children}</div>
    </div>
  );
};

export default AppPrimaryCard;
