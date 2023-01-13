import AppButton from "@/components/AppButton";
import AppFormErrorMessage from "@/components/AppFormErrorMessage";
import { AppInput, AppInputNumber } from "@/components/AppFormField";
import InputQuestionInfo from "@/components/pages/create-test/InputQuestionInfo";
import InputQuestionInfoManual from "@/components/pages/create-test/InputQuestionInfoManual";
import ListQuestionInfo from "@/components/pages/create-test/ListQuestionInfo";
import ListQuestionInfoManual from "@/components/pages/create-test/ListQuestionInfoManual";
import ShowTest from "@/components/pages/create-test/ShowTest";
import { QUESTION_LEVELS, TEST_STATUS } from "@/constants/common";
import { useGetTest, useSaveTest, useUpdateTest } from "@/hooks/tests";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { Switch } from "antd";
import { createContext, FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const { easy, hard, medium } = QUESTION_LEVELS;
const { created } = TEST_STATUS;

export const CreateTestContext = createContext({}) as any;

export interface IQuestionInfo {
  topicId: number | undefined;
  [key: number]: number;
}

export interface IQuestionInfoManual {
  questionId: number;
  questionText: string;
  topic: string;
  level: string;
  type: string;
}

const CreateTestPage: FC = () => {
  const { testId = "" } = useParams();
  const [mode, setMode] = useState<"random" | "manual">("manual");
  const [questionInfo, setQuestionInfo] = useState<IQuestionInfo[]>([]);
  const [questionInfoManual, setQuestionInfoManual] = useState<
    IQuestionInfoManual[]
  >([]);
  const [randomTest, setRandomTest] = useState([]);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [durationError, setDurationError] = useState(false);

  const { mutate: onSaveTest, isError, isSuccess } = useSaveTest();
  const { data: currentTest = {} } = useGetTest(testId as string, true) as any;
  const {
    mutate: onUpdateTest,
    isError: updateError,
    isSuccess: updateSuccess,
  } = useUpdateTest(testId);

  useEffect(() => {
    if (Object.keys(currentTest).length > 0) {
      const newQuestionManual = currentTest.testQuestionSkillTest.map(
        ({ question, questionId }: any) => ({
          questionId: questionId,
          questionText: question.questionText,
          topic: question.topic.name,
          level: question.level,
          type: question.type,
        })
      );
      setQuestionInfoManual(newQuestionManual);
      setTitle(currentTest.title);
      setDuration(currentTest.duration);
    }
  }, [currentTest]);

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: "A new test was saved",
  });

  useTriggerNoti({
    isError: updateError,
    isSuccess: updateSuccess,
    messageSuccess: "Update test successfully",
  });

  const isPublished = useMemo(() => {
    return currentTest?.skillTestAccount?.some(
      (item: any) => item.status !== created.value
    );
  }, [currentTest]);

  const renderModeContent = useMemo(() => {
    if (mode === "random") {
      return (
        <>
          <InputQuestionInfo />
          <ListQuestionInfo />
        </>
      );
    } else {
      return (
        <>
          <InputQuestionInfoManual />
          <ListQuestionInfoManual />
        </>
      );
    }
  }, [mode]);

  const handleSubmitQuestionInfo = ({
    topicId,
    level,
    amount,
  }: {
    topicId: number;
    level: number;
    amount: number;
  }) => {
    let newQuestionInfo = [...questionInfo];
    const questionInfoIndex = newQuestionInfo.findIndex(
      (q) => q.topicId === topicId
    );
    if (questionInfoIndex >= 0) {
      const questionAtIndex = newQuestionInfo[questionInfoIndex] as any;
      questionAtIndex[level] = amount;
      if (
        questionAtIndex[easy.value] === 0 &&
        questionAtIndex[medium.value] === 0 &&
        questionAtIndex[hard.value] === 0
      ) {
        newQuestionInfo = newQuestionInfo.filter(
          (q: any) => q.topicId !== topicId
        );
      }
      setQuestionInfo(newQuestionInfo);
    } else {
      setQuestionInfo([
        ...questionInfo,
        {
          topicId,
          [easy.value]: 0,
          [medium.value]: 0,
          [hard.value]: 0,
          [level]: amount,
        },
      ]);
    }
  };

  const handleSaveTest = () => {
    let questionIds;

    if (!title) {
      setTitleError(true);
      return;
    }

    if (duration === null) {
      setDurationError(true);
      return;
    }

    if (testId) {
      questionIds = questionInfoManual.map(
        (question: any) => question.questionId
      );
      onUpdateTest({ questionIds, title, duration });
    } else {
      questionIds = randomTest.map((question: any) => question.id);
      // onSaveTest({ questionIds, title, duration });
    }
  };

  const handleChangeSwitch = (checked: boolean) => {
    if (checked) {
      setMode("random");
    } else {
      setMode("manual");
    }
  };

  const changeTitle = (e: any) => {
    setTitle(e.target?.value);
    setTitleError(false);
  };

  const changeDuration = (value: any) => {
    setDuration(value);
    setDurationError(false);
  };

  return (
    <CreateTestContext.Provider
      value={{
        questionInfo,
        onSubmitQuestionInfo: handleSubmitQuestionInfo,
        randomTest,
        setRandomTest,
        questionInfoManual,
        setQuestionInfoManual,
        testId,
        currentTest,
      }}
    >
      <div className="create-test-page">
        <AppInput
          placeholder="Test title"
          value={title}
          onChange={changeTitle}
          label="Test title"
        />
        {titleError && <AppFormErrorMessage message="Title is required" />}
        <AppInputNumber
          placeholder="Test duration"
          value={duration}
          onChange={changeDuration}
          min={0}
          label="Test duration (Minutes)"
        />
        {durationError && (
          <AppFormErrorMessage message="Duration is required" />
        )}

        {!testId && (
          <Switch
            defaultChecked={mode === "random"}
            onChange={handleChangeSwitch}
            className="switch"
          />
        )}
        {renderModeContent}
        <ShowTest />
        <AppButton
          buttonTitle="Save test"
          onClick={handleSaveTest}
          disabled={isPublished}
        />
        {isPublished && (
          <p>
            This test can not modify because some comtestants have completed it
          </p>
        )}
      </div>
    </CreateTestContext.Provider>
  );
};

export default CreateTestPage;
