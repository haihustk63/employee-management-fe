import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { Typography } from "antd";

import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import AppButton from "@/components/AppButton";
import AppPrimaryCard from "@/components/AppCard/Primary";
import { IDeliveryListProps } from "./interface";

const { Text, Title } = Typography;

const DeliveryList: FC<IDeliveryListProps> = ({ data, onToggleModal }) => {
  const navigate = useNavigate();

  const handleClickDeliveryCard = (deliveryId: any) => () => {
    navigate(`${APP_PAGE_NAME_ROUTES.EMPLOYEE_LIST}?delivery=${deliveryId}`);
  };

  return (
    <div className="delivery-list">
      <div className="title">
        <Title level={3}>Deliveries</Title>
        <AppButton
          buttonTitle="Add delivery"
          size="small"
          onClick={onToggleModal}
        />
      </div>
      <div className="list">
        {data?.map((delivery: any, index: number) => {
          return (
            <AppPrimaryCard key={index} title={delivery.name}>
              <Text>{delivery.name}</Text>
              <AppButton
                buttonTitle="View Delivery List"
                onClick={handleClickDeliveryCard(delivery.id)}
              />
            </AppPrimaryCard>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryList;
