import AppPrimaryCard from "@/components/AppCard/Primary";
import AppTag from "@/components/AppTag";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { useGetContestantTests } from "@/hooks/tests";
import { useNavigate } from "react-router-dom";

const CandidateSkillTestManagement = () => {
  const navigate = useNavigate();
  const { data: skillTests = [] } = useGetContestantTests();

  const doTest = (id: number) => () => {
    navigate(DYNAMIC_APP_PAGE_ROUTES.DO_TEST(id));
  };

  return (
    <div className="candidate-skill-test">
      {skillTests?.map(({ id, test, attempted }: any) => {
        return (
          <AppPrimaryCard
            title={test.title}
            key={id}
            onClick={attempted ? null : doTest(id)}
          >
            <AppTag color={attempted ? "success" : "error"}>
              {attempted ? "Done" : "Not done"}
            </AppTag>
          </AppPrimaryCard>
        );
      })}
    </div>
  );
};

export default CandidateSkillTestManagement;
