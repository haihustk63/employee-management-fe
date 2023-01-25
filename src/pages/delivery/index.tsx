import AddNewDeliveryModal from "@/components/pages/delivery/AddNewDelivery";
import DeliveryList from "@/components/pages/delivery/DeliveryList";
import { useGetAllDeliveries } from "@/hooks/delivery";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DeliveryManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isFetching, isLoading } = useGetAllDeliveries();
  const [openAddNewModal, setOpenAddNewModal] = useState(false);

  useEffect(() => {
    if (searchParams.get("modal")) {
      setOpenAddNewModal(true);
      setSearchParams({});
    }
  }, [searchParams]);

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
