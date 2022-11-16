import { Table, Typography } from "antd";
import { FC } from "react";
import AppBackPage from "../AppBackPage";

import { IAppTableProps } from "./interface";

const { Title } = Typography;

const AppTable: FC<IAppTableProps> = ({
  columns,
  dataSource,
  title,
  tableName,
  bordered,
  sortDirections,
  loading,
  onChange,
  pagination,
  scroll,
  sticky,
  onGoBack,
}) => {
  return (
    <div className="app-table">
      <div className="title">
        {onGoBack && <AppBackPage onBack={onGoBack} />}
        <Title level={3}>{tableName}</Title>
      </div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default AppTable;
