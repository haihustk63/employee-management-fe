import AppPrimaryCard from "@/components/AppCard/Primary";
import AppTag from "@/components/AppTag";
import { TEST_STATUS } from "@/constants/common";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { useGetContestantTests } from "@/hooks/tests";
import { getSkillTestStatusLabel } from "@/utils";
import { useNavigate } from "react-router-dom";

const CandidateSkillTestManagement = () => {
  const navigate = useNavigate();
  const { data: skillTests = [] } = useGetContestantTests();

  const doTest = (id: number) => () => {
    navigate(DYNAMIC_APP_PAGE_ROUTES.DO_TEST(id));
  };

  return (
    <div className="candidate-skill-test">
      {skillTests?.map(({ id, test, status }: any) => {
        const notCreated = status !== TEST_STATUS.created.value;
        return (
          <AppPrimaryCard
            title={test.title}
            key={id}
            onClick={notCreated ? null : doTest(id)}
          >
            <AppTag color={notCreated ? "success" : "error"}>
              {getSkillTestStatusLabel(status)}
            </AppTag>
          </AppPrimaryCard>
        );
      })}
    </div>
  );
};

export default CandidateSkillTestManagement;
