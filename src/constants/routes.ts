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
import EmployeeManagement from "@/pages/employee";
import DeliveryManagement from "@/pages/delivery";
import EducationManagement from "@/pages/education";
import PropertyManagement from "@/pages/property";
import RecruitmentNewsManagement from "@/pages/recruiment-news";
import CandidateAccountManagement from "@/pages/candidate/account";
import CandidateProfileManagement from "@/pages/candidate/profile";
import CreateRequest from "@/pages/request/create-request";
import RequestList from "@/pages/request";
import PositionManagement from "@/pages/position";
import CreateNewEmployee from "@/pages/employee/create-new";
import UpdateEmployee from "@/pages/employee/update";
import CreateNewRecruimentNews from "@/pages/recruiment-news/create-new";

export const APP_PAGE_NAME_ROUTES = {
  CANDIDATE: "/candidates",
  CANDIDATE_PROFILE: "/candidate/profiles",
  CANDIDATE_ACCOUNT: "/candidate/accounts",
  DELIVERY: "/deliveries",
  DASHBOARD: "/dashboard",
  EDUCATION_PROGRAMS: "/education-programs",
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
  RECRUIMENT_NEWS: "/recruiment-news",
  RECRUIMENT_NEWS_LIST: "/recruiment-news/list",
  RECRUIMENT_NEWS_CREATE: "/recruiment-news/create",
  REQUEST: "/requests",
  REQUEST_CREATE: "/requests/create",
  REQUEST_LIST: "/requests/list",
  SKILL_TEST: "/skill-test",
};

export const DYNAMIC_APP_PAGE_ROUTES = {
  EMPLOYEE_UPDATE: (employeeId: any) => `/employees/update/${employeeId}`,
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
    name: APP_PAGE_NAME_ROUTES.PROPERTY,
    path: APP_PAGE_NAME_ROUTES.PROPERTY,
    element: PropertyManagement,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.RECRUIMENT_NEWS,
    path: APP_PAGE_NAME_ROUTES.RECRUIMENT_NEWS,
    element: RecruitmentNewsManagement,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.RECRUIMENT_NEWS_LIST,
    path: APP_PAGE_NAME_ROUTES.RECRUIMENT_NEWS_LIST,
    element: RecruitmentNewsManagement,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME_ROUTES.RECRUIMENT_NEWS_CREATE,
    path: APP_PAGE_NAME_ROUTES.RECRUIMENT_NEWS_CREATE,
    element: CreateNewRecruimentNews,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
];
