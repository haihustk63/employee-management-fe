import AddNewDelivery from "@/components/pages/delivery/AddNewDelivery";
import DeliveryList from "@/components/pages/delivery/DeliveryList";
import React from "react";

const DeliveryManagement = () => {
  return (
    <div className="delivery-management">
      <AddNewDelivery />
      <DeliveryList />
    </div>
  );
};

export default DeliveryManagement;
