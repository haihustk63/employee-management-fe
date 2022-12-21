export interface ITableDataProps {
  dataSource?: any[];
  currentPage?: number;
  loading?: boolean;
  rowSelection?: object;
}

export interface IModalControlProps {
  showModal?: boolean;
  onToggleModal?: () => void;
}
