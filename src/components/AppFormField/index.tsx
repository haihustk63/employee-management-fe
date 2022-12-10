import { Checkbox, Input, Radio, Select } from "antd";
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

const AppInputTextArea: FC<IFormItemProps> = ({
  name,
  value,
  onChange,
  placeholder,
  allowClear,
}) => {
  return (
    <Input.TextArea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      allowClear={allowClear}
    />
  );
};

const AppSelect: FC<IFormItemProps> = ({
  value,
  onChange,
  placeholder,
  options,
  allowClear,
}) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      allowClear={allowClear}
    />
  );
};

const AppRadioGroup: FC<IAppRadioGroup> = ({
  options = [],
  value,
  onChange,
  onDeleteOption,
}) => {
  return (
    <Radio.Group value={value} onChange={onChange}>
      {options.map((option: any, index: number) => (
        <div key={option.id}>
          <Radio value={option.id}>{option.choice}</Radio>
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
}) => {
  return (
    <Checkbox.Group value={value} onChange={onChange}>
      {options.map((option: any, index: number) => (
        <div key={option.id}>
          <Checkbox value={option.id}>{option.choice}</Checkbox>
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
  AppInputTextArea,
  AppSelect,
  AppRadioGroup,
  AppCheckboxGroup,
};
