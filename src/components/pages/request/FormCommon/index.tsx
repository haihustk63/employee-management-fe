import { Typography } from "antd";
import { Formik } from "formik";
import { useContext } from "react";

import { RequestContext } from "@/pages/request/add-request";
import { IFormCommonProps } from "./interface";

const { Title } = Typography;

const FormCommon = <T,>(props: IFormCommonProps<T>) => {
  const { handleToShowResult } = useContext(RequestContext) as any;
  const { children, handleSubmitForm, initialValues, title } = props as any;

  const handleSubmitFormCommon = () => {
    handleSubmitForm();
    handleToShowResult();
  };

  return (
    <div className="request-form">
      <Title className="app-title" level={2}>
        {title}
      </Title>
      <Formik initialValues={initialValues} onSubmit={handleSubmitFormCommon}>
        {children}
      </Formik>
    </div>
  );
};

export default FormCommon;
