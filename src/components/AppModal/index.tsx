import { Modal } from "antd";
import { FC } from "react";
import { IAppModalProps } from "./interface";

const AppModal: FC<IAppModalProps> = ({
  cancelText = "Cancel",
  centered = false,
  closable = true,
  maskClosable = true,
  keyboard = true,
  mask = true,
  okText,
  onCancel,
  onOk,
  open,
  title,
  wrapClassName,
  children,
  ...props
}) => {
  return (
    <Modal
      title={title}
      centered={centered}
      closable={closable}
      keyboard={keyboard}
      okText={okText}
      onOk={onOk}
      onCancel={onCancel}
      cancelText={cancelText}
      mask={mask}
      maskClosable={maskClosable}
      wrapClassName={`app-modal ${wrapClassName}`}
      open={open}
      {...props}
    >
      {children}
    </Modal>
  );
};

export default AppModal;
