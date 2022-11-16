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
import AddRequest from "@/pages/request/add-request";
import RequestList from "@/pages/request/request-list";

export const APP_PAGE_NAME_ROUTES = {
  CANDIDATE: "/candidates",
  CANDIDATE_PROFILE: "/candidate/profiles",
  CANDIDATE_ACCOUNT: "/candidate/accounts",
  DELIVERY: "/deliveries",
  DASHBOARD: "/dashboard",
  EDUCATION_PROGRAMS: "/education-programs",
  EMPLOYEE: "/employees",
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
  REQUEST_ADD: "/requests/add",
  REQUEST_LIST: "/requests/list",
  SKILL_TEST: "/skill-test",
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
    name: APP_PAGE_NAME_ROUTES.REQUEST_ADD,
    path: APP_PAGE_NAME_ROUTES.REQUEST_ADD,
    element: AddRequest,
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
    name: APP_PAGE_NAME_ROUTES.EMPLOYEE,
    path: APP_PAGE_NAME_ROUTES.EMPLOYEE,
    element: EmployeeManagement,
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
];
