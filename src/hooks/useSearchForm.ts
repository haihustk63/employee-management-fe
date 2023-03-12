import debounce from "lodash/debounce";
import { useEffect, useMemo, useState } from "react";
import { makeCleanObject } from "@/utils";

export const useSearchForm = ({
  queryParams,
  values,
  setQueryParams,
  handleChange,
  resetPageParams,
  setFieldValue,
}: any) => {
  const [isKeywordChange, setIsKeywordChange] = useState(false);

  const handleSetQueryParams = (field: string) => (value: any) => {
    const params = { ...queryParams, [field]: value };
    const pureParams = makeCleanObject(params);
    setQueryParams(pureParams);
  };

  useEffect(() => {
    if (isKeywordChange) {
      handleSetQueryParams("keyword")(values.keyword);
      resetPageParams();
      setIsKeywordChange(false);
    }
  }, [isKeywordChange]);

  const handleSetKeywordChange = () => {
    setIsKeywordChange(true);
  };

  const debounceSetKeywordParams = useMemo(
    () => debounce(handleSetKeywordChange, 500),
    []
  );

  useEffect(() => {
    return () => {
      debounceSetKeywordParams.cancel();
    };
  }, []);

  const handleChangeKeyword = (e: any) => {
    handleChange(e);
    debounceSetKeywordParams();
  };

  const handleChangeOtherValue = (field: string) => (value: string) => {
    setFieldValue(field, value);
    resetPageParams();
    handleSetQueryParams(field)(value);
  };

  return {
    handleChangeKeyword,
    handleChangeOtherValue,
  };
};
