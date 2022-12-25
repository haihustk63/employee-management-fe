import { Typography } from "antd";
import { FC, useContext } from "react";

import AppButton from "@/components/AppButton";
import PositionCard from "./PositionCard";
import { PositionManagementContext } from "@/pages/position";

const { Text, Title } = Typography;

const PositionList: FC = () => {
  const { data = [], handleToggleModal } = useContext(
    PositionManagementContext
  ) as any;

  return (
    <div className="position-list">
      <div className="title">
        <Title level={3}>Positions</Title>
        <AppButton
          buttonTitle="Add position"
          size="small"
          onClick={handleToggleModal}
        />
      </div>
      <div className="list">
        {data?.map((position: any, index: number) => {
          return <PositionCard position={position} key={index} />;
        })}
      </div>
    </div>
  );
};

export default PositionList;
