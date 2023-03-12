import AppButton from "@/components/AppButton";
import appNotification from "@/components/AppNotification";
import InputQuestionInfo from "@/components/pages/create-test/InputQuestionInfo";
import InputQuestionInfoManual from "@/components/pages/create-test/InputQuestionInfoManual";
import ListQuestionInfo from "@/components/pages/create-test/ListQuestionInfo";
import ListQuestionInfoManual from "@/components/pages/create-test/ListQuestionInfoManual";
import ShowTestModal from "@/components/pages/create-test/ShowTest";
import TestInfoForm from "@/components/pages/test/TestInfoForm";
import {
  CREATE_TEST_MODE,
  QUESTION_LEVELS,
  TEST_STATUS,
} from "@/constants/common";
import { useGetTest, useSaveTest, useUpdateTest } from "@/hooks/tests";
import useModal from "@/hooks/useModal";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { Alert, Drawer, Typography } from "antd";
import { createContext, FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const { easy, hard, medium } = QUESTION_LEVELS;
const { created, attempting } = TEST_STATUS;

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
  const [mode, setMode] = useState<number>(CREATE_TEST_MODE.manual.value);
  const [questionInfo, setQuestionInfo] = useState<IQuestionInfo[]>([]);
  const [questionInfoManual, setQuestionInfoManual] = useState<
    IQuestionInfoManual[]
  >([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [randomTest, setRandomTest] = useState([]);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { showModal: showTestModal, handleToggleModal: toggleShowTestModal } =
    useModal();

  const { mutate: onSaveTest, isError, isSuccess, error } = useSaveTest();
  const { data: currentTest = {} } = useGetTest(testId as string, true) as any;
  const {
    mutate: onUpdateTest,
    isError: updateError,
    isSuccess: updateSuccess,
  } = useUpdateTest(testId);

  useEffect(() => {
    if (Object.keys(currentTest).length) {
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

  useEffect(() => {
    if (!testId) {
      setQuestionInfoManual([]);
      setTitle("");
      setDuration(0);
      setSelectedRowKeys([]);
    }
  }, [testId]);

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: "A new test was saved",
    error,
  });

  useTriggerNoti({
    isError: updateError,
    isSuccess: updateSuccess,
    messageSuccess: "Update test successfully",
  });

  useEffect(() => {
    if (mode === CREATE_TEST_MODE.random.value) {
      setRandomTest([]);
    }
  }, [mode, questionInfo]);

  const saveTest = () => {
    if (!title || !duration) {
      appNotification({
        type: "error",
        message: "Error",
        description: "Both title and duration are required",
      });
      return;
    }

    let questionIds;

    if (testId) {
      questionIds = questionInfoManual.map(
        (question: any) => question.questionId
      );
      onUpdateTest({ questionIds, title, duration });
    } else {
      if (mode === CREATE_TEST_MODE.manual.value) {
        questionIds = questionInfoManual.map(
          (question: any) => question.questionId
        );
      } else {
        questionIds = randomTest.map((question: any) => question.id);
      }
      onSaveTest({ questionIds, title, duration });
    }
  };

  const changeMode = (e: any) => {
    setMode(e.target.value);
    setQuestionInfo([]);
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const isPublished = useMemo(() => {
    return currentTest?.skillTestAccount?.some(
      (item: any) => item.status !== created.value
    );
  }, [currentTest]);

  const isCandidateAttempting = useMemo(() => {
    return currentTest?.skillTestAccount?.some(
      (item: any) => item.status === attempting.value
    );
  }, [currentTest]);

  const renderPreviewAndSave = useMemo(() => {
    return (
      <>
        <AppButton
          className="save"
          buttonTitle="Save test"
          onClick={saveTest}
          disabled={isCandidateAttempting}
        />
        {isCandidateAttempting ? (
          <Alert
            className="alert"
            type="error"
            description="You can not update this test because someone is attempting it"
          />
        ) : isPublished ? (
          <Alert
            className="alert"
            type="error"
            description="Be careful when modify this test because some contestants have
        completed it"
          />
        ) : null}
      </>
    );
  }, [isPublished, isCandidateAttempting, saveTest]);

  const renderModeContent = useMemo(() => {
    if (mode === CREATE_TEST_MODE.random.value) {
      return (
        <div className="random">
          <InputQuestionInfo />
          <div className="info">
            <ListQuestionInfo />
            <Alert
              message="IMPORTANT!"
              type="warning"
              description="You need to click button above before click save button. 
              If not, the test questions can be those which are not as expected"
            />
            {renderPreviewAndSave}
          </div>
        </div>
      );
    } else {
      return (
        <div className="manual">
          <InputQuestionInfoManual />
          <Drawer
            title="Test info"
            className="test-info-drawer"
            width={600}
            open={openDrawer}
            onClose={toggleDrawer}
          >
            <div className="info">
              <ListQuestionInfoManual />
              {renderPreviewAndSave}
            </div>
          </Drawer>
        </div>
      );
    }
  }, [mode, renderPreviewAndSave]);

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
        !questionAtIndex[easy.value] &&
        !questionAtIndex[medium.value] &&
        !questionAtIndex[hard.value]
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

  return (
    <CreateTestContext.Provider
      value={{
        questionInfo,
        randomTest,
        questionInfoManual,
        currentTest,
        testId,
        showTestModal,
        mode,
        title,
        duration,
        selectedRowKeys,
        onSubmitQuestionInfo: handleSubmitQuestionInfo,
        setRandomTest,
        setQuestionInfoManual,
        toggleShowTestModal,
        setTitle,
        setDuration,
        changeMode,
        setSelectedRowKeys,
        toggleDrawer,
      }}
    >
      <div className="create-test-page">
        <TestInfoForm />
        {renderModeContent}
        <ShowTestModal
          test={randomTest}
          isOpenModal={showTestModal}
          toggleModal={toggleShowTestModal}
        />
      </div>
    </CreateTestContext.Provider>
  );
};

export default CreateTestPage;
