import { createContext, FC, useEffect, useRef, useState } from "react";
import { Switch, Typography } from "antd";
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
  useUpdateTestQuestion,
} from "@/hooks/test-question";
import { createUniqueId } from "@/helpers";
import { COMMON_TYPE_QUESTION } from "@/constants/common";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";

const initialValues: IFormAddQuestionProps = {
  questionText: "",
  level: undefined,
  type: undefined,
  topicId: undefined,
  options: [
    {
      id: createUniqueId(),
      choice: "",
    },
    {
      id: createUniqueId(),
      choice: "",
    },
    {
      id: createUniqueId(),
      choice: "",
    },
    {
      id: createUniqueId(),
      choice: "",
    },
  ],
  answer: [],
};

const { Text } = Typography;

export const FormAddQuestionContext = createContext(null) as any;

const FormAddQuestion: FC<{ questionId?: string }> = ({ questionId = "" }) => {
  const navigate = useNavigate();

  const [questionSource, setQuestionSource] = useState<TypeQuestionSource[]>(
    []
  );
  const [currentLanguage, setCurrentLanguage] = useState("javascript");
  const [currentSource, setCurrentSource] = useState("");
  const [isDisplayCodeEditor, setIsDisplayCodeEditor] = useState(false);
  const [error, setError] = useState("");

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

      formRef.current.setFieldValue("topicId", topic?.id);
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

  const { mutate: onCreate, isSuccess, isError } = useCreateTestQuestion();
  const {
    mutate: onUpdate,
    isError: updateError,
    isSuccess: updateSuccess,
  } = useUpdateTestQuestion(questionId);

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: "Question created successfully",
  });

  useTriggerNoti({
    isError: updateError,
    isSuccess: updateSuccess,
    messageSuccess: "Question updated successfully",
  });

  const handleNavigateToQuestionList = () => {
    navigate(APP_PAGE_NAME_ROUTES.TEST_QUESTION_LIST);
  };

  const handleSubmitForm = (values: any) => {
    const { answer: rawAnswer, type, options } = values;
    if (type !== COMMON_TYPE_QUESTION.ESSAYS) {
      if (!options?.length) {
        setError("At least one choice");
        return;
      } else {
        const emptyOption = options?.some((option: any) => !option.choice);
        if (emptyOption) {
          setError("Choice is empty");
          return;
        }
      }
    }

    let answer = rawAnswer;
    if (typeof rawAnswer === "object" && !rawAnswer?.length) {
      setError("At least one answer");
      return;
    }
    if (typeof rawAnswer === "string") {
      if (!rawAnswer) {
        setError("Please choose an answer");
        return;
      }
      answer = [rawAnswer];
    }

    const sendData: any = { ...values, answer, questionSource };
    if (type === "ESSAYS") {
      sendData.answer = "";
      sendData.options = "";
    }

    console.log(sendData)
    if (questionId !== undefined) {
      onUpdate(sendData);
    } else {
      onCreate(sendData);
    }
  };

  const handleAddCodeBlock = (newBlock: TypeQuestionSourceBlock) => {
    setQuestionSource([
      ...questionSource,
      { id: createUniqueId(), source: newBlock },
    ]);
  };

  const handleChangeSwitch = (checked: boolean) => {
    setIsDisplayCodeEditor(checked);
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
        <Switch
          onChange={handleChangeSwitch}
          className="switch"
          defaultChecked={isDisplayCodeEditor}
        />

        <AppForm<IFormAddQuestionProps>
          title={questionId ? "Update Question" : "Add New Question"}
          initialValues={initialValues}
          handleSubmitForm={handleSubmitForm}
          validationSchema={addTestQuestionValidateSchema}
          innerRef={formRef}
        >
          <>
            <FormFields />
            {!!error && <Text>{error}</Text>}
          </>
        </AppForm>
        {isDisplayCodeEditor && (
          <AppCodeEditor
            onSubmitCodeBlock={handleAddCodeBlock}
            currentLanguage={currentLanguage}
            currentSource={currentSource}
          />
        )}
      </div>
    </FormAddQuestionContext.Provider>
  );
};

export default FormAddQuestion;
