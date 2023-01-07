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
  type: number | undefined;
  level: string | undefined;
  topicId?: string | number;
  options?: any[];
  answer?: any[] | string;
}
