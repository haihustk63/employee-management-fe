import { Typography } from "antd";
import { FC } from "react";

import AppButton from "@/components/AppButton";
import DeliveryCard from "./DeliveryCard";
import { IDeliveryListProps } from "./interface";

const { Text } = Typography;

const DeliveryList: FC<IDeliveryListProps> = ({ data, onToggleModal }) => {

  return (
    <div className="delivery-list">
      <div className="title">
        <Text className="app-title">Deliveries</Text>
        <AppButton
          buttonTitle="Add delivery"
          size="small"
          onClick={onToggleModal}
        />
      </div>
      <div className="list">
        {data?.map((delivery: any, index: number) => {
          return <DeliveryCard delivery={delivery} key={delivery.id} />;
        })}
      </div>
    </div>
  );
};

export default DeliveryList;
