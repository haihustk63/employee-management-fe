import { TableParams } from "@/components/AppTable/interface";
import { formatTableParams, makeCleanObject } from "@/utils";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useTableParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<any>();
  const [needResetPage, setNeedResetPage] = useState(false);
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    setSearchParams(queryParams as any);
  }, [queryParams]);

  const onChangeTableParams = (tableParams: TableParams) => {
    const formattedTableParams = formatTableParams(tableParams);
    setNeedResetPage(false);
    const newQueryParams = makeCleanObject({
      ...removePreviousSorterFields(),
      ...formattedTableParams,
    });
    setQueryParams(newQueryParams as any);
  };

  const removePreviousSorterFields = () => {
    return Object.keys(queryParams || {}).reduce((acc: any, field: string) => {
      if (!/^[\w]+Sort$/g.test(field)) {
        acc[field] = queryParams?.[field];
        return acc;
      }
      return acc;
    }, {});
  };

  const resetPageParams = () => {
    setNeedResetPage(true);
  };

  return {
    searchParams,
    needResetPage,
    isInit,
    queryParams,
    onChangeTableParams,
    resetPageParams,
    setIsInit,
    setQueryParams,
  };
};
