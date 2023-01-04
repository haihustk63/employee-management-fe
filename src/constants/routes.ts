import { ROLES } from "./common";
import Home from "@/pages/home";
import CommonLayout from "@/components/Layouts/CommonLayout";
import Login from "@/pages/login";
import PersonalInfo from "@/pages/personal-info";
import PersonalInfoAccount from "@/pages/personal-info/account";
import PersonalInfoDetail from "@/pages/personal-info/detail";
import LoginEmployee from "@/pages/login";
import CandidateSkillTest from "@/pages/skill-test";
import CandidateLayout from "@/components/Layouts/CandidateLayout";
import AdminDashboard from "@/pages/dashboard";
import EmployeeManagement from "@/pages/employee";
import DeliveryManagement from "@/pages/delivery";
import EducationManagement from "@/pages/education";
import PropertyManagement from "@/pages/property";
import RecruitmentNewsManagement from "@/pages/recruitment-news";
import CandidateProfileManagement from "@/pages/candidate";
import CreateRequest from "@/pages/request/create-request";
import RequestManagement from "@/pages/request";
import PositionManagement from "@/pages/position";
import CreateNewEmployee from "@/pages/employee/create-new";
import UpdateEmployee from "@/pages/employee/update";
import CreateNewRecruitmentNews from "@/pages/recruitment-news/create-new";
import UpdateRecruitmentNews from "@/pages/recruitment-news/update";
import CreateNewEducationProgram from "@/pages/education/create-new";
import UpdateEducationProgram from "@/pages/education/update";
import TestTopicManagement from "@/pages/test-topics";
import CreateTestTopic from "@/pages/test-topics/create-new";
import UpdateTestTopic from "@/pages/test-topics/update";
import TestQuestionManagement from "@/pages/test-questions";
import CreateTestQuestion from "@/pages/test-questions/create-new";
import UpdateTestQuestion from "@/pages/test-questions/update";
import CreateTestPage from "@/pages/tests/create-test";
import ApplyProcess from "@/pages/apply-process";
import CreateJob from "@/pages/jobs/create";
import UpdateJob from "@/pages/jobs/update";
import JobManagement from "@/pages/jobs";
import TestsManagement from "@/pages/tests";
import AccountManagement from "@/pages/account";
import TimeSheet from "@/pages/timesheet";

const { CANDIDATE, EMPLOYEE, DIVISION_MANAGER, ADMIN, SUPER_ADMIN } = ROLES;

export const APP_PAGE_NAME_ROUTES = {
  ACCOUNT: "/accounts",
  APPLY_PROCESS: "/apply-process",
  CANDIDATE: "/candidates",
  DELIVERY: "/deliveries",
  DASHBOARD: "/dashboard",
  EDUCATION_PROGRAMS: "/education-programs",
  EDUCATION_PROGRAMS_LIST: "/education-programs/list",
  EDUCATION_PROGRAMS_CREATE: "/education-programs/create",
  EDUCATION_PROGRAMS_UPDATE: "/education-programs/update/:programId",
  EMPLOYEE: "/employees",
  EMPLOYEE_LIST: "/employees/list",
  EMPLOYEE_CREATE: "/employees/create",
  EMPLOYEE_UPDATE: "/employees/update/:employeeId",
  HIRING_NEWS: "/hiring-news",
  HOME: "/",
  JOB: "/jobs",
  JOB_CREATE: "/jobs/create",
  JOB_LIST: "/jobs/list",
  JOB_UPDATE: "/jobs/update/:jobId",
  LOGIN: "/login",
  PERSONAL_INFO: "/personal-info",
  PERSONAL_INFO_DETAIL: "/personal-info/detail",
  PERSONAL_INFO_ACCOUNT: "/personal-info/account",
  POSITION: "/positions",
  PROPERTY: "/property",
  RECRUITMENT_NEWS: "/recruitment-news",
  RECRUITMENT_NEWS_LIST: "/recruitment-news/list",
  RECRUITMENT_NEWS_CREATE: "/recruitment-news/create",
  RECRUITMENT_NEWS_UPDATE: "/recruitment-news/update/:newsId",
  REQUEST: "/requests",
  REQUEST_CREATE: "/requests/create",
  REQUEST_LIST: "/requests/list",
  SKILL_TEST: "/skill-test",
  TEST_TOPIC: "/test-topics",
  TEST_TOPIC_CREATE: "/test-topics/create",
  TEST_TOPIC_UPDATE: "/test-topics/update/:topicId",
  TEST_QUESTION: "/test-questions",
  TEST_QUESTION_CREATE: "/test-questions/create",
  TEST_QUESTION_LIST: "/test-questions/list",
  TEST_QUESTION_UPDATE: "/test-questions/update/:questionId",
  TESTS: "/tests",
  TESTS_CREATE: "/tests/create",
  TESTS_LIST: "/tests/list",
  TESTS_UPDATE: "/tests/update/:testId",
  TIMESHEET: "/timesheet",
};

