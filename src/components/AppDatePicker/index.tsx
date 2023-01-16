import { DatePicker } from "antd";
import { FC } from "react";

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
  ...props
}) => {
  const handleOnChangeDatePicker = (date: any) => {
    onChange(date);
  };

  return (
    <div className="app-date-picker">
      {pickerLabel && <label>{pickerLabel}</label>}
      <DatePicker
        allowClear={allowClear}
        bordered={bordered}
        onChange={handleOnChangeDatePicker}
        onOk={onOk}
        showToday={showToday}
        placement={placement}
        value={value}
        showTime={showTime}
        {...props}
      />
    </div>
  );
};

export default AppDatePicker;
