import AppInfoItem from "@/components/AppInfoItem";
import HiringFlow from "@/components/pages/skill-test/HiringFlow";
import { TEST_STATUS } from "@/constants/common";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import { useGetContestantTest } from "@/hooks/tests";
import { Typography } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const { Text } = Typography;

const SkillTestRawResult = () => {
  const { testId = "" } = useParams();
  const navigate = useNavigate();
  const { data, isError } = useGetContestantTest(testId) as any;
  const { questionCount, essayCount, score, email } = data || {};

  useEffect(() => {
    if (isError || (data && data?.status !== TEST_STATUS.done.value)) {
      navigate(APP_PAGE_NAME_ROUTES.SKILL_TEST);
    }
  }, [isError, data]);

  return (
    <div className="skill-test-result">
      <div className="result">
        <Text className="thanks">Thank you for attempting the test!</Text>
        {!!email && (
          <Text className="email">
            We've send email to {email}, please check it for more information!
          </Text>
        )}
        <div className="raw">
          <AppInfoItem label="Number of questions" value={questionCount} />
          <AppInfoItem
            label="Selection questions"
            value={`${score}/${questionCount - essayCount}`}
          />
          <AppInfoItem
            label="Constructed response questions (Waiting for review)"
            value={essayCount}
          />
        </div>
      </div>

      <HiringFlow />
    </div>
  );
};

export default SkillTestRawResult;
