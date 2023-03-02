import AppButton from "@/components/AppButton";
import AppPrimaryCard from "@/components/AppCard/Primary";
import AppTag from "@/components/AppTag";
import { TEST_STATUS } from "@/constants/common";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { useGetContestantTests } from "@/hooks/tests";
import { getSkillTestStatusLabel } from "@/utils";
import { Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const CandidateSkillTestManagement = () => {
  const navigate = useNavigate();
  const { data: skillTests = [] } = useGetContestantTests();

  const doTest = (id: number) => () => {
    navigate(DYNAMIC_APP_PAGE_ROUTES.DO_TEST(id));
  };

  const viewResult = (id: number) => () => {
    navigate(DYNAMIC_APP_PAGE_ROUTES.SKILL_TEST_RESULT(id));
  };

  return (
    <div className="candidate-skill-test">
      <Text className="app-title">Your Skill Tests</Text>
      <div className="list">
        {skillTests?.map(({ id, test, status }: any) => {
          const notCreated = status !== TEST_STATUS.created.value;
          const notDone = status !== TEST_STATUS.done.value;
          return (
            <AppPrimaryCard
              title={test.title}
              key={id}
              className="skill-test-card"
            >
              <div className="description">
                <Space>
                  <AppTag color={notCreated ? "success" : "error"}>
                    {getSkillTestStatusLabel(status)}
                  </AppTag>
                  <AppTag color={"success"}>{test.duration} Minutes</AppTag>
                </Space>
              </div>
              <div className="actions">
                <AppButton
                  buttonTitle="Do test"
                  disabled={notCreated}
                  onClick={doTest(id)}
                />
                <AppButton
                  buttonTitle="View result"
                  disabled={notDone}
                  onClick={viewResult(id)}
                />
              </div>
            </AppPrimaryCard>
          );
        })}
      </div>
    </div>
  );
};

export default CandidateSkillTestManagement;
