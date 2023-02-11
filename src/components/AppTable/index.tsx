import { Table, Typography } from "antd";
import { FC, useEffect } from "react";
import AppBackPage from "../AppBackPage";

import { IAppTableProps, TableParams } from "./interface";

const { Text } = Typography;

import { TablePaginationConfig } from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { useState } from "react";

const AppTable: FC<IAppTableProps> = ({
  columns,
  dataSource,
  title,
  tableName,
  bordered,
  sortDirections,
  loading,
  scroll,
  rowSelection,
  sticky,
  onChangeParams,
  total,
  pageSize,
  needResetPage,
  onGoBack,
}) => {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    if (total) {
      setTableParams((prev: TableParams) => ({
        ...prev,
        pagination: { ...prev.pagination, total },
      }));
    }
  }, [total]);

  useEffect(() => {
    if (pageSize) {
      setTableParams((prev: TableParams) => ({
        ...prev,
        pagination: { ...prev.pagination, pageSize },
      }));
    }
  }, [pageSize]);

  useEffect(() => {
    if (needResetPage) {
      setTableParams((prev: TableParams) => ({
        ...prev,
        pagination: { ...prev.pagination, current: 1 },
      }));
    }
  }, [needResetPage]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<any>
  ) => {
    const newTableParams = {
      pagination,
      filters,
      sorter,
    };
    setTableParams(newTableParams);
    onChangeParams(newTableParams);
  };

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
        pagination={tableParams.pagination}
        onChange={handleTableChange as any}
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
