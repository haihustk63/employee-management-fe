import { useContext, useMemo } from "react";

import AppList from "@/components/AppList";
import AppModal from "@/components/AppModal";
import { TestsContext } from "@/pages/tests";
import { getSkillTestStatusLabel } from "@/utils";
import { TEST_STATUS } from "@/constants/common";
const { done } = TEST_STATUS;

const ContestantList = () => {
  const {
    showContestantModal,
    toggleContestantModal,
    contestantList,
    navigateToTestResult,
  } = useContext(TestsContext) as any;

  const listItems = useMemo(() => {
    return contestantList?.map((contestant: any) => ({
      onClick:
        contestant.status !== done.value
          ? null
          : navigateToTestResult(contestant.id),
      title: contestant.email,
      description: getSkillTestStatusLabel(contestant.status),
    }));
  }, [contestantList]);

  return (
    <AppModal open={showContestantModal} onCancel={toggleContestantModal}>
      <div className="contestant-list">
        <AppList dataSource={listItems} />
      </div>
    </AppModal>
  );
};

export default ContestantList;
