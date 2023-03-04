import { Typography } from "antd";
import { FC, useContext } from "react";

import AppButton from "@/components/AppButton";
import { PositionManagementContext } from "@/pages/position";
import PositionCard from "./PositionCard";

const { Text } = Typography;

const PositionList: FC = () => {
  const { data = [], handleToggleModal } = useContext(
    PositionManagementContext
  ) as any;

  return (
    <div className="position-list">
      <div className="title">
        <Text className="app-title">Position Management</Text>
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
