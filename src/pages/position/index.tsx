import AddNewPositionModal from "@/components/pages/position/AddNewPosition";
import PositionList from "@/components/pages/position/PositionList";
import { useGetAllPositions } from "@/hooks/position";
import useModal from "@/hooks/useModal";
import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const PositionManagementContext = createContext({}) as any;

const PositionManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isFetching, isLoading } = useGetAllPositions();
  const { showModal, handleToggleModal: onToggleModal } = useModal();
  const [positionUpdateId, setPositionUpdateId] = useState<string | number>();

  useEffect(() => {
    const modal = searchParams.get("modal");
    if (modal) {
      onToggleModal();
      setSearchParams({});
    }
  }, [searchParams]);

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
