import { Typography } from "antd";
import { Formik } from "formik";

import { IAppFormProps } from "./interface";

const { Title } = Typography;

const AppForm = <T,>(props: IAppFormProps<T>) => {
  const {
    children,
    handleSubmitForm,
    initialValues,
    title,
    innerRef,
    validationSchema,
  } = props as any;

  return (
    <div className="app-form">
      {title && (
        <Title className="app-title" level={2}>
          {title}
        </Title>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        innerRef={innerRef}
        validationSchema={validationSchema}
      >
        {children}
      </Formik>
    </div>
  );
};

export default AppForm;
