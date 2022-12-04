import AddNewDeliveryModal from "@/components/pages/delivery/AddNewDelivery";
import DeliveryList from "@/components/pages/delivery/DeliveryList";
import { useGetAllDeliveries } from "@/hooks/delivery";
import { useState } from "react";

const DeliveryManagement = () => {
  const { data, isFetching, isLoading } = useGetAllDeliveries();
  const [openAddNewModal, setOpenAddNewModal] = useState(false);

  const handleToggleAddNewModal = () => {
    setOpenAddNewModal(!openAddNewModal);
  };

  return (
    <div className="delivery-management">
      <AddNewDeliveryModal
        showModal={openAddNewModal}
        onToggleModal={handleToggleAddNewModal}
      />
      <DeliveryList data={data} onToggleModal={handleToggleAddNewModal} />
    </div>
  );
};

export default DeliveryManagement;
