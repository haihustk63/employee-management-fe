import { useState } from "react";

const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return {
    showModal,
    handleToggleModal,
  };
};

export default useModal;
