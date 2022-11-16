import { Typography } from "antd";

import AppPrimaryCard from "@/components/AppCard/Primary";
import { REQUEST_LIST } from "@/constants/request";
import { FC } from "react";

const { Text } = Typography;

const RequestList: FC<{ setType: Function }> = ({ setType }) => {
  const handleClickRequestCard = (type: string) => () => {
    setType(type);
  };

  return (
    <div className="request-page-list">
      {REQUEST_LIST.map(({ type, description }, index: number) => {
        return (
          <AppPrimaryCard
            hasBoxShadow
            title={type}
            onClick={handleClickRequestCard(type)}
            key={index}
          >
            <Text>{description}</Text>
          </AppPrimaryCard>
        );
      })}
    </div>
  );
};

export default RequestList;
