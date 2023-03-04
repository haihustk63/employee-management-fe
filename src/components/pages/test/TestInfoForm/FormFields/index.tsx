import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import { CREATE_TEST_MODE, FORM_ITEM_TYPES } from "@/constants/common";
import { CreateTestContext } from "@/pages/tests/create-test";
import { Radio, Typography } from "antd";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

const { TEXT, INPUT_NUMBER } = FORM_ITEM_TYPES;
const { Text } = Typography;

const FormFields = () => {
  const { testId } = useParams();
  const { values, handleSubmit, handleChange } = useFormikContext() as any;
  const {
    title,
    duration,
    mode,
    setTitle,
    setDuration,
    changeMode,
    toggleDrawer,
  } = useContext(CreateTestContext) as any;

  useEffect(() => {
    setTitle(values.title);
    setDuration(values.duration);
  }, [values]);

  return (
    <Form onSubmit={handleSubmit} className="form -horizontal">
      <FormItem
        name="title"
        label="Title"
        placeholder="Test title"
        value={title}
        type={TEXT}
        onChange={handleChange}
      />

      <FormItem
        name="duration"
        label="Duration (Minutes)"
        placeholder="Test duration"
        value={duration}
        min={0}
        type={INPUT_NUMBER}
      />

      {!testId && (
        <div>
          <Text className="form-label">Choose Mode</Text>
          <Radio.Group
            options={Object.values(CREATE_TEST_MODE)}
            onChange={changeMode}
            value={mode}
          />
        </div>
      )}
      {mode === CREATE_TEST_MODE.manual.value && (
        <AppButton
          buttonTitle="Show test info"
          onClick={toggleDrawer}
        />
      )}
    </Form>
  );
};

export default FormFields;
