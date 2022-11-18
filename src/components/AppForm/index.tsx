import { Typography } from "antd";
import { Formik } from "formik";
import { useContext } from "react";

import { RequestContext } from "@/pages/request/create-request";
import { IAppFormProps } from "./interface";

const { Title } = Typography;

const AppForm = <T,>(props: IAppFormProps<T>) => {
  const { handleToShowResult } = useContext(RequestContext) as any;
  const { children, handleSubmitForm, initialValues, title, innerRef } =
    props as any;

  const handleSubmitAppForm = () => {
    handleSubmitForm();
    handleToShowResult();
  };

  return (
    <div className="app-form">
      {title && (
        <Title className="app-title" level={2}>
          {title}
        </Title>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitAppForm}
        innerRef={innerRef}
      >
        {children}
      </Formik>
    </div>
  );
};

export default AppForm;
