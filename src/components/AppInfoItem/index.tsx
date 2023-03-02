import React, { FC, ReactNode } from "react";
import { Space, Typography } from "antd";
const { Text } = Typography;

const AppInfoItem: FC<{
  label?: string;
  value?: string | number | ReactNode;
}> = ({ label, value }) => {
  return (
    <div className="app-info-item">
      <Text className="label">{label}</Text>
      <Text className="value">{value}</Text>
    </div>
  );
};

export default AppInfoItem;
