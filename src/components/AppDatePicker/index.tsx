import { DatePicker } from "antd";
import { FC } from "react";
import AppFormErrorMessage from "../AppFormErrorMessage";

import { IAppDatePickerProps } from "./interface";

const AppDatePicker: FC<IAppDatePickerProps> = ({
  allowClear = true,
  bordered = true,
  onChange,
  onOk,
  placement = "bottomRight",
  showToday = true,
  value,
  pickerLabel,
  showTime = false,
  picker,
  error,
  showPickerLabel = true,
  ...props
}) => {
  const handleOnChangeDatePicker = (date: any) => {
    onChange(date);
  };

  return (
    <div className="app-date-picker">
      {showPickerLabel && (
        <label className="form-label">{pickerLabel ?? "Date"}</label>
      )}
      <DatePicker
        allowClear={allowClear}
        bordered={bordered}
        onChange={handleOnChangeDatePicker}
        onOk={onOk}
        showToday={showToday}
        placement={placement}
        value={value}
        showTime={showTime}
        picker={picker}
        {...props}
      />
      {error ? <AppFormErrorMessage message={error} /> : null}
    </div>
  );
};

export default AppDatePicker;
