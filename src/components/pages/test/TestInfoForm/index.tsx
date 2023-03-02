import AppForm from "@/components/AppForm";
import { testInfoSchema } from "@/schemas";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import FormFields from "./FormFields";
import { ITestInfoFormProps } from "./interface";

const initialValues: ITestInfoFormProps = {
  title: "",
  duration: 30,
};

const TestInfoForm = () => {
  const { testId } = useParams();

  const formTitle = useMemo(() => {
    return testId ? "Update test" : "New test";
  }, [testId]);

  return (
    <AppForm<ITestInfoFormProps>
      initialValues={initialValues}
      handleSubmitForm={null}
      validationSchema={testInfoSchema}
      title={formTitle}
    >
      <FormFields />
    </AppForm>
  );
};

export default TestInfoForm;
