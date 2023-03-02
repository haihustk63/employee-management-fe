import { Dayjs } from "dayjs";

export interface IAppTimePicker {
  onChange?: any;
  onBlur?: any;
  placeholder?: string;
  value?: Dayjs;
  format?: string;
  label?: string;
  error?: string;
  name?: string;
  touched?: boolean;
}
