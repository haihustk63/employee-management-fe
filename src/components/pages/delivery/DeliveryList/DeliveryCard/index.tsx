import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

import AppButton from "@/components/AppButton";
import AppPrimaryCard from "@/components/AppCard/Primary";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import { useDeleteDelivery } from "@/hooks/delivery";
import { mergeName } from "@/utils";
import { showDeleteConfirm } from "@/components/AppConfirm";

const { Text } = Typography;

const DeliveryCard: FC<{ delivery: any }> = ({ delivery }) => {
  const navigate = useNavigate();
  const { mutate: deleteDelivery } = useDeleteDelivery(delivery.id);

  const handleClickDeliveryCard = (deliveryId: number) => () => {
    navigate(`${APP_PAGE_NAME_ROUTES.EMPLOYEE_LIST}?delivery=${deliveryId}`);
  };

  const handleDelete = () => {
    showDeleteConfirm({ onDelete: deleteDelivery });
  };

  return (
    <AppPrimaryCard
      title={delivery.name}
      onClick={handleClickDeliveryCard(delivery.id)}
      className="delivery-card"
    >
      <Text className="description">
        Manager: {mergeName(delivery?.deliveryEmployee?.[0]?.employee)}
      </Text>
      <div className="actions">
        <AppButton buttonTitle="Update" onClick={null} />
        <AppButton
          buttonTitle="View employee"
          onClick={handleClickDeliveryCard(delivery.id)}
        />
        <AppButton
          buttonTitle="Delete"
          onClick={handleDelete}
          className="-danger"
        />
      </div>
    </AppPrimaryCard>
  );
};

export default DeliveryCard;
