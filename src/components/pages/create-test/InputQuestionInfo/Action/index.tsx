import { FC, useState } from "react";
import { Space } from "antd";

import AppButton from "@/components/AppButton";
import AppTag from "@/components/AppTag";
import AppTooltip from "@/components/AppTooltip";
import { AppInputNumber } from "@/components/AppFormField";

const RenderAction: FC<{
  color?: string;
  max?: number;
  onSubmitQuestionInfo?: any;
}> = ({ color, max, onSubmitQuestionInfo }: any) => {
  const [amount, setAmount] = useState(0);

  // const handleIncrease = () => {
  //   const newAmount = amount === max ? amount : amount + 1;
  //   setAmount(newAmount);
  //   onSubmitQuestionInfo(newAmount);
  // };

  // const handleDecrease = () => {
  //   const newAmount = amount === 0 ? 0 : amount - 1;
  //   setAmount(newAmount);
  //   onSubmitQuestionInfo(newAmount);
  // };

  const handleChangeAmount = (value: number) => {
    setAmount(value);
    onSubmitQuestionInfo(value);
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
      {/* <AppTooltip
        title="This tag shows your current amount of questions"
        trigger={["hover"]}
      >
        <>
          <AppTag color={color}>{amount}</AppTag>
        </>
      </AppTooltip> */}

      <AppInputNumber
        min={0}
        max={max}
        onChange={handleChangeAmount}
        value={amount}
      />

      {/* <AppButton
        disabled={amount === max}
        buttonTitle="Increase"
        onClick={handleIncrease}
      />
      <AppButton
        disabled={amount === 0}
        buttonTitle="Decrease"
        onClick={handleDecrease}
      /> */}
    </Space>
  );
};

export default RenderAction;
