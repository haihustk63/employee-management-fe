import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { Pagination } from "antd";
import { FC } from "react";

const AppPagination: FC<{
  pageSize?: number;
  total?: number;
  current?: number;
  onChangePagination?: any;
}> = ({ pageSize = DEFAULT_PAGE_SIZE, total, onChangePagination, current }) => {
  return (
    <div className="app-pagination">
      <Pagination
        pageSize={pageSize}
        defaultPageSize={DEFAULT_PAGE_SIZE}
        total={total}
        current={current}
        onChange={onChangePagination}
      />
    </div>
  );
};

export default AppPagination;
