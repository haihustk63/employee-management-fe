import AppTag from "@/components/AppTag";
import HiringFlow from "@/components/pages/skill-test/HiringFlow";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import { useGetContestantTest } from "@/hooks/tests";
import { Space } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SkillTestRawResult = () => {
  const { testId = "" } = useParams();
  const navigate = useNavigate();
  const { data, isError } = useGetContestantTest(testId) as any;
  const { questionCount, essayCount, score, email } = data || {};

  useEffect(() => {
    if (isError) {
      navigate(APP_PAGE_NAME_ROUTES.SKILL_TEST);
    }
  }, [isError]);

  return (
    <div className="skill-test-result">
      <div className="result">
        Your result:
        <Space className="item">
          <AppTag color="error">
            {score}/{questionCount - essayCount}{" "}
          </AppTag>
          <AppTag color="success">selection questions</AppTag>
        </Space>
        and
        <Space className="item">
          <AppTag color="error">{essayCount} </AppTag>
          <AppTag color="success">constructed-response questions</AppTag>
        </Space>
        waiting for review
      </div>
      <p>We've send email to {email} </p>
      <HiringFlow />
    </div>
  );
};

export default SkillTestRawResult;
