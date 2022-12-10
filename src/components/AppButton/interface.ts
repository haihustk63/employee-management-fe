export interface IAppButton {
  buttonTitle: string;
  onClick?: any;
  htmlType?: "button" | "submit" | "reset" | undefined;
  className?: string;
  size?: "large" | "middle" | "small";
  disabled?: boolean;
}