export const DYNAMIC_APP_PAGE_ROUTES = {
  EMPLOYEE_UPDATE: (employeeId: any) => `/employees/update/${employeeId}`,
  RECRUITMENT_NEWS_UPDATE: (newsId: any) =>
    `/recruitment-news/update/${newsId}`,
  EDUCATION_PROGRAM_UPDATE: (programId: any) =>
    `/education-programs/update/${programId}`,
  TEST_QUESTION_BY_TOPIC: (topicId: any) =>
    `/test-questions?topicId=${topicId}`,
  TEST_QUESTION_UPDATE: (questionId: any) =>
    `/test-questions/update/${questionId}`,
  JOB_UPDATE: (jobId: any) => `/jobs/update/${jobId}`,
  TEST_UPDATE: (testId: any) => `/tests/update/${testId}`,
};

export const APP_ROUTES = [
  {
    name: APP_PAGE_NAME_ROUTES.ACCOUNT,
    path: APP_PAGE_NAME_ROUTES.ACCOUNT,
    element: AccountManagement,
    layout: CommonLayout,
    role: ROLES.CANDIDATE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.APPLY_PROCESS,
    path: APP_PAGE_NAME_ROUTES.APPLY_PROCESS,
    element: ApplyProcess,
    layout: CandidateLayout,
    role: ROLES.CANDIDATE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.HOME,
    path: APP_PAGE_NAME_ROUTES.HOME,
    element: Home,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.LOGIN,
    path: APP_PAGE_NAME_ROUTES.LOGIN,
    element: Login,
  },
  {
    name: APP_PAGE_NAME_ROUTES.LOGIN,
    path: APP_PAGE_NAME_ROUTES.LOGIN,
    element: LoginEmployee,
  },
  {
    name: APP_PAGE_NAME_ROUTES.PERSONAL_INFO,
    path: APP_PAGE_NAME_ROUTES.PERSONAL_INFO,
    element: PersonalInfo,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
    children: [
      {
        name: APP_PAGE_NAME_ROUTES.PERSONAL_INFO_ACCOUNT,
        path: APP_PAGE_NAME_ROUTES.PERSONAL_INFO_ACCOUNT,
        element: PersonalInfoAccount,
        role: ROLES.EMPLOYEE,
      },
      {
        name: APP_PAGE_NAME_ROUTES.PERSONAL_INFO_DETAIL,
        path: APP_PAGE_NAME_ROUTES.PERSONAL_INFO_DETAIL,
        element: PersonalInfoDetail,
        role: ROLES.EMPLOYEE,
      },
    ],
  },
  {
    name: APP_PAGE_NAME_ROUTES.REQUEST_CREATE,
    path: APP_PAGE_NAME_ROUTES.REQUEST_CREATE,
    element: CreateRequest,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.REQUEST_LIST,
    path: APP_PAGE_NAME_ROUTES.REQUEST_LIST,
    element: RequestManagement,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.SKILL_TEST,
    path: APP_PAGE_NAME_ROUTES.SKILL_TEST,
    element: CandidateSkillTest,
    layout: CandidateLayout,
    role: ROLES.CANDIDATE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.DASHBOARD,
    path: APP_PAGE_NAME_ROUTES.DASHBOARD,
    element: AdminDashboard,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.CANDIDATE,
    path: APP_PAGE_NAME_ROUTES.CANDIDATE,
    element: CandidateProfileManagement,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.EMPLOYEE_LIST,
    path: APP_PAGE_NAME_ROUTES.EMPLOYEE_LIST,
    element: EmployeeManagement,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.EMPLOYEE_CREATE,
    path: APP_PAGE_NAME_ROUTES.EMPLOYEE_CREATE,
    element: CreateNewEmployee,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.EMPLOYEE_UPDATE,
    path: APP_PAGE_NAME_ROUTES.EMPLOYEE_UPDATE,
    element: UpdateEmployee,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.DELIVERY,
    path: APP_PAGE_NAME_ROUTES.DELIVERY,
    element: DeliveryManagement,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.POSITION,
    path: APP_PAGE_NAME_ROUTES.POSITION,
    element: PositionManagement,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS,
    path: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS,
    element: EducationManagement,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS_LIST,
    path: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS_LIST,
    element: EducationManagement,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS_CREATE,
    path: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS_CREATE,
    element: CreateNewEducationProgram,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS_UPDATE,
    path: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS_UPDATE,
    element: UpdateEducationProgram,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.PROPERTY,
    path: APP_PAGE_NAME_ROUTES.PROPERTY,
    element: PropertyManagement,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.RECRUITMENT_NEWS,
    path: APP_PAGE_NAME_ROUTES.RECRUITMENT_NEWS,
    element: RecruitmentNewsManagement,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.RECRUITMENT_NEWS_LIST,
    path: APP_PAGE_NAME_ROUTES.RECRUITMENT_NEWS_LIST,
    element: RecruitmentNewsManagement,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.RECRUITMENT_NEWS_CREATE,
    path: APP_PAGE_NAME_ROUTES.RECRUITMENT_NEWS_CREATE,
    element: CreateNewRecruitmentNews,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.RECRUITMENT_NEWS_UPDATE,
    path: APP_PAGE_NAME_ROUTES.RECRUITMENT_NEWS_UPDATE,
    element: UpdateRecruitmentNews,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.TEST_TOPIC,
    path: APP_PAGE_NAME_ROUTES.TEST_TOPIC,
    element: TestTopicManagement,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.TEST_TOPIC_CREATE,
    path: APP_PAGE_NAME_ROUTES.TEST_TOPIC_CREATE,
    element: CreateTestTopic,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.TEST_TOPIC_UPDATE,
    path: APP_PAGE_NAME_ROUTES.TEST_TOPIC_UPDATE,
    element: UpdateTestTopic,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.TEST_QUESTION,
    path: APP_PAGE_NAME_ROUTES.TEST_QUESTION,
    element: TestQuestionManagement,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.TEST_QUESTION_LIST,
    path: APP_PAGE_NAME_ROUTES.TEST_QUESTION_LIST,
    element: TestQuestionManagement,
    layout: CommonLayout,
    role: ROLES.CANDIDATE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.TEST_QUESTION_CREATE,
    path: APP_PAGE_NAME_ROUTES.TEST_QUESTION_CREATE,
    element: CreateTestQuestion,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.TEST_QUESTION_UPDATE,
    path: APP_PAGE_NAME_ROUTES.TEST_QUESTION_UPDATE,
    element: UpdateTestQuestion,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.TESTS_CREATE,
    path: APP_PAGE_NAME_ROUTES.TESTS_CREATE,
    element: CreateTestPage,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.TESTS,
    path: APP_PAGE_NAME_ROUTES.TESTS,
    element: CreateTestPage,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.TESTS_LIST,
    path: APP_PAGE_NAME_ROUTES.TESTS_LIST,
    element: TestsManagement,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.TESTS_UPDATE,
    path: APP_PAGE_NAME_ROUTES.TESTS_UPDATE,
    element: CreateTestPage,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.JOB_CREATE,
    path: APP_PAGE_NAME_ROUTES.JOB_CREATE,
    element: CreateJob,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.JOB_UPDATE,
    path: APP_PAGE_NAME_ROUTES.JOB_UPDATE,
    element: UpdateJob,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.JOB_LIST,
    path: APP_PAGE_NAME_ROUTES.JOB_LIST,
    element: JobManagement,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.JOB,
    path: APP_PAGE_NAME_ROUTES.JOB,
    element: JobManagement,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.TIMESHEET,
    path: APP_PAGE_NAME_ROUTES.TIMESHEET,
    element: TimeSheet,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
];
