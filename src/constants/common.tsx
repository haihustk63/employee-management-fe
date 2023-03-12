import CandidateIcon from "@/components/Icons/CandidateIcon";
import EmployeeIcon from "@/components/Icons/EmployeeIcon";
import EssayIcon from "@/components/Icons/EssayIcon";
import JobIcon from "@/components/Icons/JobIcon";
import PositionIcon from "@/components/Icons/PositionIcon";
import SkillTestIcon from "@/components/Icons/SkillTestIcon";
import TopicIcon from "@/components/Icons/TopicIcon";
import {
  AppstoreFilled,
  BookFilled,
  CalendarFilled,
  EditFilled,
  HomeFilled,
  IdcardFilled,
  PieChartFilled,
  PlusCircleFilled,
  ProfileFilled,
  SettingFilled,
} from "@ant-design/icons";
import { Step } from "intro.js-react";

export const FORM_ITEM_TYPES = {
  TEXT: "text",
  INPUT_NUMBER: "input-number",
  PASSWORD: "password",
  TEXTAREA: "textarea",
  SELECT: "select",
};

export const HEADER_CANDIDATE_ITEMS = [
  {
    key: "/skill-test",
    label: "Home",
  },
  {
    key: "/candidate-info",
    label: "Profile",
  },
];

