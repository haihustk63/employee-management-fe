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
import { Step } from "intro.js-react";

export const ROLES: { [key: string]: { [key: string]: string | number } } = {
  CANDIDATE: {
    roleName: "CANDIDATE",
    priority: 0,
  },
  EMPLOYEE: {
    roleName: "EMPLOYEE",
    priority: 1,
  },
  DIVISION_MANAGER: {
    roleName: "DIVISION_MANAGER",
    priority: 2,
  },
  ADMIN: {
    roleName: "ADMIN",
    priority: 3,
  },
  SUPER_ADMIN: {
    roleName: "SUPER_ADMIN",
    priority: 4,
  },
};

export const FORM_ITEM_TYPES = {
  TEXT: "text",
  INPUT_NUMBER: "input-number",
  PASSWORD: "password",
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

export const HEADER_CANDIDATE_ITEMS = (candidateId: number) => [
  {
    key: "/skill-test",
    label: "Your skill test",
  },
  {
    key: `/candidate-cv/${candidateId}`,
    label: "Your CV",
  },
];

// Translation
const APP_PAGE_NAME_ROUTES = {
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
    key: APP_PAGE_NAME_ROUTES.ACCOUNT,
    label: "Account",
    icon: <TeamOutlined />,
  },
  {
    key: APP_PAGE_NAME_ROUTES.CANDIDATE,
    label: "Candidate",
    icon: <TeamOutlined />,
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
  {
    key: APP_PAGE_NAME_ROUTES.JOB,
    label: "Jobs",
    icon: <SoundOutlined />,
    children: [
      {
        key: APP_PAGE_NAME_ROUTES.JOB_CREATE,
        label: "Create Jobs",
        icon: <PlusCircleOutlined />,
      },
      {
        key: APP_PAGE_NAME_ROUTES.JOB_LIST,
        label: "Jobs List",
        icon: <TableOutlined />,
      },
    ],
  },
  {
    key: APP_PAGE_NAME_ROUTES.TESTS,
    label: "Tests",
    icon: <SoundOutlined />,
    children: [
      {
        key: APP_PAGE_NAME_ROUTES.TESTS_CREATE,
        label: "Create Tests",
        icon: <PlusCircleOutlined />,
      },
      {
        key: APP_PAGE_NAME_ROUTES.TESTS_LIST,
        label: "Tests List",
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

export const BASIC_ROLES = [
  {
    key: 1,
    value: 0,
    label: "Employee",
  },
  {
    key: 2,
    value: 1,
    label: "Division Manager",
  },
];

export const WORKING_STATUS = [
  {
    key: 1,
    value: "OFFICIAL",
    label: "Official",
  },
  {
    key: 2,
    value: "PROBATIONARY",
    label: "Probationary",
  },
  {
    key: 3,
    value: "TEMPORARY_LAYOFFS",
    label: "Temporary Layoffs",
  },
];

export const COMMON_TYPE_QUESTION = {
  ONE_CHOICE: "ONE_CHOICE",
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  ESSAYS: "ESSAYS",
};

export const SKILL_TEST_INTRO_STEPS: Step[] = [
  {
    title: "Sumary",
    intro:
      "You can see your progress here and you can click on each item to see the corrensponding question.",
    element: ".skill-test-sumary",
  },
  {
    title: "Time",
    intro: "Your time left is shown here.",
    element: ".skill-test-session-info #count-down",
  },
  {
    title: "Previous button",
    intro: "Click this button to go back to the previous question.",
    element: ".skill-test-btn-group #previous-btn",
  },
  {
    title: "Next question",
    intro: "Click this button to move to the next question.",
    element: ".skill-test-btn-group #next-btn",
  },
  {
    title: "Submit",
    intro: "Click this button to submit the test.",
    element: ".skill-test-btn-group #submit-btn",
  },
  {
    title: "Start to attempt",
    intro:
      "Click this button to start the test. You can only attempt one time.",
    element: "#attempt-btn",
  },
];

export const JOB_TYPES: { [key: string]: string | number }[] = [
  {
    key: 0,
    label: "Parttime",
    value: 0,
    color: "warning",
  },
  {
    key: 1,
    label: "Fulltime",
    value: 1,
    color: "success",
  },
];

export const JOB_LEVELS: { [key: string]: string | number }[] = [
  {
    key: 0,
    value: 0,
    label: "Intern",
    color: "black",
  },
  {
    key: 1,
    value: 1,
    label: "Fresher",
    color: "blue",
  },
  {
    key: 2,
    value: 2,
    label: "Junior",
    color: "success",
  },
  {
    key: 3,
    value: 3,
    label: "Middle",
    color: "warning",
  },
  {
    key: 4,
    value: 4,
    label: "Senior",
    color: "error",
  },
];

export const ASSESSMENT: { [key: string]: string | number }[] = [
  {
    key: 0,
    value: 0,
    label: "Failed",
    color: "black",
  },
  {
    key: 1,
    value: 1,
    label: "Not good",
    color: "blue",
  },
  {
    key: 2,
    value: 2,
    label: "Considering",
    color: "success",
  },
  {
    key: 3,
    value: 3,
    label: "Good",
    color: "warning",
  },
  {
    key: 4,
    value: 4,
    label: "Passed",
    color: "error",
  },
];

export const TEST_STATUS = [
  {
    key: 0,
    value: 0,
    label: "Not done yet",
    color: "error",
  },
  {
    key: 1,
    value: 1,
    label: "Submitted",
    color: "success",
  },
];
