import { FC } from "react";
import { Field } from "formik";
import { Input, Select } from "antd";

import { IFieldProps, IFormItemProps } from "./interface";

import { FORM_ITEM_TYPES } from "@/constants/common";

const { TEXT, TEXTAREA, SELECT } = FORM_ITEM_TYPES;

const { TextArea } = Input;

const InputField = ({ field, form, ...props }: IFieldProps) => {
  return <Input {...field} {...props} />;
};

const SelectField = ({ field, form, ...props }: IFieldProps) => {
  return <Select {...field} {...props} />;
};

const renderFormItemComponent = (type: any) => {
  switch (type) {
    case TEXT: {
      return InputField;
    }

    case SELECT: {
      return SelectField;
    }

    default: {
      return InputField;
    }
  }
};

const FormItem: FC<IFormItemProps> = ({ name, type, label, ...props }) => {
  const renderComponent = renderFormItemComponent(type);
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field name={name} type={type} {...props} component={renderComponent} />
    </>
  );
};

export default FormItem;
