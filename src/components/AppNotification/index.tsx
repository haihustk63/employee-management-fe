import { notification } from "antd";
import { IAppNotificationProps } from "./interface";

const appNotification = ({
  description,
  message,
  className,
  icon,
  placement = "topRight",
  duration = 10,
  type = "open",
  ...props
}: IAppNotificationProps) => {
  return notification[type]({
    description,
    message,
    className,
    placement,
    icon,
    duration,
  });
};

export default appNotification;
