import { createContext, useEffect, useMemo, useState } from "react";

import ConfirmAttempt from "@/components/pages/skill-test/ConfirmAttempt";
import SessionInfo from "@/components/pages/skill-test/SessionInfo";
import Sumary from "@/components/pages/skill-test/Sumary";
import SkillTestContent from "@/components/pages/skill-test/Tests";
import { COMMON_TYPE_QUESTION, TEST_STATUS } from "@/constants/common";
import {
  APP_PAGE_NAME_ROUTES,
  DYNAMIC_APP_PAGE_ROUTES,
} from "@/constants/routes";
import {
  useGetContestantTest,
  useSubmitAnswer,
  useUpdateContestantTest,
} from "@/hooks/tests";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { attempting, created, done } = TEST_STATUS;
const { essays, multipleChoice, oneChoice } = COMMON_TYPE_QUESTION;

export const CandidateSkillTestContext = createContext({});

const DoSkillTest = () => {
  const navigate = useNavigate();
  const { testId: id = "" } = useParams();
  const testId = +id;

  const [answers, setAnswers] = useState<any[]>([]);
  const [duration, setDuration] = useState(0);
  const [autoSubmit, setAutoSubmit] = useState(false);

  const { mutate: onUpdate } = useUpdateContestantTest(testId);
  const { data: info, isError } = useGetContestantTest(testId) as any;
  const {
    mutate: onSubmitAnswer,
    isError: submitError,
    isSuccess: submitSuccess,
    isLoading: isProcessingSubmitAnswer,
  } = useSubmitAnswer(testId);

  useTriggerNoti({
    isError: submitError,
    isSuccess: submitSuccess,
    showMessageSuccess: false,
  });

  const test = useMemo(() => {
    if (info) {
      return info?.test?.testQuestionSkillTest;
    }
  }, [info]);

  useEffect(() => {
    if (isError) {
      navigate(APP_PAGE_NAME_ROUTES.SKILL_TEST, { replace: true });
    }
  }, [isError]);

  useEffect(() => {
    if (info?.status === done.value) {
      return navigate(DYNAMIC_APP_PAGE_ROUTES.SKILL_TEST_RESULT(testId), {
        replace: true,
      });
    }
  }, [info]);

  useEffect(() => {
    if (test) {
      const currentAnswers = JSON.parse(
        localStorage.getItem("candidate-test-answers") || "[]"
      );
      if (currentAnswers?.length) {
        setAnswers(currentAnswers);
      } else {
        let initAnswers: any[] = [];
        test.map(({ question, questionId }: any) => {
          const type = question.type;
          if (type === multipleChoice.value) {
            initAnswers.push({ questionId, answer: [] });
          } else {
            initAnswers.push({ questionId, answer: "" });
          }
        });
        setAnswers(initAnswers);
      }
    }
  }, [test, testId]);

  useEffect(() => {
    if (info?.test?.duration) {
      const durationInSecond = info?.test?.duration * 60;
      const currentDuration = localStorage.getItem("candidate-test-duration");
      if (!currentDuration) {
        localStorage.setItem(
          "candidate-test-duration",
          durationInSecond.toString()
        );
        setDuration(durationInSecond);
      } else {
        setDuration(+currentDuration);
      }
    }
  }, [info?.test?.duration]);

  useEffect(() => {
    if (answers?.length) {
      localStorage.setItem("candidate-test-answers", JSON.stringify(answers));
    }
  }, [answers]);

  const isAllEmpty = useMemo(() => {
    return answers?.every((item: any) => !item?.answer?.length);
  }, [answers]);

  const confirmAttempt = () => {
    onUpdate({ confirmAttempt: true });
  };

  const handleSetCurrentDuration = (seconds: number) => {
    localStorage.setItem("candidate-test-duration", seconds.toString());
    if (!seconds) {
      if (isAllEmpty) navigate(APP_PAGE_NAME_ROUTES.SKILL_TEST);
      else {
        !autoSubmit && setAutoSubmit(true);
      }
    }
  };

  const handleSubmit = () => {
    const sessionId = Number(testId);

    const sendAnswers = answers
      .map(({ questionId, answer }: any, index: number) => ({
        sessionId,
        questionId: questionId,
        answer: transformAnswer(answer, index),
      }))
      .filter(
        (item: any) =>
          item.answer?.length > 0 || item.answer?.content?.length > 0
      );

    onSubmitAnswer({ testId: sessionId, answers: sendAnswers });
  };

  useEffect(() => {
    if (autoSubmit) {
      handleSubmit();
    }
  }, [autoSubmit]);

  useEffect(() => {
    if (isProcessingSubmitAnswer) {
      localStorage.removeItem("candidate-test-duration");
      localStorage.removeItem("candidate-test-answers");
    }
  }, [isProcessingSubmitAnswer]);

  const transformAnswer = (answer: any, index: number) => {
    const questionType = test[index]?.question?.type;
    if (questionType === oneChoice.value) {
      return [answer];
    } else if (questionType === essays.value) {
      return { content: answer };
    } else {
      return answer;
    }
  };

  return (
    <CandidateSkillTestContext.Provider
      value={{
        answers,
        test,
        duration,
        testId,
        isAllEmpty,
        setAnswers,
        confirmAttempt,
        handleSetCurrentDuration,
        handleSubmit,
      }}
    >
      {info?.status === created.value && <ConfirmAttempt />}
      {info?.status === attempting.value &&
        test &&
        !isProcessingSubmitAnswer && (
          <div className="candidate-skill-do-test">
            <div className="session">
              <Sumary />
              <SessionInfo />
            </div>
            <SkillTestContent />
            {/* <AppTour
            initialStep={0}
            steps={SKILL_TEST_INTRO_STEPS}
            enabled={true}
            onExit={onEndTour}
          /> */}
          </div>
        )}
      {isProcessingSubmitAnswer && (
        <Spin tip="Processing...">
          <div className="content" />
        </Spin>
      )}
    </CandidateSkillTestContext.Provider>
  );
};

export default DoSkillTest;
