import { FC } from "react";
import { Field } from "formik";
import { Input, Select } from "antd";

import { IFieldProps, IFormItemProps } from "./interface";

import { FORM_ITEM_TYPES } from "@/constants/common";

const { TEXT, TEXTAREA, SELECT } = FORM_ITEM_TYPES;

const { TextArea } = Input;

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
  return (
    <Select {...field} {...props} onChange={handleChange} className="select" />
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

const FormItem: FC<IFormItemProps> = ({ name, type, label, ...props }) => {
  const renderComponent = renderFormItemComponent(type);
  return (
    <div className="form-item">
      {label && <label htmlFor={name}>{label}</label>}
      <Field name={name} type={type} {...props} component={renderComponent} />
    </div>
  );
};

export default FormItem;
