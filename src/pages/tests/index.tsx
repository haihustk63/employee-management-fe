import { createContext, useEffect, useMemo, useState } from "react";
import ContestantListModal from "@/components/pages/test/ContestantList";
import TestList from "@/components/pages/test/TestList";
import { useAssignTest, useGetAllTests } from "@/hooks/tests";
import useModal from "@/hooks/useModal";
import { useNavigate } from "react-router-dom";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import AssignTestModal from "@/components/pages/test/AssignTestModal";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "@/modules/currentUser";
import { APP_ROLES } from "@/constants/common";
import ShowTestModal from "@/components/pages/create-test/ShowTest";

export const TestsContext = createContext({});

export const TestsManagement = () => {
  const navigate = useNavigate();
  const { employee } = useRecoilValue(currentUserAtom);

  const { data: tests = [], isLoading, isFetching } = useGetAllTests();
  const [contestantList, setContestantList] = useState([]);
  const { mutate: onAssign, isError, isSuccess, error } = useAssignTest();

  const {
    handleToggleModal: toggleContestantModal,
    showModal: showContestantModal,
  } = useModal();
  const { handleToggleModal: toggleAssignModal, showModal: showAssignModal } =
    useModal();
  const {
    showModal: showTestDetailModal,
    handleToggleModal: toggleTestDetailModal,
  } = useModal();

  const [assignment, setAssignment] = useState({
    testId: "",
    email: undefined,
  });

  const [testId, setTestId] = useState();

  useTriggerNoti({
    error,
    isSuccess,
    isError,
    messageSuccess: `Assign test for account ${assignment.email} successfully`,
  });

  const isAdmin = useMemo(() => {
    if (
      employee?.role === APP_ROLES.ADMIN.value ||
      employee?.role === APP_ROLES.SUPER_ADMIN.value
    ) {
      return true;
    }
    return false;
  }, [employee]);

  const currentTest = useMemo(() => {
    return tests
      .find((test) => test.id === testId)
      ?.testQuestionSkillTest?.map((item: any) => item.question);
  }, [testId]);

  useEffect(() => {
    if (testId) toggleTestDetailModal();
  }, [testId]);

  const showContestants = (id: number) => () => {
    const contestants = tests.find((test: any) => test.id === id);
    setContestantList(contestants?.skillTestAccount);
    toggleContestantModal();
  };

  const navigateToTestResult = (sessionTestId: number) => () => {
    navigate(DYNAMIC_APP_PAGE_ROUTES.INTERNAL_TEST_RESULT(sessionTestId));
  };

  const handleCloseAssignModal = () => {
    toggleAssignModal();
    setAssignment({ testId: "", email: undefined });
  };

  const assignTest = () => {
    onAssign(assignment);
  };

  const onToggleTestDetailModal = () => {
    toggleTestDetailModal();
    setTestId(undefined);
  };

  return (
    <TestsContext.Provider
      value={{
        tests,
        showContestantModal,
        showAssignModal,
        contestantList,
        assignment,
        isAdmin,
        handleCloseAssignModal,
        showContestants,
        navigateToTestResult,
        toggleAssignModal,
        toggleContestantModal,
        setAssignment,
        assignTest,
        setTestId,
      }}
    >
      <div className="test-management">
        <TestList />
        <ContestantListModal />
        {isAdmin && <AssignTestModal />}
        <ShowTestModal
          test={currentTest}
          isOpenModal={showTestDetailModal}
          toggleModal={onToggleTestDetailModal}
        />
      </div>
    </TestsContext.Provider>
  );
};

export default TestsManagement;
