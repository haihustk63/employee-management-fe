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
  rowSelection,
}) => {
  return (
    <div className="app-table">
      {tableName && (
        <div className="title">
          {onGoBack && <AppBackPage onBack={onGoBack} />}
          <Title level={3}>{tableName}</Title>
        </div>
      )}
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        title={title}
        pagination={pagination}
        onChange={onChange}
        bordered={bordered}
        sortDirections={sortDirections}
        scroll={scroll ? scroll : { x: true, y: 500 }}
        sticky={sticky}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default AppTable;
