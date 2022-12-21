import AppButton from "@/components/AppButton";
import { AppSelect } from "@/components/AppFormField";
import appNotification from "@/components/AppNotification";
import InputQuestionInfoManual from "@/components/pages/create-test/InputQuestionInfoManual";
import InputQuestionInfo from "@/components/pages/create-test/InputQuestionInfo";
import ListQuestionInfo from "@/components/pages/create-test/ListQuestionInfo";
import ShowTest from "@/components/pages/create-test/ShowTest";
import { useGetCandidateProfile } from "@/hooks/candidate";
import { useSaveTest } from "@/hooks/tests";
import { dataToOptions } from "@/utils";
import { Switch } from "antd";
import { createContext, useEffect, useMemo, useState } from "react";
import ListQuestionInfoManual from "@/components/pages/create-test/ListQuestionInfoManual";

export const CreateTestContext = createContext({}) as any;

export interface IQuestionInfo {
  topicId: number | undefined;
  EASY: number;
  MEDIUM: number;
  HARD: number;
}

export interface IQuestionInfoManual {
  quesionId: number;
  questionText: string;
  topic: string;
  level: string;
  type: string;
}

const CreateTestPage = () => {
  const [mode, setMode] = useState<"random" | "manual">("random");
  const [questionInfo, setQuestionInfo] = useState<IQuestionInfo[]>([]);
  const [questionInfoManual, setQuestionInfoManual] = useState<
    IQuestionInfoManual[]
  >([]);
  const [randomTest, setRandomTest] = useState([]);
  const [chooseCandidate, setChooseCandidate] = useState("");

  const { data: candidate = [] } = useGetCandidateProfile();
  const { mutate: onSaveTest, isError, isSuccess } = useSaveTest();

  useEffect(() => {
    if (isSuccess) {
      appNotification({
        message: "Congratulations!",
        description: "A new test was saved",
        type: "success",
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      appNotification({
        message: "Opps!!!",
        description: "Something went wrong, please try again",
        type: "error",
      });
    }
  }, [isError]);

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
    const questionIds = randomTest.map((question: any) => question.id);
    onSaveTest({ questionIds, candidateId: chooseCandidate });
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
        <AppButton buttonTitle="Save test" onClick={handleSaveTest} />
      </div>
    </CreateTestContext.Provider>
  );
};

export default CreateTestPage;
