import { createContext, FC, useEffect, useRef, useState } from "react";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

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
import appNotification from "@/components/AppNotification";
import AppButton from "@/components/AppButton";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";

const initialValues: IFormAddQuestionProps = {
  questionText: "",
  level: undefined,
  type: undefined,
  topic: undefined,
  options: [],
  answer: [],
};

const { Text } = Typography;

export const FormAddQuestionContext = createContext(null) as any;

const FormAddQuestion: FC<{ questionId?: string }> = ({ questionId = "" }) => {
  const [questionSource, setQuestionSource] = useState<TypeQuestionSource[]>(
    []
  );
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("javascript");
  const [currentSource, setCurrentSource] = useState("");

  const { data = {} } = useGetOneTestQuestions(questionId) as any;

  const formRef = useRef(null) as any;

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      const {
        topic,
        level,
        type,
        questionText,
        answer,
        options,
        questionSource: sources,
      } = data;

      formRef.current.setFieldValue("topic", topic);
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

  const { mutate, isSuccess, isError } = useCreateTestQuestion();

  const handleNavigateToQuestionList = () => {
    navigate(APP_PAGE_NAME_ROUTES.TEST_QUESTION_LIST);
  };

  const renderNotificationDescription = (status: "success" | "error") => {
    switch (status) {
      case "success":
        return (
          <div>
            <Text>New question is added!</Text>
            <AppButton
              buttonTitle="Show question list"
              onClick={handleNavigateToQuestionList}
            />
          </div>
        );
      case "error":
        return <Text>Something went wrong, please try again!</Text>;
    }
  };

  useEffect(() => {
    if (isSuccess) {
      appNotification({
        message: "Success",
        description: renderNotificationDescription("success"),
        type: "success",
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      appNotification({
        message: "Error",
        description: renderNotificationDescription("error"),
        type: "error",
      });
    }
  }, [isError]);

  const handleSubmitForm = (values: any) => {
    const { answer: rawAnswer, type } = values;
    let answer = rawAnswer;
    if (typeof rawAnswer === "string") {
      answer = [rawAnswer];
    }
    const sendData: any = { ...values, answer, questionSource };
    if (type === "ESSAYS") {
      sendData.answer = "";
      sendData.options = "";
    }
    mutate(sendData);
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
