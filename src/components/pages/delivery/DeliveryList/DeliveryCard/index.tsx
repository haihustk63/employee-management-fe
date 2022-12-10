import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

import AppButton from "@/components/AppButton";
import AppPrimaryCard from "@/components/AppCard/Primary";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import { useDeleteDelivery } from "@/hooks/delivery";

const { Text } = Typography;

const DeliveryCard: FC<{ delivery: any }> = ({ delivery }) => {
  const navigate = useNavigate();
  const { mutate: mutateDeleteDelivery } = useDeleteDelivery(delivery.id);

  const handleClickDeliveryCard = (deliveryId: number) => () => {
    navigate(`${APP_PAGE_NAME_ROUTES.EMPLOYEE_LIST}?delivery=${deliveryId}`);
  };

  return (
    <AppPrimaryCard
      title={delivery.name}
      onDelete={mutateDeleteDelivery}
      onClick={handleClickDeliveryCard(delivery.id)}
    >
      <Text>{delivery.name}</Text>
      <AppButton buttonTitle="Update" onClick={null} />
    </AppPrimaryCard>
  );
};

export default DeliveryCard;
