import { Dayjs } from "dayjs";

export interface IAppDatePickerProps {
  allowClear?: boolean;
  pickerLabel?: string;
  bordered?: boolean;
  format?: string;
  disabledDate?: any;
  className?: string;
  picker?: "date" | "week" | "month" | "quarter" | "year";
  open?: boolean;
  placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
  value?: Dayjs;
  showToday?: boolean;
  onOpenChange?: () => void;
  onChange?: any;
  onOk?: () => void;
  showTime?: boolean | object;
  error?: string;
  showPickerLabel?: boolean;
}
