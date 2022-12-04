export interface IAppFormProps<T> {
  initialValues?: T;
  handleSubmitForm?: any;
  title?: string;
  children?: any;
  innerRef?: any;
  validationSchema?: any;
}
