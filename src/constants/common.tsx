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
export const SIDER_ITEMS = [
  {
    key: "/dashboard",
    label: "Dashboard",
    icon: <StarFilled />,
  },
  {
    key: "/",
    label: "Home",
    icon: <StarFilled />,
  },
  {
    key: "/requests",
    label: "Request",
    icon: <StarFilled />,
    children: [
      {
        key: "/requests/add",
        label: "Add Request",
        icon: <StarFilled />,
      },
      {
        key: "/requests/list",
        label: "Requests List",
        icon: <StarFilled />,
      },
    ],
  },
  {
    key: "/education-programs",
    label: "Education",
    icon: <StarFilled />,
  },
  {
    key: "/property",
    label: "Property",
    icon: <StarFilled />,
  },
  {
    key: "/candidate",
    label: "Candidate",
    icon: <StarFilled />,
    children: [
      {
        key: "/candidate/accounts",
        label: "Account Management",
        icon: <StarFilled />,
      },
      {
        key: "/candidate/profiles",
        label: "Profile Management",
        icon: <StarFilled />,
      },
    ],
  },
  {
    key: "/employees",
    label: "Employee",
    icon: <StarFilled />,
  },
  {
    key: "/deliveries",
    label: "Delivery",
    icon: <StarFilled />,
  },
  {
    key: "/recruiment-news",
    label: "Recruiment News",
    icon: <StarFilled />,
  },
];
