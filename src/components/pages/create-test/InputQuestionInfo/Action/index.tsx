import { Space } from "antd";
import { FC, useContext, useState } from "react";

import { AppInputNumber } from "@/components/AppFormField";
import AppTag from "@/components/AppTag";
import AppTooltip from "@/components/AppTooltip";
import { CreateTestContext } from "@/pages/tests/create-test";

const RenderAction: FC<{
  color?: string;
  max?: number;
  record?: any;
  level?: number;
}> = ({ color, max, record, level }) => {
  const [amount, setAmount] = useState(0);
  const { onSubmitQuestionInfo } = useContext(CreateTestContext) as any;

  const handleChangeAmount = (value: number) => {
    setAmount(value);
    onSubmitQuestionInfo({ topicId: record.id, level, amount: value });
  };

  return (
    <Space size={"small"}>
      <AppTooltip
        title="This tag shows max amount of question you can set"
        trigger={["hover"]}
      >
        <>
          <AppTag color="blue">{max}</AppTag>
        </>
      </AppTooltip>

      <AppInputNumber
        min={0}
        max={max}
        onChange={handleChangeAmount}
        value={amount}
      />
    </Space>
  );
};

export default RenderAction;
