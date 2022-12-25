import AddNewPositionModal from "@/components/pages/position/AddNewPosition";
import PositionList from "@/components/pages/position/PositionList";
import { useGetAllPositions } from "@/hooks/position";
import useModal from "@/hooks/useModal";
import { createContext, useState } from "react";

export const PositionManagementContext = createContext({}) as any;

const PositionManagement = () => {
  const { data, isFetching, isLoading } = useGetAllPositions();
  const { showModal, handleToggleModal: onToggleModal } = useModal();
  const [positionUpdateId, setPositionUpdateId] = useState<string | number>();

  const handleSetPositionUpdateId = (positionId: string | number) => {
    setPositionUpdateId(positionId);
  };

  const handleToggleModal = () => {
    if (showModal) {
      setPositionUpdateId(undefined);
    }
    onToggleModal();
  };

  return (
    <PositionManagementContext.Provider
      value={{
        data,
        showModal,
        positionUpdateId,
        handleToggleModal,
        handleSetPositionUpdateId,
      }}
    >
      <div className="position-management">
        <AddNewPositionModal />
        <PositionList />
      </div>
    </PositionManagementContext.Provider>
  );
};

export default PositionManagement;
