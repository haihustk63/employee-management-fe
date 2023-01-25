import { Typography } from "antd";
import { useFormikContext } from "formik";
import { FC, useMemo } from "react";

import AppButton from "@/components/AppButton";
import { AppCheckboxGroup, AppRadioGroup } from "@/components/AppFormField";
import { COMMON_TYPE_QUESTION } from "@/constants/common";
import { createUniqueId } from "@/helpers";

const { Text } = Typography;

const { essays, multipleChoice, oneChoice } = COMMON_TYPE_QUESTION;

const FormAddChoices: FC = () => {
  const { setFieldValue, values } = useFormikContext() as any;

  const ShowChoices = useMemo(() => {
    switch (values.type) {
      case multipleChoice.value:
        return AppCheckboxGroup;
      case oneChoice.value:
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
      <AppButton
        buttonTitle="Add choice"
        onClick={handleAddChoice}
      />
    </div>
  );
};

export default FormAddChoices;
