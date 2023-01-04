import React, { FC } from "react";
import { Image, Typography } from "antd";

import { IAppCardWithCoverProps } from "../interface";

const AppWithCoverCard: FC<IAppCardWithCoverProps> = ({
  title,
  borderColor,
  backgroundColor,
  hasBoxShadow,
  children,
  imageUrl,
  horizontal,
  onClick,
}) => {
  return (
    <div
      className="app-with-cover-card"
      style={
        {
          border: `1px solid var(--bs-${borderColor}-rgb)`,
          backgroundColor: backgroundColor
            ? `var(--bs-${backgroundColor}-rgb)`
            : "var(--bs-white)",
          boxShadow: hasBoxShadow ? "var(--common-box-shadow)" : "",
          flexDirection: horizontal ? "row" : "column",
        } as React.CSSProperties
      }
      onClick={onClick}
    >
      <Image preview={false} src={imageUrl} alt="Card with coverz" />
      <div className="content">
        <h2 className="title">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AppWithCoverCard;