// Translation
const APP_PAGE_NAME_ROUTES = {
  ACCOUNT: "/accounts",
  APPLY_PROCESS: "/apply-process",
  CANDIDATE: "/candidates",
  CANDIDATE_INFO: "/candidate-info",
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
  SETTING_PAGE: "/settings",
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

export const APP_ROLES = {
  CANDIDATE: {
    label: "Candidate",
    entry: APP_PAGE_NAME_ROUTES.SKILL_TEST,
    value: 0,
  },
  EMPLOYEE: {
    label: "Employee",
    entry: APP_PAGE_NAME_ROUTES.HOME,
    value: 1,
  },
  DIVISION_MANAGER: {
    label: "Division Manager",
    entry: APP_PAGE_NAME_ROUTES.HOME,
    value: 2,
  },
  ADMIN: {
    label: "Admin",
    entry: APP_PAGE_NAME_ROUTES.DASHBOARD,
    value: 3,
  },
  SUPER_ADMIN: {
    label: "Super Admin",
    entry: APP_PAGE_NAME_ROUTES.DASHBOARD,
    value: 4,
  },
};

const {
  EMPLOYEE: { value: roleEmployee },
  DIVISION_MANAGER: { value: roleDivisionManager },
  ADMIN: { value: roleAdmin },
  SUPER_ADMIN: { value: roleSuperAdmin },
} = APP_ROLES;

export const SIDER_ITEMS = [
  {
    key: APP_PAGE_NAME_ROUTES.DASHBOARD,
    label: "Dashboard",
    icon: <PieChartFilled />,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    key: APP_PAGE_NAME_ROUTES.HOME,
    label: "Home",
    icon: <HomeFilled />,
    roles: [roleEmployee, roleDivisionManager, roleAdmin, roleSuperAdmin],
  },
  {
    key: APP_PAGE_NAME_ROUTES.REQUEST,
    label: "Request",
    icon: <EditFilled />,
    roles: [roleEmployee, roleDivisionManager, roleAdmin, roleSuperAdmin],
    children: [
      {
        key: APP_PAGE_NAME_ROUTES.REQUEST_CREATE,
        label: "New Request",
        icon: <PlusCircleFilled />,
      },
      {
        key: APP_PAGE_NAME_ROUTES.REQUEST_LIST,
        label: "Request List",
        icon: <ProfileFilled />,
      },
    ],
  },
  {
    key: APP_PAGE_NAME_ROUTES.TIMESHEET,
    label: "Timesheet",
    icon: <CalendarFilled />,
    roles: [roleEmployee, roleDivisionManager, roleAdmin, roleSuperAdmin],
  },
  {
    key: APP_PAGE_NAME_ROUTES.ACCOUNT,
    label: "Account",
    icon: <IdcardFilled />,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    key: APP_PAGE_NAME_ROUTES.CANDIDATE,
    label: "Candidate",
    icon: <CandidateIcon />,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    key: APP_PAGE_NAME_ROUTES.EMPLOYEE,
    label: "Employee",
    icon: <EmployeeIcon />,
    roles: [roleAdmin, roleSuperAdmin],
    children: [
      {
        key: APP_PAGE_NAME_ROUTES.EMPLOYEE_CREATE,
        label: "New Employee",
        icon: <PlusCircleFilled />,
      },
      {
        key: APP_PAGE_NAME_ROUTES.EMPLOYEE_LIST,
        label: "Employee List",
        icon: <ProfileFilled />,
      },
    ],
  },
  {
    key: APP_PAGE_NAME_ROUTES.DELIVERY,
    label: "Delivery",
    icon: <AppstoreFilled />,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    key: APP_PAGE_NAME_ROUTES.POSITION,
    label: "Position",
    icon: <PositionIcon />,
    roles: [roleAdmin, roleSuperAdmin],
  },
  {
    key: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS,
    label: "Education Program",
    icon: <BookFilled />,
    children: [
      {
        key: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS_CREATE,
        label: "New Program",
        icon: <PlusCircleFilled />,
        roles: [roleAdmin, roleSuperAdmin],
      },
      {
        key: APP_PAGE_NAME_ROUTES.EDUCATION_PROGRAMS_LIST,
        label: "Program List",
        icon: <ProfileFilled />,
        roles: [roleEmployee, roleDivisionManager, roleAdmin, roleSuperAdmin],
      },
    ],
  },
  {
    key: APP_PAGE_NAME_ROUTES.JOB,
    label: "Job",
    icon: <JobIcon />,
    roles: [roleAdmin, roleSuperAdmin],
    children: [
      {
        key: APP_PAGE_NAME_ROUTES.JOB_CREATE,
        label: "New Job",
        icon: <PlusCircleFilled />,
      },
      {
        key: APP_PAGE_NAME_ROUTES.JOB_LIST,
        label: "Job List",
        icon: <ProfileFilled />,
      },
    ],
  },
  {
    key: APP_PAGE_NAME_ROUTES.TEST_TOPIC,
    label: "Skill Test Topic",
    icon: <TopicIcon />,
    roles: [roleDivisionManager, roleAdmin, roleSuperAdmin],
  },
  {
    key: APP_PAGE_NAME_ROUTES.TEST_QUESTION,
    label: "Skill Test Question",
    icon: <EssayIcon />,
    roles: [roleDivisionManager, roleAdmin, roleSuperAdmin],
    children: [
      {
        key: APP_PAGE_NAME_ROUTES.TEST_QUESTION_CREATE,
        label: "New Question",
        icon: <PlusCircleFilled />,
      },
      {
        key: APP_PAGE_NAME_ROUTES.TEST_QUESTION_LIST,
        label: "Question List",
        icon: <ProfileFilled />,
      },
    ],
  },
  {
    key: APP_PAGE_NAME_ROUTES.TESTS,
    label: "Skill Test",
    icon: <SkillTestIcon />,
    roles: [roleDivisionManager, roleAdmin, roleSuperAdmin],
    children: [
      {
        key: APP_PAGE_NAME_ROUTES.TESTS_CREATE,
        label: "New Test",
        icon: <PlusCircleFilled />,
      },
      {
        key: APP_PAGE_NAME_ROUTES.TESTS_LIST,
        label: "Test List",
        icon: <ProfileFilled />,
      },
    ],
  },
  {
    key: APP_PAGE_NAME_ROUTES.SETTING_PAGE,
    label: "Settings",
    icon: <SettingFilled />,
    roles: [roleSuperAdmin],
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

export const BASIC_ROLES = {
  employee: {
    value: 1,
    label: "Employee",
  },
  divisionManager: {
    value: 2,
    label: "Division Manager",
  },
};

export const WORKING_STATUS = {
  official: {
    value: 1,
    label: "Official",
  },
  probationary: {
    value: 2,
    label: "Probationary",
  },
  temporaryLayoffs: {
    value: 3,
    label: "Temporary Layoffs",
  },
};

export const COMMON_TYPE_QUESTION = {
  oneChoice: {
    value: 1,
    label: "One choice",
    color: "success",
  },
  multipleChoice: {
    value: 2,
    label: "Multiple choice",
    color: "warning",
  },
  essays: {
    value: 3,
    label: "Essays",
    color: "error",
  },
};

export const QUESTION_LEVELS = {
  easy: {
    value: 1,
    label: "Easy",
    color: "success",
  },
  medium: {
    value: 2,
    label: "Medium",
    color: "warning",
  },
  hard: {
    value: 3,
    label: "Hard",
    color: "error",
  },
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
  // {
  //   title: "Start to attempt",
  //   intro:
  //     "Click this button to start the test. You can only attempt one time.",
  //   element: "#attempt-btn",
  // },
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

export const ASSESSMENT_VALUES = {
  failed: 0,
  notGood: 1,
  considering: 2,
  good: 3,
  passed: 4,
};

export const ASSESSMENT: { [key: string]: string | number }[] = [
  {
    key: 0,
    value: ASSESSMENT_VALUES.failed,
    label: "Failed",
    color: "black",
  },
  {
    key: 1,
    value: ASSESSMENT_VALUES.notGood,
    label: "Not good",
    color: "error",
  },
  {
    key: 2,
    value: ASSESSMENT_VALUES.considering,
    label: "Considering",
    color: "warning",
  },
  {
    key: 3,
    value: ASSESSMENT_VALUES.good,
    label: "Good",
    color: "#1e5ac7",
  },
  {
    key: 4,
    value: ASSESSMENT_VALUES.passed,
    label: "Passed",
    color: "success",
  },
];

export const OTHERS_CONSTANTS = {
  INVALID_DATE: "Invalid Date",
};

export const TEST_STATUS = {
  created: {
    value: 1,
    label: "Created",
  },
  attempting: {
    value: 2,
    label: "Attempting",
  },
  done: {
    value: 3,
    label: "Done",
  },
};

export const RATE_LEVELS = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];

export const CREATE_TEST_MODE = {
  manual: {
    value: 1,
    label: "Manual",
  },
  random: {
    value: 2,
    label: "Random",
  },
};

export const TIME_FILTER_TYPES = {
  allTime: {
    value: 1,
    label: "All time",
  },
  year: {
    value: 2,
    label: "Year",
  },
  quarter: {
    value: 3,
    label: "Quarter",
  },
  month: {
    value: 4,
    label: "Month",
  },
};

export const SORT_ORDER: { [key: string]: { value: number } } = {
  ascend: {
    value: 1,
  },
  descend: {
    value: 2,
  },
};

export const DEFAULT_PAGE_SIZE = 10;

export const APP_MAX_LIMIT = 999999;

export const ZERO_VALUE = 0;
