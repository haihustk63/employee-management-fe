import { createContext, FC, useEffect, useRef, useState } from "react";

import AppForm from "@/components/AppForm";
import FormFields from "./FormFields";
import {
  IFormAddQuestionProps,
  TypeQuestionSource,
  TypeQuestionSourceBlock,
} from "./interface";
import AppCodeEditor from "@/components/AppCodeEditor";
import { addTestQuestionValidateSchema } from "@/schemas";
import {
  useCreateTestQuestion,
  useGetOneTestQuestions,
} from "@/hooks/test-question";
import { createUniqueId } from "@/helpers";
import { COMMON_TYPE_QUESTION } from "@/constants/common";

const initialValues: IFormAddQuestionProps = {
  questionText: "",
  level: undefined,
  type: undefined,
  topics: [],
  options: [],
  answer: [],
};

export const FormAddQuestionContext = createContext(null) as any;

const FormAddQuestion: FC<{ questionId?: string }> = ({ questionId = "" }) => {
  const [questionSource, setQuestionSource] = useState<TypeQuestionSource[]>(
    []
  );
  const [currentLanguage, setCurrentLanguage] = useState("javascript");
  const [currentSource, setCurrentSource] = useState("");

  const { data = {} } = useGetOneTestQuestions(questionId) as any;

  const formRef = useRef(null) as any;

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      const {
        testTopicQuestion: topics,
        level,
        type,
        questionText,
        answer,
        options,
        questionSource: sources,
      } = data;

      formRef.current.setFieldValue("topics", topics);
      formRef.current.setFieldValue("level", level);
      formRef.current.setFieldValue("type", type);
      formRef.current.setFieldValue("options", options);
      formRef.current.setFieldValue("questionText", questionText);

      if (type === COMMON_TYPE_QUESTION.ONE_CHOICE) {
        formRef.current.setFieldValue("answer", answer[0]);
      } else if (type === COMMON_TYPE_QUESTION.MULTIPLE_CHOICE) {
        formRef.current.setFieldValue("answer", answer);
      }

      setQuestionSource(sources);
    }
  }, [data]);

  const { mutate } = useCreateTestQuestion();

  const handleSubmitForm = (values: any) => {
    const { answer: rawAnswer } = values;
    let answer = rawAnswer;
    if (typeof rawAnswer === "string") {
      answer = [rawAnswer];
    }
    console.log({ ...values, answer, questionSource });
    // mutate({ ...values, questionSource });
  };

  const handleAddCodeBlock = (newBlock: TypeQuestionSourceBlock) => {
    setQuestionSource([
      ...questionSource,
      { id: createUniqueId(), source: newBlock },
    ]);
  };

  return (
    <FormAddQuestionContext.Provider
      value={{
        questionSource,
        setQuestionSource,
        currentLanguage,
        setCurrentLanguage,
        currentSource,
        setCurrentSource,
      }}
    >
      <div className="form-add-question">
        <AppForm<IFormAddQuestionProps>
          title={questionId ? "Update Question" : "Add New Question"}
          initialValues={initialValues}
          handleSubmitForm={handleSubmitForm}
          validationSchema={addTestQuestionValidateSchema}
          innerRef={formRef}
        >
          <FormFields />
        </AppForm>
        <AppCodeEditor
          onSubmitCodeBlock={handleAddCodeBlock}
          currentLanguage={currentLanguage}
          currentSource={currentSource}
        />
      </div>
    </FormAddQuestionContext.Provider>
  );
};

export default FormAddQuestion;
