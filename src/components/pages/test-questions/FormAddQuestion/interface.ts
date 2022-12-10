export type TypeQuestionSource = {
  id?: string;
  source?: {
    type?: string;
    content?: string;
  };
};

export type TypeQuestionSourceBlock = {
  type?: string;
  content?: string;
};

export interface IFormAddQuestionProps {
  questionText: string;
  questionSource?: TypeQuestionSource[];
  type: string | undefined;
  level: string | undefined;
  topics: number[];
  options?: any[];
  answer?: any[];
}
