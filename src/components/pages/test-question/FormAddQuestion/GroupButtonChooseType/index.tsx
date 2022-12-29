import React, { FC } from "react";
import AppButton from "@/components/AppButton";
import { COMMON_TYPE_QUESTION } from "@/constants/common";

const { ESSAYS, MULTIPLE_CHOICE, ONE_CHOICE } = COMMON_TYPE_QUESTION;

const GroupButtonChooseType: FC<{ handleChangeType: any }> = ({
  handleChangeType,
}) => {
  return (
    <div>
      <AppButton
        buttonTitle="Multiple Choice"
        onClick={handleChangeType(MULTIPLE_CHOICE)}
      />
      <AppButton
        buttonTitle="One Choice"
        onClick={handleChangeType(ONE_CHOICE)}
      />
      <AppButton buttonTitle="Essays" onClick={handleChangeType(ESSAYS)} />
    </div>
  );
};

export default GroupButtonChooseType;
