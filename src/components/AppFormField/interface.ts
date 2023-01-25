export interface IAppRadioGroup {
  options?: any[];
  value?: string | number;
  onChange?: any;
  onDeleteOption?: any;
  nameInput?: string;
  onChangeInput?: any;
  isEditable?: boolean;
}

export interface IAppCheckboxGroup {
  options?: any[];
  value?: string[] | number[];
  onChange?: any;
  onDeleteOption?: any;
  nameInput?: string;
  onChangeInput?: any;
  isEditable?: boolean;
}
