import AddNewDelivery from "@/components/pages/delivery/AddNewDelivery";
import DeliveryList from "@/components/pages/delivery/DeliveryList";
import { useGetAllDeliveries } from "@/hooks/delivery";

const DeliveryManagement = () => {
  const { data, isFetching, isLoading } = useGetAllDeliveries();

  return (
    <div className="delivery-management">
      <AddNewDelivery />
      <DeliveryList dataSource={data} loading={isFetching || isLoading} />
    </div>
  );
};

export default DeliveryManagement;
