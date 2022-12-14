import InputQuestionInfo from "@/components/pages/create-test/InputQuestionInfo";
import ListQuestionInfo from "@/components/pages/create-test/ListQuestionInfo";
import ShowTest from "@/components/pages/create-test/ShowTest";
import { createContext, useState } from "react";

export const CreateTestContext = createContext({}) as any;

export interface IQuestionInfo {
  topicId: number | undefined;
  EASY: number;
  MEDIUM: number;
  HARD: number;
}

const CreateTestPage = () => {
  // check 2 same info
  const [questionInfo, setQuestionInfo] = useState<IQuestionInfo[]>([]);
  const [randomTest, setRandomTest] = useState([]);

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

  return (
    <CreateTestContext.Provider
      value={{
        questionInfo,
        onSubmitQuestionInfo: handleSubmitQuestionInfo,
        randomTest,
        setRandomTest,
      }}
    >
      <div className="create-test-page">
        <InputQuestionInfo />
        <ListQuestionInfo />
        <ShowTest />
      </div>
    </CreateTestContext.Provider>
  );
};

export default CreateTestPage;
