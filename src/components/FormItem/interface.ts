import { FieldInputProps } from "formik";
import { ReactNode } from "react";

export interface IFormItemProps {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  suffix?: ReactNode;
  maxLength?: number;
  disabled?: boolean;
  allowClear?: boolean;
  onChange?: any;
  onBlur?: any;
  onClear?: any;
  clearIcon?: ReactNode;
  options?: { label: string; value: any }[];
  defaultValue?: string | string[];
  popupClassName?: string;
  dropdownMatchSelectWidth?: boolean | number;
  dropdownRender?: (originNode: ReactNode) => ReactNode;
  loading?: boolean;
  onPopupScroll?: any;
  onSelect?: any;
}

export interface IFieldProps {
  field: any;
  form: any;
  props: any;
}
