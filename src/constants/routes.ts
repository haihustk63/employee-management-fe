import CandidateLayout from "@/components/Layouts/CandidateLayout";
import CommonLayout from "@/components/Layouts/CommonLayout";
import AccountManagement from "@/pages/account";
import ApplyProcess from "@/pages/apply-process";
import CandidateProfileManagement from "@/pages/candidate";
import AdminDashboard from "@/pages/dashboard";
import DeliveryManagement from "@/pages/delivery";
import EducationManagement from "@/pages/education";
import CreateNewEducationProgram from "@/pages/education/create-new";
import UpdateEducationProgram from "@/pages/education/update";
import EmployeeManagement from "@/pages/employee";
import CreateNewEmployee from "@/pages/employee/create-new";
import UpdateEmployee from "@/pages/employee/update";
import Home from "@/pages/home";
import JobManagement from "@/pages/jobs";
import CreateJob from "@/pages/jobs/create";
import UpdateJob from "@/pages/jobs/update";
import LoginEmployee from "@/pages/login";
import PersonalInfo from "@/pages/personal-info";
import PersonalInfoAccount from "@/pages/personal-info/account";
import PersonalInfoDetail from "@/pages/personal-info/detail";
import PositionManagement from "@/pages/position";
import PropertyManagement from "@/pages/property";
import RecruitmentNewsManagement from "@/pages/recruitment-news";
import CreateNewRecruitmentNews from "@/pages/recruitment-news/create-new";
import UpdateRecruitmentNews from "@/pages/recruitment-news/update";
import RequestManagement from "@/pages/request";
import CreateRequest from "@/pages/request/create-request";
import CandidateSkillTest from "@/pages/skill-test";
import TestQuestionManagement from "@/pages/test-questions";
import CreateTestQuestion from "@/pages/test-questions/create-new";
import UpdateTestQuestion from "@/pages/test-questions/update";
import TestTopicManagement from "@/pages/test-topics";
import TestsManagement from "@/pages/tests";
import CreateTestPage from "@/pages/tests/create-test";
import TimeSheet from "@/pages/timesheet";
import { APP_ROLES } from "./common";

const {
  CANDIDATE: { value: roleCandidate },
  EMPLOYEE: { value: roleEmployee },
  DIVISION_MANAGER: { value: roleDivisionManager },
  ADMIN: { value: roleAdmin },
  SUPER_ADMIN: { value: roleSuperAdmin },
} = APP_ROLES;

export const APP_PAGE_NAME_ROUTES = {
  ACCOUNT: "/accounts",
  APPLY_PROCESS: "/apply-process",
  CANDIDATE: "/candidates",
  DELIVERY: "/deliveries",
  DASHBOARD: "/dashboard",
  EDUCATION_PROGRAMS: "/education-programs",
  EDUCATION_PROGRAMS_LIST: "/education-programs/list",
  EDUCATION_PROGRAMS_CREATE: "/education-programs/create",
  EDUCATION_PROGRAMS_UPDATE: "/education-programs/:programId/update",
  EMPLOYEE: "/employees",
  EMPLOYEE_LIST: "/employees/list",
  EMPLOYEE_CREATE: "/employees/create",
  EMPLOYEE_UPDATE: "/employees/:employeeId/update",
  HIRING_NEWS: "/hiring-news",
  HOME: "/",
  JOB: "/jobs",
  JOB_CREATE: "/jobs/create",
  JOB_LIST: "/jobs/list",
  JOB_UPDATE: "/jobs/:jobId/update",
  LOGIN: "/login",
  PERSONAL_INFO: "/personal-info",
  PERSONAL_INFO_DETAIL: "/personal-info/detail",
  PERSONAL_INFO_ACCOUNT: "/personal-info/account",
  POSITION: "/positions",
  PROPERTY: "/property",
  RECRUITMENT_NEWS: "/recruitment-news",
  RECRUITMENT_NEWS_LIST: "/recruitment-news/list",
  RECRUITMENT_NEWS_CREATE: "/recruitment-news/create",
  RECRUITMENT_NEWS_UPDATE: "/recruitment-news/:newsId/update",
  REQUEST: "/requests",
  REQUEST_CREATE: "/requests/create",
  REQUEST_LIST: "/requests/list",
  SKILL_TEST: "/skill-test",
  TEST_TOPIC: "/test-topics",
  TEST_TOPIC_CREATE: "/test-topics/create",
  TEST_TOPIC_UPDATE: "/test-topics/:topicId/update",
  TEST_QUESTION: "/test-questions",
  TEST_QUESTION_CREATE: "/test-questions/create",
  TEST_QUESTION_LIST: "/test-questions/list",
  TEST_QUESTION_UPDATE: "/test-questions/:questionId/update",
  TESTS: "/tests",
  TESTS_CREATE: "/tests/create",
  TESTS_LIST: "/tests/list",
  TESTS_UPDATE: "/tests/:testId/update",
  TIMESHEET: "/timesheet",
};

