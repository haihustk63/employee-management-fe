import { StarFilled } from "@ant-design/icons";

export enum ROLES {
  EMPLOYEE = -1,
  DIVISION_MANAGER,
  ADMIN,
  SUPER_ADMIN,
  CANDIDATE,
}

export const FORM_ITEM_TYPES = {
  TEXT: "text",
  TEXTAREA: "textarea",
  SELECT: "select",
};

export const HEADER_ITEMS = [
  {
    key: "/",
    label: "Home",
  },
  {
    key: "/requests",
    label: "Requests",
  },
  {
    key: "/education-programs",
    label: "Education Programs",
  },
];

// Translation
const APP_PAGE_NAME_ROUTES = {
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
  REQUEST: "/requests",
  REQUEST_ADD: "/requests/add",
  REQUEST_LIST: "/requests/list",
  SKILL_TEST: "/skill-test",
};
export const SIDER_ITEMS = [
  {
    key: APP_PAGE_NAME_ROUTES.DASHBOARD,
    label: "Dashboard",
    icon: <StarFilled />,
  },
  {
    key: APP_PAGE_NAME_ROUTES.HOME,
    label: "Home",
    icon: <StarFilled />,
  },
  {
    key:APP_PAGE_NAME_ROUTES.REQUEST,
    label: "Request",
    icon: <StarFilled />,
    children: [
      {
        key: APP_PAGE_NAME_ROUTES.REQUEST_ADD,
        label: "Add Request",
        icon: <StarFilled />,
      },
      {
        key: APP_PAGE_NAME_ROUTES.REQUEST_LIST,
        label: "Requests List",
        icon: <StarFilled />,
      },
    ],
  },
  {
    key: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS,
    label: "Education",
    icon: <StarFilled />,
  },
  {
    key: APP_PAGE_NAME_ROUTES.PROPERTY,
    label: "Property",
    icon: <StarFilled />,
  },
  {
    key: APP_PAGE_NAME_ROUTES.CANDIDATE,
    label: "Candidate",
    icon: <StarFilled />,
    children: [
      {
        key: APP_PAGE_NAME_ROUTES.CANDIDATE_ACCOUNT,
        label: "Account Management",
        icon: <StarFilled />,
      },
      {
        key: APP_PAGE_NAME_ROUTES.CANDIDATE_PROFILE,
        label: "Profile Management",
        icon: <StarFilled />,
      },
    ],
  },
  {
    key: APP_PAGE_NAME_ROUTES.EMPLOYEE,
    label: "Employee",
    icon: <StarFilled />,
  },
  {
    key: APP_PAGE_NAME_ROUTES.DELIVERY,
    label: "Delivery",
    icon: <StarFilled />,
  },
  {
    key: APP_PAGE_NAME_ROUTES.POSITION,
    label: "Position",
    icon: <StarFilled />,
  },
  {
    key: APP_PAGE_NAME_ROUTES.RECRUIMENT_NEWS,
    label: "Recruiment News",
    icon: <StarFilled />,
  },
];

export const MANAGER_EXAMPLE = [
  {
    key: 1,
    value: 1,
    label: "Manager 1",
  },
  {
    key: 2,
    value: 2,
    label: "Manager 2",
  },
];
