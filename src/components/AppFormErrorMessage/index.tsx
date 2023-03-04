import { Typography } from "antd";
import { FC } from "react";
const { Text } = Typography;

const AppFormErrorMessage: FC<{ message: string }> = ({ message = "" }) => {
  return <Text className="form-field-error-message">{message}</Text>;
};

export default AppFormErrorMessage;
