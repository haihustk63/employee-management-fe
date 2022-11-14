export interface IAppButton {
  buttonTitle: string;
  onClick?: () => void;
  htmlType?: "button" | "submit" | "reset" | undefined;
}
