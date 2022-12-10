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

const { Text } = Typography;

const FormAddChoices: FC<{
  questionType: "ONE_CHOICE" | "MULTIPLE_CHOICE";
}> = ({ questionType }) => {
  const { setFieldValue, values } = useFormikContext() as any;
  const [choice, setChoice] = useState("");

  const Choices = useMemo(() => {
    switch (questionType) {
      case "ONE_CHOICE":
        return AppRadioGroup;
      case "MULTIPLE_CHOICE":
        return AppCheckboxGroup;
    }
  }, [questionType]);

  const handleAddChoice = () => {
    setFieldValue("options", [
      ...values.options,
      {
        id: createUniqueId(),
        choice,
      },
    ]);
    setChoice("");
  };

  const handleChangeTextChoice = (e: any) => {
    setChoice(e.target.value);
  };

  const handleChangeAnswer = (e: any) => {
    if (e.target) {
      setFieldValue("answer", e.target.value);
    } else {
      setFieldValue("answer", e);
    }
  };

  const handleDeleteChoice = (optionId: number) => () => {
    const newOptions = values.options.filter(
      (option: any) => option.id !== optionId
    );

    if (typeof values.answer === "object") {
      const newAnswers = values.answer.filter(
        (answer: any) => answer !== optionId
      );
      setFieldValue("answer", newAnswers);
    }

    setFieldValue("options", newOptions);
  };

  return (
    <div className="form-add-one-choice-question">
      <AppInput
        placeholder="Enter choice"
        value={choice}
        onChange={handleChangeTextChoice}
      />
      <AppButton
        buttonTitle="Add choice"
        onClick={handleAddChoice}
        disabled={!choice}
      />
      <div className="options">
        <Choices
          options={values.options}
          onChange={handleChangeAnswer}
          value={values.answer}
          onDeleteOption={handleDeleteChoice}
        />
      </div>
    </div>
  );
};

export default FormAddChoices;
