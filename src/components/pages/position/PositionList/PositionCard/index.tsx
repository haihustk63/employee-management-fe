import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { FC, useContext } from "react";

import AppButton from "@/components/AppButton";
import AppPrimaryCard from "@/components/AppCard/Primary";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import { useDeleteDelivery } from "@/hooks/delivery";
import { mergeName } from "@/utils";
import { useDeletePosition } from "@/hooks/position";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { PositionManagementContext } from "@/pages/position";
import { showDeleteConfirm } from "@/components/AppConfirm";

const { Text } = Typography;

const PositionCard: FC<{ position: any }> = ({ position }) => {
  const navigate = useNavigate();

  const { handleSetPositionUpdateId, handleToggleModal } = useContext(
    PositionManagementContext
  ) as any;

  const {
    mutate: deletePosition,
    isError,
    isSuccess,
  } = useDeletePosition(position.id);

  useTriggerNoti({
    isSuccess,
    isError,
    messageSuccess: `Delete position ${position.name} successfully `,
  });

  const handleClickPositionCard = (positionId: number) => () => {
    navigate(`${APP_PAGE_NAME_ROUTES.EMPLOYEE_LIST}?position=${positionId}`);
  };

  const handleClickUpdate = (e: any) => {
    handleSetPositionUpdateId(position.id);
    handleToggleModal();
  };

  const handleDelete = () => {
    showDeleteConfirm({ onDelete: deletePosition });
  };

  return (
    <AppPrimaryCard
      title={position.name}
      onClick={handleClickPositionCard(position.id)}
      className="position-card"
    >
      <Text className="description">{position.description}</Text>
      <div className="actions">
        <AppButton buttonTitle="Update" onClick={handleClickUpdate} />
        <AppButton
          buttonTitle="View employee"
          onClick={handleClickPositionCard(position.id)}
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

export default PositionCard;
