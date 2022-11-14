import { ColumnsType } from "antd/lib/table";

export interface IAppTableProps {
  bordered?: boolean;
  columns?: any;
  dataSource?: object[];
  loading?: boolean;
  pagination?: object;
  rowKey?: any;
  scroll?: object;
  showSorterTooltip?: boolean;
  size?: "default" | "middle" | "small";
  sortDirections?: string[];
  sticky?: boolean;
  onChange?: () => void;
  onHeaderRow?: () => void;
  onRow?: () => void;
}
