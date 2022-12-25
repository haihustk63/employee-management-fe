import React, { FC } from "react";
import { Typography } from "antd";
const { Text } = Typography;

const AppFormErrorMessage: FC<{ message: string }> = ({ message = "" }) => {
  return <Text className="form-field-error-message">{message}</Text>;
};

export default AppFormErrorMessage;
