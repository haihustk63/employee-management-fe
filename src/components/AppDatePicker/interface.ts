import { Dayjs } from "dayjs";

export interface IAppDatePickerProps {
  allowClear?: boolean;
  pickerLabel?: string;
  bordered?: boolean;
  className?: string;
  picker?: "date" | "week" | "month" | "quarter" | "year";
  open?: boolean;
  placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
  value?: Dayjs;
  showToday?: boolean;
  onOpenChange?: () => void;
  onChange?: any;
  onOk?: () => void;
}
