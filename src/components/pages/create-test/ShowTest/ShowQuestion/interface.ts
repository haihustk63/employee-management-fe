export interface IShowQuestionProps {
  question: {
    type?: string;
    questionText: string;
    questionSource?: any[];
    options?: any[];
  };
  idx: number;
  answer?: any[];
  disableInput?: boolean;
  handleChange?: (value: any) => void;
  value?: any;
}
