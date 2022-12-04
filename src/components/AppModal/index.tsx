import { Modal } from "antd";
import { FC } from "react";
import { IAppModalProps } from "./interface";

const AppModal: FC<IAppModalProps> = ({
  afterClose,
  bodyStyle,
  cancelText = "Cancel",
  centered = false,
  closable = true,
  maskClosable = true,
  closeIcon,
  confirmLoading,
  destroyOnClose,
  footer,
  keyboard = true,
  mask = true,
  maskStyle,
  okText,
  okType,
  onCancel,
  onOk,
  open,
  title,
  wrapClassName,
  zIndex,
  children,
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
      wrapClassName="app-modal"
      open={open}
    >
      {children}
    </Modal>
  );
};

export default AppModal;
