import { TimePicker } from "antd";
import { FC } from "react";
import AppFormErrorMessage from "../AppFormErrorMessage";
import { IAppTimePicker } from "./interface";

const AppTimePicker: FC<IAppTimePicker> = ({
  onChange,
  onBlur,
  format = "HH:mm",
  placeholder = "Choose time",
  value,
  error,
  label,
  name,
}) => {
  return (
    <div className="app-time-picker">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <TimePicker
        name={name}
        format={format}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        value={value}
      />
      {error && <AppFormErrorMessage message={error} />}
    </div>
  );
};

export default AppTimePicker;
