import { TablePaginationConfig } from "antd";
import { FilterValue, SorterResult, SortOrder } from "antd/es/table/interface";

export interface IAppTableProps {
  bordered?: boolean;
  columns?: any;
  dataSource?: object[];
  title?: any;
  tableName?: string;
  loading?: boolean;
  pagination?: any;
  rowKey?: any;
  scroll?: object;
  showSorterTooltip?: boolean;
  size?: "default" | "middle" | "small";
  sortDirections?: SortOrder[] | undefined;
  sticky?: boolean;
  rowSelection?: object;
  onChangeParams?: any;
  total?: number;
  pageSize?: number;
  needResetPage?: boolean;
  onGoBack?: () => void;
  onChange?: () => void;
  onHeaderRow?: () => void;
  onRow?: () => void;
}

export interface TableParams {
  pagination?: TablePaginationConfig;
  sorter?: SorterResult<any>;
  filters?: Record<string, FilterValue>;
}
