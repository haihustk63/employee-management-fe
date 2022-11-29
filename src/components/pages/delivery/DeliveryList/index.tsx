import AppTable from "@/components/AppTable";
import { deliveryListColumns } from "@/constants/columns";
import { ITableDataProps } from "@/constants/interface";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const DeliveryList: FC<ITableDataProps> = ({
  dataSource,
  loading,
  currentPage = 0,
}) => {
  const navigate = useNavigate();

  const handleToggleShowListEmployees = (deliveryId: any) => () => {
    navigate(`${APP_PAGE_NAME_ROUTES.EMPLOYEE_LIST}?delivery=${deliveryId}`);
  };

  return (
    <div className="delivery-list">
      <AppTable
        columns={deliveryListColumns(
          handleToggleShowListEmployees,
          currentPage
        )}
        dataSource={dataSource}
        tableName="List Deliveries"
        loading={loading}
      />
    </div>
  );
};

export default DeliveryList;
