import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { FC } from "react";

const { confirm } = Modal;

export const showDeleteConfirm = ({
  onDelete,
  title,
}: {
  onDelete: any;
  title?: string;
}) => {
  confirm({
    title: title ?? "Do you want to delete this item",
    content: "This action can not be undone!!!",
    icon: <ExclamationCircleFilled />,
    okText: "Yes",
    okType: "danger",
    cancelText: "Cancel",
    onOk: () => onDelete(),
    onCancel: () => {},
  });
};
