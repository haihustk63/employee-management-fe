import { Table } from "antd";
import { FC } from "react";

import { IAppTableProps } from "./interface";

const AppTable: FC<IAppTableProps> = ({
  columns,
  dataSource,
  bordered,
  sortDirections,
  loading,
  onChange,
  pagination,
  scroll,
  sticky,
}) => {
  return <Table columns={columns} dataSource={dataSource} />;
};

export default AppTable;
