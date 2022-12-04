export interface ITableDataProps {
  dataSource?: any[];
  currentPage?: number;
  loading?: boolean;
}

export interface IModalControlProps {
  showModal?: boolean;
  onToggleModal?: () => void;
}
