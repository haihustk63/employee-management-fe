import React, { FC } from "react";
import { Image, Typography } from "antd";

import { IAppCardWithCoverProps } from "../interface";
import { purityContent } from "@/utils";

const { Text, Title } = Typography;

const AppWithCoverCard: FC<IAppCardWithCoverProps> = ({
  title,
  borderColor,
  backgroundColor,
  hasBoxShadow,
  excerpt,
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
          display: horizontal ? "flex" : undefined,
        } as React.CSSProperties
      }
      onClick={onClick}
    >
      <Image src={imageUrl} alt="Card with coverz" />
      <div className="content">
        <div
          className="title"
          dangerouslySetInnerHTML={{ __html: purityContent(title) || "" }}
        />
        <div
          dangerouslySetInnerHTML={{ __html: purityContent(excerpt) || "" }}
        />
      </div>
    </div>
  );
};

export default AppWithCoverCard;
