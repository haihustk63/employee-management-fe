export interface IAppDatePickerProps {
  allowClear?: boolean;
  bordered?: boolean;
  className?: string;
  picker?: "date" | "week" | "month" | "quarter" | "year";
  open?: boolean;
  placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
  value?: any;
  showToday?: boolean;
  onOpenChange?: () => void;
  onChange?: any;
  onOk?: () => void;
}
