import { TablePaginationConfig } from "antd";
import { SortOrder } from "antd/es/table/interface";

export interface IAppTableProps {
  bordered?: boolean;
  columns?: any;
  dataSource?: object[];
  title?: any;
  tableName?: string;
  loading?: boolean;
  pagination?: false | TablePaginationConfig | undefined;
  rowKey?: any;
  scroll?: object;
  showSorterTooltip?: boolean;
  size?: "default" | "middle" | "small";
  sortDirections?: SortOrder[] | undefined;
  sticky?: boolean;
  onGoBack?: () => void;
  onChange?: () => void;
  onHeaderRow?: () => void;
  onRow?: () => void;
}
