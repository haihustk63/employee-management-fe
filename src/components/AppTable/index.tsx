import { Table, Typography } from "antd";
import { FC } from "react";
import AppBackPage from "../AppBackPage";

import { IAppTableProps } from "./interface";

const { Text } = Typography;

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
          <Text className="app-title">{tableName}</Text>
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
        scroll={scroll ? { ...scroll, y: 500 } : { y: 500 }}
        sticky={sticky}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default AppTable;
