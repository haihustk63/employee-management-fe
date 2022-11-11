import { ROLES } from "./common";
import Home from "@/pages/home";
import CommonLayout from "@/components/Layouts/CommonLayout";
import Login from "@/pages/login";
import AuthLayout from "@/components/Layouts/AuthLayout";
import PersonalInfo from "@/pages/personal-info";
import PersonalInfoAccount from "@/pages/personal-info/account";
import PersonalInfoDetail from "@/pages/personal-info/detail";
import Request from "@/pages/request";

const APP_PAGE_NAME = {
  HOME: "/",
  LOGIN: "/login",
  TEST: "/test",
  REQUEST: "/requests",
  PERSONAL_INFO: "/personal-info",
  PERSONAL_INFO_DETAIL: "/personal-info/detail",
  PERSONAL_INFO_ACCOUNT: "/personal-info/account",
  DELIVERY: "/deliveries",
  CANDIDATE: "/candidates",
  HIRING_NEWS: "/hiring-news",
  EDUCATION_PROGRAMS: "/education-programs",
  PROPERTY: "/property",
};

export const APP_ROUTES = [
  {
    name: APP_PAGE_NAME.HOME,
    path: APP_PAGE_NAME.HOME,
    element: Home,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
  {
    name: APP_PAGE_NAME.LOGIN,
    path: APP_PAGE_NAME.LOGIN,
    element: Login,
    layout: AuthLayout,
  },
  {
    name: APP_PAGE_NAME.PERSONAL_INFO,
    path: APP_PAGE_NAME.PERSONAL_INFO,
    element: PersonalInfo,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
    children: [
      {
        name: APP_PAGE_NAME.PERSONAL_INFO_ACCOUNT,
        path: APP_PAGE_NAME.PERSONAL_INFO_ACCOUNT,
        element: PersonalInfoAccount,
        role: ROLES.EMPLOYEE,
      },
      {
        name: APP_PAGE_NAME.PERSONAL_INFO_DETAIL,
        path: APP_PAGE_NAME.PERSONAL_INFO_DETAIL,
        element: PersonalInfoDetail,
        role: ROLES.EMPLOYEE,
      },
    ],
  },
  {
    name: APP_PAGE_NAME.REQUEST,
    path: APP_PAGE_NAME.REQUEST,
    element: Request,
    layout: CommonLayout,
    role: ROLES.EMPLOYEE,
  },
];
