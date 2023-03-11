import AppSearchKeyword from "@/components/AppSearchKeyword";
import ShowTestModal from "@/components/pages/create-test/ShowTest";
import AssignTestModal from "@/components/pages/test/AssignTestModal";
import ContestantListModal from "@/components/pages/test/ContestantList";
import TestList from "@/components/pages/test/TestList";
import { APP_ROLES } from "@/constants/common";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";
import { useAssignTest, useGetAllTests } from "@/hooks/tests";
import useModal from "@/hooks/useModal";
import { useTableParams } from "@/hooks/useTableParams";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { currentUserAtom } from "@/modules/currentUser";
import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export const TestsContext = createContext({});

export const TestsManagement = () => {
  const navigate = useNavigate();
  const { employee } = useRecoilValue(currentUserAtom);

  const [contestantList, setContestantList] = useState([]);
  const {
    mutate: onAssign,
    isError,
    isSuccess,
    error,
    isLoading: loadingAssingTest,
  } = useAssignTest();

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

  const {
    isInit,
    queryParams,
    searchParams,
    setQueryParams,
    resetPageParams,
    setIsInit,
  } = useTableParams();

  const { data: tests = {} } = useGetAllTests(queryParams) as any;

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
    return tests.data
      ?.find((test: any) => test.id === testId)
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
        loadingAssingTest,
        isInit,
        queryParams,
        searchParams,
        setQueryParams,
        resetPageParams,
        setIsInit,
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
