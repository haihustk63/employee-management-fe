import {
  HomeOutlined,
  SendOutlined,
  PlusCircleOutlined,
  TableOutlined,
  BookOutlined,
  GoldOutlined,
  TeamOutlined,
  SolutionOutlined,
  SmileOutlined,
  UsergroupAddOutlined,
  BlockOutlined,
  SoundOutlined,
  AimOutlined,
  CalculatorOutlined,
} from "@ant-design/icons";

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
  TEST_QUESTION_LIST: "/test-questions/list",
  TEST_QUESTION_CREATE: "/test-questions/create",
  TEST_QUESTION_UPDATE: "/test-questions/update/:questionId",
};
export const SIDER_ITEMS = [
  {
    key: APP_PAGE_NAME_ROUTES.DASHBOARD,
    label: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    key: APP_PAGE_NAME_ROUTES.HOME,
    label: "Home",
    icon: <HomeOutlined />,
  },
  {
    key: APP_PAGE_NAME_ROUTES.REQUEST,
    label: "Request",
    icon: <SendOutlined />,
    children: [
      {
        key: APP_PAGE_NAME_ROUTES.REQUEST_CREATE,
        label: "Create Request",
        icon: <PlusCircleOutlined />,
      },
      {
        key: APP_PAGE_NAME_ROUTES.REQUEST_LIST,
        label: "Requests List",
        icon: <TableOutlined />,
      },
    ],
  },
  {
    key: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS,
    label: "Education",
    icon: <BookOutlined />,
    children: [
      {
        key: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS_CREATE,
        label: "Create Education Program",
        icon: <SmileOutlined />,
      },
      {
        key: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS_LIST,
        label: "List Education Programs",
        icon: <SolutionOutlined />,
      },
    ],
  },
  {
    key: APP_PAGE_NAME_ROUTES.PROPERTY,
    label: "Property",
    icon: <GoldOutlined />,
  },
  {
    key: APP_PAGE_NAME_ROUTES.CANDIDATE,
    label: "Candidate",
    icon: <TeamOutlined />,
    children: [
      {
        key: APP_PAGE_NAME_ROUTES.CANDIDATE_ACCOUNT,
        label: "Account Management",
        icon: <SmileOutlined />,
      },
      {
        key: APP_PAGE_NAME_ROUTES.CANDIDATE_PROFILE,
        label: "Profile Management",
        icon: <SolutionOutlined />,
      },
    ],
  },
  {
    key: APP_PAGE_NAME_ROUTES.EMPLOYEE,
    label: "Employee",
    icon: <UsergroupAddOutlined />,
    children: [
      {
        key: APP_PAGE_NAME_ROUTES.EMPLOYEE_CREATE,
        label: "Create Employee",
        icon: <PlusCircleOutlined />,
      },
      {
        key: APP_PAGE_NAME_ROUTES.EMPLOYEE_LIST,
        label: "Employee List",
        icon: <TableOutlined />,
      },
    ],
  },
  {
    key: APP_PAGE_NAME_ROUTES.DELIVERY,
    label: "Delivery",
    icon: <BlockOutlined />,
  },
  {
    key: APP_PAGE_NAME_ROUTES.POSITION,
    label: "Position",
    icon: <AimOutlined />,
  },
  {
    key: APP_PAGE_NAME_ROUTES.RECRUITMENT_NEWS,
    label: "Recruitment News",
    icon: <SoundOutlined />,
    children: [
      {
        key: APP_PAGE_NAME_ROUTES.RECRUITMENT_NEWS_CREATE,
        label: "Create Recruitment News",
        icon: <PlusCircleOutlined />,
      },
      {
        key: APP_PAGE_NAME_ROUTES.RECRUITMENT_NEWS_LIST,
        label: "Recruitment News List",
        icon: <TableOutlined />,
      },
    ],
  },
  {
    key: APP_PAGE_NAME_ROUTES.TEST_TOPIC,
    label: "Test Topics",
    icon: <CalculatorOutlined />,
  },
  {
    key: APP_PAGE_NAME_ROUTES.TEST_QUESTION,
    label: "Test Questions",
    icon: <SoundOutlined />,
    children: [
      {
        key: APP_PAGE_NAME_ROUTES.TEST_QUESTION_CREATE,
        label: "Create Test Questions",
        icon: <PlusCircleOutlined />,
      },
      {
        key: APP_PAGE_NAME_ROUTES.TEST_QUESTION_LIST,
        label: "Test Questions List",
        icon: <TableOutlined />,
      },
    ],
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

export const COMMON_TYPE_QUESTION = {
  ONE_CHOICE: "ONE_CHOICE",
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
};
