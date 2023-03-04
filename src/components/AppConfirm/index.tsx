import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";

const { confirm } = Modal;

export const showAppCommonConfirm = ({
  callback,
  title,
  content,
}: {
  callback: any;
  title?: string;
  content?: string;
}) => {
  confirm({
    title: title ?? "Do you want to continue?",
    content: content ?? "This action can not be undone!!!",
    icon: <ExclamationCircleFilled />,
    okText: "Yes",
    okType: "danger",
    cancelText: "Cancel",
    onOk: () => callback(),
    onCancel: () => {},
  });
};

export const showDeleteConfirm = ({ onDelete }: { onDelete: any }) => {
  return showAppCommonConfirm({
    callback: onDelete,
    title: "Do you want to delete this item?",
  });
};
