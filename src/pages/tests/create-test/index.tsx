import AppButton from "@/components/AppButton";
import { AppSelect } from "@/components/AppFormField";
import appNotification from "@/components/AppNotification";
import InputQuestionInfoManual from "@/components/pages/create-test/InputQuestionInfoManual";
import InputQuestionInfo from "@/components/pages/create-test/InputQuestionInfo";
import ListQuestionInfo from "@/components/pages/create-test/ListQuestionInfo";
import ShowTest from "@/components/pages/create-test/ShowTest";
import { useGetCandidateProfile } from "@/hooks/candidate";
import {
  useSaveTest,
  useGetTest,
  useCreateTest,
  useUpdateTest,
} from "@/hooks/tests";
import { dataToOptions } from "@/utils";
import { Switch } from "antd";
import { createContext, FC, useEffect, useMemo, useState } from "react";
import ListQuestionInfoManual from "@/components/pages/create-test/ListQuestionInfoManual";
import { useParams } from "react-router-dom";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";

export const CreateTestContext = createContext({}) as any;

export interface IQuestionInfo {
  topicId: number | undefined;
  EASY: number;
  MEDIUM: number;
  HARD: number;
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
  const [chooseCandidate, setChooseCandidate] = useState("");

  const { data: candidate = [] } = useGetCandidateProfile();
  const { mutate: onSaveTest, isError, isSuccess } = useSaveTest();
  const { data: currentTest = [] } = useGetTest(testId as string, true);
  const {
    mutate: onUpdateTest,
    isError: updateError,
    isSuccess: updateSuccess,
  } = useUpdateTest(testId);

  useEffect(() => {
    if (currentTest?.length) {
      const newQuestionManual = currentTest.map(
        ({ question, questionId }: any) => ({
          questionId: questionId,
          questionText: question.questionText,
          topic: question.topic.name,
          level: question.level,
          type: question.type,
        })
      );
      setQuestionInfoManual(newQuestionManual);
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

  const handleSubmitQuestionInfo =
    (topicId: number, level: "EASY" | "MEDIUM" | "HARD") =>
    (amount: number) => {
      let newQuestionInfo = [...questionInfo];
      const questionInfoIndex = newQuestionInfo.findIndex(
        (q) => q.topicId === topicId
      );
      if (questionInfoIndex >= 0) {
        const questionAtIndex = newQuestionInfo[questionInfoIndex] as any;
        questionAtIndex[level] = amount;
        if (
          questionAtIndex["EASY"] === 0 &&
          questionAtIndex["MEDIUM"] === 0 &&
          questionAtIndex["HARD"] === 0
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
            EASY: 0,
            MEDIUM: 0,
            HARD: 0,
            [level]: amount,
          },
        ]);
      }
    };

  const handleChangeSelect = (value: string) => {
    setChooseCandidate(value);
  };

  const handleSaveTest = () => {
    let questionIds;
    if (testId) {
      questionIds = questionInfoManual.map(
        (question: any) => question.questionId
      );
      onUpdateTest({ questionIds, testId: Number(testId) });
    } else {
      questionIds = randomTest.map((question: any) => question.id);
      onSaveTest({ questionIds, candidateId: chooseCandidate });
    }
  };

  const handleChangeSwitch = (checked: boolean) => {
    if (checked) {
      setMode("random");
    } else {
      setMode("manual");
    }
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
        <Switch
          defaultChecked={mode === "random"}
          onChange={handleChangeSwitch}
          className="switch"
        />
        {renderModeContent}
        <ShowTest />
        <AppSelect
          options={dataToOptions(candidate)}
          placeholder="Assign to candidate"
          onChange={handleChangeSelect}
        />
        <AppButton
          buttonTitle="Save test"
          onClick={handleSaveTest}
          disabled={currentTest?.[0]?.test?.isSubmitted}
        />
      </div>
    </CreateTestContext.Provider>
  );
};

export default CreateTestPage;
