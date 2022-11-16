import { DatePicker } from "antd";
import React, { FC } from "react";
import { Moment } from "moment";

import { IAppDatePickerProps } from "./interface";

const AppDatePicker: FC<IAppDatePickerProps> = ({
  allowClear = true,
  bordered = true,
  onOpenChange,
  open,
  picker,
  onChange,
  onOk,
  placement = "bottomRight",
  showToday = true,
  value,
}) => {
  const handleOnChangeDatePicker = (date: any) => {
    onChange(date);
  };

  return (
    <div className="app-date-picker">
      <label>Date</label>
      <DatePicker
        allowClear={allowClear}
        bordered={bordered}
        onChange={handleOnChangeDatePicker}
        onOk={onOk}
        showToday={showToday}
        placement={placement}
        value={value}
      />
    </div>
  );
};

export default AppDatePicker;
