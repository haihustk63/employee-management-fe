import { Typography } from "antd";
import { Formik } from "formik";
import cx from "classnames";

import { IAppFormProps } from "./interface";

const { Text } = Typography;

const AppForm = <T,>({
  children,
  handleSubmitForm,
  initialValues,
  title,
  innerRef,
  validationSchema,
  className,
}: IAppFormProps<T>) => {
  return (
    <div className={cx("app-form", className)}>
      {title && <Text className="app-title">{title}</Text>}
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
