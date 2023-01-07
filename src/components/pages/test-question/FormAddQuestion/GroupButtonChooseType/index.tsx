import React, { FC } from "react";
import AppButton from "@/components/AppButton";
import { COMMON_TYPE_QUESTION } from "@/constants/common";

const { essays, multipleChoice, oneChoice } = COMMON_TYPE_QUESTION;

const GroupButtonChooseType: FC<{ handleChangeType: any }> = ({
  handleChangeType,
}) => {
  return (
    <div>
      <AppButton
        buttonTitle="One Choice"
        onClick={handleChangeType(oneChoice.value)}
      />
      <AppButton
        buttonTitle="Multiple Choice"
        onClick={handleChangeType(multipleChoice.value)}
      />
      <AppButton
        buttonTitle="Essays"
        onClick={handleChangeType(essays.value)}
      />
    </div>
  );
};

export default GroupButtonChooseType;
