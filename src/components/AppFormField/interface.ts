export interface IAppRadioGroup {
  options?: string[];
  value?: string;
  onChange?: any;
  onDeleteOption?: any;
  nameInput?: string;
  onChangeInput?: any;
  isEditable?: boolean;
}

export interface IAppCheckboxGroup {
  options?: string[];
  value?: string[];
  onChange?: any;
  onDeleteOption?: any;
  nameInput?: string;
  onChangeInput?: any;
  isEditable?: boolean;
}
