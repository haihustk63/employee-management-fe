import { FieldInputProps } from "formik";
import { ReactNode } from "react";

export interface IFormItemProps {
  name?: string;
  label?: string | ReactNode;
  mode?: "multiple" | "tags";
  placeholder?: string;
  value?: string | number;
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
  showSearch?: boolean;
  dropdownRender?: (originNode: ReactNode) => ReactNode;
  loading?: boolean;
  onPopupScroll?: any;
  onSelect?: any;
  ref?: any;
  min?: any;
  max?: any;
  formatter?: (
    value: number | string,
    info: { userTyping: boolean; input: string }
  ) => string;
  precision?: number;
  readOnly?: boolean;
  step?: number;
  onStep?: (
    value: number,
    info: { offset: number; type: "up" | "down" }
  ) => void;
}

export interface IFieldProps {
  field: any;
  form: any;
  props: any;
}