export const DYNAMIC_APP_PAGE_ROUTES = {
  EMPLOYEE_UPDATE: (employeeId: any) => `/employees/${employeeId}/update`,
  RECRUITMENT_NEWS_UPDATE: (newsId: any) =>
    `/recruitment-news/${newsId}/update`,
  EDUCATION_PROGRAM_UPDATE: (programId: any) =>
    `/education-programs/${programId}/update`,
  TEST_QUESTION_BY_TOPIC: (topicId: any) =>
    `/test-questions?topicId=${topicId}`,
  TEST_QUESTION_UPDATE: (questionId: any) =>
    `/test-questions/${questionId}/update`,
  JOB_UPDATE: (jobId: any) => `/jobs/${jobId}/update`,
  TEST_UPDATE: (testId: any) => `/tests/${testId}/update`,
};

export const APP_ROUTES = [
  {
    name: APP_PAGE_NAME_ROUTES.ACCOUNT,
    path: APP_PAGE_NAME_ROUTES.ACCOUNT,
    element: AccountManagement,
    layout: CommonLayout,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.APPLY_PROCESS,
    path: APP_PAGE_NAME_ROUTES.APPLY_PROCESS,
    element: ApplyProcess,
    layout: CandidateLayout,
    roles: [roleCandidate],
  },
  {
    name: APP_PAGE_NAME_ROUTES.HOME,
    path: APP_PAGE_NAME_ROUTES.HOME,
    element: Home,
    layout: CommonLayout,
    roles: [roleEmployee, roleDivisionManager, roleAdmin, roleSuperAdmin],
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
    roles: [roleEmployee, roleDivisionManager, roleAdmin, roleSuperAdmin],
    children: [
      {
        name: APP_PAGE_NAME_ROUTES.PERSONAL_INFO_ACCOUNT,
        path: APP_PAGE_NAME_ROUTES.PERSONAL_INFO_ACCOUNT,
        element: PersonalInfoAccount,
        roles: [roleEmployee, roleDivisionManager, roleAdmin, roleSuperAdmin],
      },
      {
        name: APP_PAGE_NAME_ROUTES.PERSONAL_INFO_DETAIL,
        path: APP_PAGE_NAME_ROUTES.PERSONAL_INFO_DETAIL,
        element: PersonalInfoDetail,
        roles: [roleEmployee, roleDivisionManager, roleAdmin, roleSuperAdmin],
      },
    ],
  },
  {
    name: APP_PAGE_NAME_ROUTES.REQUEST_CREATE,
    path: APP_PAGE_NAME_ROUTES.REQUEST_CREATE,
    element: CreateRequest,
    layout: CommonLayout,
    roles: [roleEmployee, roleDivisionManager, roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.REQUEST_LIST,
    path: APP_PAGE_NAME_ROUTES.REQUEST_LIST,
    element: RequestManagement,
    layout: CommonLayout,
    roles: [roleEmployee, roleDivisionManager, roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.SKILL_TEST,
    path: APP_PAGE_NAME_ROUTES.SKILL_TEST,
    element: CandidateSkillTest,
    layout: CandidateLayout,
    roles: [roleCandidate],
  },
  {
    name: APP_PAGE_NAME_ROUTES.DASHBOARD,
    path: APP_PAGE_NAME_ROUTES.DASHBOARD,
    element: AdminDashboard,
    layout: CommonLayout,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.CANDIDATE,
    path: APP_PAGE_NAME_ROUTES.CANDIDATE,
    element: CandidateProfileManagement,
    layout: CommonLayout,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.EMPLOYEE_LIST,
    path: APP_PAGE_NAME_ROUTES.EMPLOYEE_LIST,
    element: EmployeeManagement,
    layout: CommonLayout,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.EMPLOYEE_CREATE,
    path: APP_PAGE_NAME_ROUTES.EMPLOYEE_CREATE,
    element: CreateNewEmployee,
    layout: CommonLayout,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.EMPLOYEE_UPDATE,
    path: APP_PAGE_NAME_ROUTES.EMPLOYEE_UPDATE,
    element: UpdateEmployee,
    layout: CommonLayout,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.DELIVERY,
    path: APP_PAGE_NAME_ROUTES.DELIVERY,
    element: DeliveryManagement,
    layout: CommonLayout,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.POSITION,
    path: APP_PAGE_NAME_ROUTES.POSITION,
    element: PositionManagement,
    layout: CommonLayout,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS,
    path: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS,
    element: EducationManagement,
    layout: CommonLayout,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS_LIST,
    path: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS_LIST,
    element: EducationManagement,
    layout: CommonLayout,
    roles: [roleEmployee, roleDivisionManager, roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS_CREATE,
    path: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS_CREATE,
    element: CreateNewEducationProgram,
    layout: CommonLayout,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS_UPDATE,
    path: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS_UPDATE,
    element: UpdateEducationProgram,
    layout: CommonLayout,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.PROPERTY,
    path: APP_PAGE_NAME_ROUTES.PROPERTY,
    element: PropertyManagement,
    layout: CommonLayout,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.RECRUITMENT_NEWS,
    path: APP_PAGE_NAME_ROUTES.RECRUITMENT_NEWS,
    element: RecruitmentNewsManagement,
    layout: CommonLayout,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.RECRUITMENT_NEWS_LIST,
    path: APP_PAGE_NAME_ROUTES.RECRUITMENT_NEWS_LIST,
    element: RecruitmentNewsManagement,
    layout: CommonLayout,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.RECRUITMENT_NEWS_CREATE,
    path: APP_PAGE_NAME_ROUTES.RECRUITMENT_NEWS_CREATE,
    element: CreateNewRecruitmentNews,
    layout: CommonLayout,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.RECRUITMENT_NEWS_UPDATE,
    path: APP_PAGE_NAME_ROUTES.RECRUITMENT_NEWS_UPDATE,
    element: UpdateRecruitmentNews,
    layout: CommonLayout,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.TEST_TOPIC,
    path: APP_PAGE_NAME_ROUTES.TEST_TOPIC,
    element: TestTopicManagement,
    layout: CommonLayout,
    roles: [roleDivisionManager, roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.TEST_QUESTION,
    path: APP_PAGE_NAME_ROUTES.TEST_QUESTION,
    element: TestQuestionManagement,
    layout: CommonLayout,
    roles: [roleDivisionManager, roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.TEST_QUESTION_LIST,
    path: APP_PAGE_NAME_ROUTES.TEST_QUESTION_LIST,
    element: TestQuestionManagement,
    layout: CommonLayout,
    roles: [roleDivisionManager, roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.TEST_QUESTION_CREATE,
    path: APP_PAGE_NAME_ROUTES.TEST_QUESTION_CREATE,
    element: CreateTestQuestion,
    layout: CommonLayout,
    roles: [roleDivisionManager, roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.TEST_QUESTION_UPDATE,
    path: APP_PAGE_NAME_ROUTES.TEST_QUESTION_UPDATE,
    element: UpdateTestQuestion,
    layout: CommonLayout,
    roles: [roleDivisionManager, roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.TESTS_CREATE,
    path: APP_PAGE_NAME_ROUTES.TESTS_CREATE,
    element: CreateTestPage,
    layout: CommonLayout,
    roles: [roleDivisionManager, roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.TESTS,
    path: APP_PAGE_NAME_ROUTES.TESTS,
    element: CreateTestPage,
    layout: CommonLayout,
    roles: [roleDivisionManager, roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.TESTS_LIST,
    path: APP_PAGE_NAME_ROUTES.TESTS_LIST,
    element: TestsManagement,
    layout: CommonLayout,
    roles: [roleDivisionManager, roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.TESTS_UPDATE,
    path: APP_PAGE_NAME_ROUTES.TESTS_UPDATE,
    element: CreateTestPage,
    layout: CommonLayout,
    roles: [roleDivisionManager, roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.JOB_CREATE,
    path: APP_PAGE_NAME_ROUTES.JOB_CREATE,
    element: CreateJob,
    layout: CommonLayout,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.JOB_UPDATE,
    path: APP_PAGE_NAME_ROUTES.JOB_UPDATE,
    element: UpdateJob,
    layout: CommonLayout,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.JOB_LIST,
    path: APP_PAGE_NAME_ROUTES.JOB_LIST,
    element: JobManagement,
    layout: CommonLayout,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.JOB,
    path: APP_PAGE_NAME_ROUTES.JOB,
    element: JobManagement,
    layout: CommonLayout,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    name: APP_PAGE_NAME_ROUTES.TIMESHEET,
    path: APP_PAGE_NAME_ROUTES.TIMESHEET,
    element: TimeSheet,
    layout: CommonLayout,
    roles: [roleEmployee, roleDivisionManager, roleAdmin, roleSuperAdmin],
  },
];
