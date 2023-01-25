import { FormikValues } from "formik";

export interface IAppFormProps<T> {
  initialValues: T & FormikValues;
  handleSubmitForm?: any;
  title?: string;
  children?: any;
  innerRef?: any;
  validationSchema?: any;
  className?: string;
}
