import AddNewDeliveryModal from "@/components/pages/delivery/AddNewDelivery";
import DeliveryList from "@/components/pages/delivery/DeliveryList";
import {
  useCreateDelivery,
  useGetAllDeliveries,
  useUpdateDelivery
} from "@/hooks/delivery";
import useModal from "@/hooks/useModal";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { createContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const DeliveryManagementContext = createContext({});

const DeliveryManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data: deliveries = [],
    isFetching,
    isLoading,
  } = useGetAllDeliveries();
  const [deliveryUpdateId, setDeliveryUpdateId] = useState<any>();
  const { showModal, handleToggleModal } = useModal();

  const {
    mutate: createDelivery,
    isError: createDeliveryError,
    isSuccess: createDeliverySuccess,
  } = useCreateDelivery();

  const {
    mutate: updateDelivery,
    isError: updateDeliveryError,
    isSuccess: updateDeliverySuccess,
  } = useUpdateDelivery(deliveryUpdateId);

  const deliveryUpdateInfo = useMemo(() => {
    return deliveries?.find(
      (delivery: any) => delivery.id === deliveryUpdateId
    );
  }, [deliveryUpdateId, deliveries]);

  const onToggleModal = () => {
    if (showModal) setDeliveryUpdateId("");
    handleToggleModal();
  };

  useTriggerNoti({
    isSuccess: createDeliverySuccess,
    isError: createDeliveryError,
    messageSuccess: "Delivery added successfully",
  });

  useTriggerNoti({
    isSuccess: updateDeliverySuccess,
    isError: updateDeliveryError,
    messageSuccess: "Delivery is updated successfully",
    callbackSuccess: onToggleModal,
  });

  useEffect(() => {
    if (searchParams.get("modal")) {
      handleToggleModal();
      setSearchParams({});
    }
  }, [searchParams]);

  useEffect(() => {
    if (deliveryUpdateInfo) {
      handleToggleModal();
    }
  }, [deliveryUpdateInfo]);

  return (
    <DeliveryManagementContext.Provider
      value={{
        deliveryUpdateId,
        deliveryUpdateInfo,
        setDeliveryUpdateId,
        createDelivery,
        updateDelivery,
      }}
    >
      <div className="delivery-management">
        <AddNewDeliveryModal
          showModal={showModal}
          onToggleModal={onToggleModal}
        />
        <DeliveryList data={deliveries} onToggleModal={onToggleModal} />
      </div>
    </DeliveryManagementContext.Provider>
  );
};

export default DeliveryManagement;
