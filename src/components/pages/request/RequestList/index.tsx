import { Typography } from "antd";

import AppPrimaryCard from "@/components/AppCard/Primary";
import { REQUEST_LIST } from "@/constants/request";
import { FC } from "react";

const { Text } = Typography;

const RequestList: FC<{ next?: Function }> = ({ next }) => {
  const handleClickRequestCard = () => {
    if (next) {
      next();
    }
  };

  return (
    <div className="request-page-list">
      {REQUEST_LIST.map(({ title, typeGroup, description }) => {
        return (
          <AppPrimaryCard
            hasBoxShadow
            title={title}
            onClick={handleClickRequestCard}
          >
            <Text>{description}</Text>
          </AppPrimaryCard>
        );
      })}
    </div>
  );
};

export default RequestList;
