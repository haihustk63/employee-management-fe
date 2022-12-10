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
  pagination = false,
  scroll,
  sticky,
  onGoBack,
}) => {
  console.log(loading)
  return (
    <div className="app-table">
      <div className="title">
        {onGoBack && <AppBackPage onBack={onGoBack} />}
        <Title level={3}>{tableName}</Title>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        title={title}
        pagination={pagination}
        onChange={onChange}
        bordered={bordered}
        sortDirections={sortDirections}
        scroll={scroll ? scroll : { x: true }}
        sticky={sticky}
      />
    </div>
  );
};

export default AppTable;
