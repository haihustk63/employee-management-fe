import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES } from "@/constants/common";
import { useContext, useMemo } from "react";
import { TopicManagementContext } from "@/pages/test-topics";

const { TEXT, TEXTAREA, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { values, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;

  const { topicUpdateId } = useContext(TopicManagementContext) as any;

  const buttonTitle = useMemo(() => {
    if (topicUpdateId !== undefined) {
      return "Update";
    } else {
      return "Create";
    }
  }, [topicUpdateId]);

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="name"
        label="Name"
        value={values.name}
        type={TEXT}
        onChange={handleChange}
        placeholder="Enter topic name"
      />
      <FormItem
        name="description"
        label="Description"
        value={values.description}
        type={TEXTAREA}
        onChange={handleChange}
        placeholder="Your description here"
      />
      <AppButton buttonTitle={buttonTitle} htmlType="submit" />
    </Form>
  );
};

export default FormFields;
