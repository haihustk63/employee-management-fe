export interface ITableDataProps {
  dataSource?: {
    data: any[];
    [key: string]: any;
  };
  currentPage?: number;
  loading?: boolean;
  rowSelection?: object;
  allowDelete?: boolean;
  needResetPage?: boolean;
}

export interface IModalControlProps {
  showModal?: boolean;
  onToggleModal?: () => void;
}
