import { COMMON_TYPE_QUESTION } from "@/constants/common";
import { Radio } from "antd";
import { FC } from "react";

const TypeGroup: FC<{ handleChangeType: any; type: number }> = ({
  handleChangeType,
  type,
}) => {
  const onChange = (e: any) => {
    handleChangeType(e.target.value);
  };

  return (
    <Radio.Group
      className="types"
      onChange={onChange}
      options={Object.values(COMMON_TYPE_QUESTION)}
      value={type}
    />
  );
};

export default TypeGroup;
