import { FC, ReactNode } from "react";
import { ErrorMessage, Field } from "formik";
import { Input, Select, Typography } from "antd";

import { IFieldProps, IFormItemProps } from "./interface";
import { FORM_ITEM_TYPES } from "@/constants/common";

const { TEXT, TEXTAREA, SELECT } = FORM_ITEM_TYPES;
const { TextArea } = Input;
const { Text } = Typography;

const InputField = ({ field, form, ...props }: IFieldProps) => {
  return <Input {...field} {...props} className="input" />;
};

const TextAreaField = ({ field, form, ...props }: IFieldProps) => {
  return <TextArea {...field} {...props} className="textarea" />;
};

const SelectField = ({ field, form, ...props }: IFieldProps) => {
  const handleChange = (value: any) => {
    form.setFieldValue(field.name, value);
  };

  const { onChange: handleChangeProp } = props as any;

  return (
    <Select
      {...field}
      {...props}
      allowClear
      onChange={handleChangeProp || handleChange}
      className="select"
    />
  );
};

const renderFormItemComponent = (type: any) => {
  switch (type) {
    case TEXT: {
      return InputField;
    }

    case SELECT: {
      return SelectField;
    }

    case TEXTAREA: {
      return TextAreaField;
    }

    default: {
      return InputField;
    }
  }
};

const renderErrorMessage = (message: string) => {
  return <Text className="form-field-error-message">{message}</Text>;
};

const FormItem: FC<IFormItemProps> = ({
  name,
  type,
  label,
  ...props
}) => {
  const renderComponent = renderFormItemComponent(type);

  return (
    <div className="form-item">
      {label && <label htmlFor={name}>{label}</label>}
      <Field name={name} type={type} {...props} component={renderComponent} />
      <ErrorMessage render={renderErrorMessage} name={name} />
    </div>
  );
};

export default FormItem;
