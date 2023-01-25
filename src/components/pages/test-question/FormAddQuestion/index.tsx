import { createContext, FC, useEffect, useRef, useState } from "react";
import { Switch, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";

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
import AppFormErrorMessage from "@/components/AppFormErrorMessage";

const { oneChoice, multipleChoice, essays } = COMMON_TYPE_QUESTION;

const initialValues: IFormAddQuestionProps = {
  questionText: "",
  level: undefined,
  type: oneChoice.value,
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

const FormAddQuestion = () => {
  const { questionId = "" } = useParams() as any;
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
      formRef.current.setFieldValue("options", options || []);
      formRef.current.setFieldValue("questionText", questionText);

      if (type === oneChoice.value) {
        formRef.current.setFieldValue("answer", answer[0]);
      } else if (type === multipleChoice.value) {
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

  const handleSubmitForm = (values: any) => {
    let { answer, type, options } = values;
    if (type !== essays.value) {
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
      if (typeof answer === "object" && !answer?.length) {
        setError("At least one answer");
        return;
      }
      if (typeof answer === "string") {
        if (!answer) {
          setError("Please choose an answer");
          return;
        }
        answer = [answer];
      }
    }

    const sendData: any = { ...values, answer, questionSource };
    if (type === essays.value) {
      sendData.answer = [];
      sendData.options = [];
    }

    if (questionId !== "") {
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
            {!!error && <AppFormErrorMessage message={error} />}
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
