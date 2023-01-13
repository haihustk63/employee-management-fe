import { Checkbox, Input, InputNumber, Radio, Select } from "antd";
import { FC } from "react";
import AppButton from "../AppButton";

import { IFormItemProps } from "../FormItem/interface";
import { IAppCheckboxGroup, IAppRadioGroup } from "./interface";

const AppInput: FC<IFormItemProps> = ({
  name,
  value,
  onChange,
  placeholder,
  allowClear,
}) => {
  return (
    <Input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      allowClear={allowClear}
    />
  );
};

const AppInputNumber: FC<IFormItemProps> = ({
  name,
  value,
  onChange,
  placeholder,
  min,
  max,
  precision = 0
}) => {
  return (
    <InputNumber
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      max={max}
      precision={precision}
    />
  );
};

const AppInputTextArea: FC<IFormItemProps> = ({
  name,
  value,
  onChange,
  placeholder,
  allowClear,
  disabled,
}) => {
  return (
    <Input.TextArea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      allowClear={allowClear}
      disabled={disabled}
    />
  );
};

const AppSelect: FC<IFormItemProps> = ({
  value,
  onChange,
  placeholder,
  options,
  allowClear,
  showSearch = true,
}) => {
  const filterOption = (input: string, option: any) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Select
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      allowClear={allowClear}
      className="app-select"
      showSearch={showSearch}
      optionFilterProp="label"
      filterOption={filterOption}
    />
  );
};

const AppRadioGroup: FC<IAppRadioGroup> = ({
  options = [],
  value,
  onChange,
  onDeleteOption,
  isEditable,
  nameInput,
  onChangeInput,
}) => {
  if (typeof value === "object") {
    value = value[0];
  }

  return (
    <Radio.Group value={value} onChange={onChange}>
      {options.map((option: any, index: number) => (
        <div key={option.id}>
          <Radio value={option.id}>
            {isEditable ? (
              <AppInput
                name={nameInput}
                value={option.choice}
                onChange={onChangeInput(option.id)}
                placeholder={`Enter answer ${index + 1}`}
              />
            ) : (
              option.choice
            )}
          </Radio>
          {onDeleteOption && (
            <AppButton onClick={onDeleteOption(option.id)} buttonTitle="Del" />
          )}
        </div>
      ))}
    </Radio.Group>
  );
};

const AppCheckboxGroup: FC<IAppCheckboxGroup> = ({
  options = [],
  value,
  onChange,
  onDeleteOption,
  nameInput,
  onChangeInput,
  isEditable,
}) => {
  return (
    <Checkbox.Group
      value={value}
      onChange={onChange}
      className="app-checkbox-gr"
    >
      {options.map((option: any, index: number) => (
        <div key={option.id}>
          <Checkbox value={option.id}>
            {isEditable ? (
              <AppInput
                name={nameInput}
                value={option.choice}
                onChange={onChangeInput(option.id)}
                placeholder={`Enter answer ${index + 1}`}
              />
            ) : (
              option.choice
            )}
          </Checkbox>
          {onDeleteOption && (
            <AppButton onClick={onDeleteOption(option.id)} buttonTitle="Del" />
          )}
        </div>
      ))}
    </Checkbox.Group>
  );
};

export {
  AppInput,
  AppInputNumber,
  AppInputTextArea,
  AppSelect,
  AppRadioGroup,
  AppCheckboxGroup,
};
