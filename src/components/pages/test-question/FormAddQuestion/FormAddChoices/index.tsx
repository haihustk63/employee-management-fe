import { useFormikContext } from "formik";
import { FC, useMemo, useState } from "react";
import { Typography } from "antd";

import AppButton from "@/components/AppButton";
import {
  AppCheckboxGroup,
  AppInput,
  AppRadioGroup,
} from "@/components/AppFormField";
import { createUniqueId } from "@/helpers";
import { COMMON_TYPE_QUESTION } from "@/constants/common";

const { Text } = Typography;

const FormAddChoices: FC = () => {
  const { setFieldValue, values } = useFormikContext() as any;

  const ShowChoices = useMemo(() => {
    switch (values.type) {
      case COMMON_TYPE_QUESTION.MULTIPLE_CHOICE:
        return AppCheckboxGroup;
      case COMMON_TYPE_QUESTION.ONE_CHOICE:
        return AppRadioGroup;
      default:
        return AppCheckboxGroup;
    }
  }, [values.type]);

  const handleChangeAnswer = (e: any) => {
    if (e.target) {
      setFieldValue("answer", e.target.value);
    } else {
      setFieldValue("answer", e);
    }
  };

  const handleDeleteAnswer = (optionId: number) => () => {
    const newOptions = values?.options?.filter(
      (option: any) => option.id !== optionId
    );
    setFieldValue("options", newOptions);
  };

  const handleChangeAnswerInput = (optionId: number) => (e: any) => {
    const newOptions = [...values?.options];
    let optionIndex = newOptions.findIndex(
      (option: any) => option.id === optionId
    );
    if (optionIndex >= 0) {
      newOptions[optionIndex].choice = e.target.value;
      console.log(newOptions);
      setFieldValue("options", newOptions);
    }
  };

  const handleAddChoice = () => {
    const newOption = {
      id: createUniqueId(),
      choice: "",
    };
    setFieldValue("options", [...values?.options, newOption]);
  };

  return (
    <div className="form-add-choice">
      <ShowChoices
        isEditable
        nameInput="choice"
        onChange={handleChangeAnswer}
        options={values.options}
        value={values.answer}
        onChangeInput={handleChangeAnswerInput}
        onDeleteOption={handleDeleteAnswer}
      />
      <AppButton buttonTitle="Add choice" onClick={handleAddChoice} />
    </div>
  );
};

export default FormAddChoices;
