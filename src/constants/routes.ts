import { ROLES } from "./common";
import Home from "@/pages/home";
import CommonLayout from "@/components/Layouts/CommonLayout";
import Login from "@/pages/login";
import AuthLayout from "@/components/Layouts/AuthLayout";
import PersonalInfo from "@/pages/personal-info";
import PersonalInfoAccount from "@/pages/personal-info/account";
import PersonalInfoDetail from "@/pages/personal-info/detail";
import LoginCandidate from "@/pages/login/candidate";
import LoginEmployee from "@/pages/login/employee";
import CandidateSkillTest from "@/pages/skill-test";
import SkillTestLayout from "@/components/Layouts/SkillTestLayout";
import AdminDashboard from "@/pages/dashboard";
import CandidateManagement from "@/pages/candidate";
import EmployeeManagement from "@/pages/employee/profile";
import DeliveryManagement from "@/pages/delivery";
import EducationManagement from "@/pages/education";
import PropertyManagement from "@/pages/property";
import RecruitmentNewsManagement from "@/pages/recruitment-news";
import CandidateAccountManagement from "@/pages/candidate/account";
import CandidateProfileManagement from "@/pages/candidate/profile";
import CreateRequest from "@/pages/request/create-request";
import RequestList from "@/pages/request";
import PositionManagement from "@/pages/position";
import CreateNewEmployee from "@/pages/employee/profile/create-new";
import UpdateEmployee from "@/pages/employee/profile/update";
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

export const APP_PAGE_NAME_ROUTES = {
  CANDIDATE: "/candidates",
  CANDIDATE_PROFILE: "/candidate/profiles",
  CANDIDATE_ACCOUNT: "/candidate/accounts",
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
  LOGIN: "/login",
  LOGIN_CANDIDATE: "/login/candidate",
  LOGIN_EMPLOYEE: "/login/employee",
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
};

export const DYNAMIC_APP_PAGE_ROUTES = {
  EMPLOYEE_UPDATE: (employeeId: any) => `/employees/update/${employeeId}`,
  RECRUITMENT_NEWS_UPDATE: (newsId: any) =>
    `/recruitment-news/update/${newsId}`,
  EDUCATION_PROGRAM_UPDATE: (programId: any) =>
    `/education-programs/update/${programId}`,
  TEST_QUESTION_BY_TOPIC: (topicId: any) =>
    `/test-questions?topicId=${topicId}`,
  TEST_QUESTION_UPDATE: (questionId: any) => `/test-questions/update/${questionId}`,
};

export const APP_ROUTES = [
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
    layout: AuthLayout,
  },
  {
    name: APP_PAGE_NAME_ROUTES.LOGIN_CANDIDATE,
    path: APP_PAGE_NAME_ROUTES.LOGIN_CANDIDATE,
    element: LoginCandidate,
    layout: AuthLayout,
  },
  {
    name: APP_PAGE_NAME_ROUTES.LOGIN_EMPLOYEE,
    path: APP_PAGE_NAME_ROUTES.LOGIN_EMPLOYEE,
    element: LoginEmployee,
    layout: AuthLayout,
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
    element: RequestList,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.SKILL_TEST,
    path: APP_PAGE_NAME_ROUTES.SKILL_TEST,
    element: CandidateSkillTest,
    layout: SkillTestLayout,
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
    element: CandidateManagement,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.CANDIDATE_ACCOUNT,
    path: APP_PAGE_NAME_ROUTES.CANDIDATE_ACCOUNT,
    element: CandidateAccountManagement,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.CANDIDATE_PROFILE,
    path: APP_PAGE_NAME_ROUTES.CANDIDATE_PROFILE,
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
    role: ROLES.EMPLOYEE,
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
];
