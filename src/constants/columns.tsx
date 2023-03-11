import { Space, Typography } from "antd";
import { ColumnsType } from "antd/es/table";

import AppButton from "@/components/AppButton";
import AppTag from "@/components/AppTag";
import GroupButtonAccount from "@/components/pages/account/GroupButtonAccount";
import GroupButton from "@/components/pages/candidate/ProfileTable/GroupButton";
import RenderAction from "@/components/pages/create-test/InputQuestionInfo/Action";
import EmployeeGroupButton from "@/components/pages/employee/EmployeeList/GroupButton";
import JobListAction from "@/components/pages/job/JobListAction";
import ListRequestActions from "@/components/pages/request/List/GroupActions";
import QuestionActionGroup from "@/components/pages/test-question/QuestionActionGroup";
import { dayjs } from "@/dayjs-config";
import { ICandidateProfile } from "@/hooks/candidate/interface";
import {
  getDateFormat,
  getQuestionLevel,
  getQuestionType,
  getRequestStatus,
  getRequestTypeLabel,
  getRequestTypeValues,
  getRoleLabel,
  getTime,
  getWorkingStatusLabel,
  mergeName,
} from "@/utils";
import {
  APP_ROLES,
  ASSESSMENT,
  JOB_LEVELS,
  JOB_TYPES,
  OTHERS_CONSTANTS,
  QUESTION_LEVELS,
} from "./common";
import { REQUEST_TYPES } from "./request";

const { Text } = Typography;

const { easy, hard, medium } = QUESTION_LEVELS;

const {
  ANNUAL_LEAVE,
  UNPAID_LEAVE,
  ANNUAL_MORNING_LEAVE,
  UNPAID_MORNING_LEAVE,
  ANNUAL_AFTERNOON_LEAVE,
  UNPAID_AFTERNOON_LEAVE,
} = REQUEST_TYPES;

const leavingMorning = getRequestTypeValues([
  ANNUAL_LEAVE,
  ANNUAL_MORNING_LEAVE,
  UNPAID_MORNING_LEAVE,
  UNPAID_LEAVE,
]);

const leavingAfternoon = getRequestTypeValues([
  ANNUAL_LEAVE,
  ANNUAL_AFTERNOON_LEAVE,
  UNPAID_AFTERNOON_LEAVE,
  UNPAID_LEAVE,
]);

const WIP = "WIP";

const indexColumn = (currentPage: number, fixed: boolean = true) => ({
  key: "#",
  title: "#",
  fixed,
  render: (_value: any, _record: any, index: any) => {
    return (currentPage - 1) * 10 + index + 1;
  },
  width: 60,
});

//candidate
export const candidateProfileTableColumns = (
  currentPage: number,
  t?: any
): ColumnsType<ICandidateProfile> => {
  return [
    indexColumn(currentPage),
    {
      key: "name",
      title: "Name",
      fixed: true,
      dataIndex: ["name"],
      width: 150,
    },
    {
      key: "email",
      title: "Email",
      dataIndex: ["email"],
      width: 300,
    },
    {
      key: "account",
      title: "Account",
      dataIndex: ["employeeAccount", "email"],
      render: (value: any) => {
        if (!value) return <AppTag color="error">Not assigned yet</AppTag>;
        return value;
      },
      width: 300,
    },
    {
      key: "status",
      title: "Status",
      dataIndex: ["employeeAccount", "employeeId"],
      render: (value: any, record: any) => {
        if (!value) return <AppTag color="error">Candidate</AppTag>;
        return <AppTag color="success">Official Employee</AppTag>;
      },
      width: 200,
    },
    {
      key: "job",
      title: "Job",
      dataIndex: ["job", "title"],
      width: 200,
    },
    {
      key: "cvLink",
      title: "CV Link",
      dataIndex: ["cvLink"],
      render: (value) => {
        return (
          <a href={value} target="_blank">
            View CV
          </a>
        );
      },
      width: 200,
    },
    {
      key: "interviewer",
      title: "Interviewer",
      dataIndex: ["interviewer"],
      render: (value) => {
        if (!value) {
          return WIP;
        }
        return mergeName(value);
      },
      width: 200,
    },
    {
      key: "appointmentTime",
      title: "Appointment Time",
      dataIndex: ["appointmentTime"],
      render: (value) => {
        if (!value) {
          return WIP;
        }
        return dayjs(value).format("DD/MM/YYYY");
      },
      width: 200,
    },
    {
      key: "assessment",
      title: "Assessment",
      dataIndex: ["assessment"],
      render: (value) => {
        if (value === undefined) {
          return WIP;
        }
        return (
          <AppTag color={ASSESSMENT[value].color as string}>
            {ASSESSMENT[value].label}
          </AppTag>
        );
      },
      width: 200,
    },
    {
      key: "action",
      title: "Action",
      render: (_value: any, record: any) => {
        return <GroupButton record={record} />;
      },
      width: 200,
    },
  ];
};

//delivery
export const deliveryListColumns = (
  onClickButtonViewEmployees: (deliveryId: any) => void,
  currentPage: number,
  t?: any
) => {
  return [
    indexColumn(currentPage),
    {
      key: "name",
      dataIndex: ["name"],
      title: "Name",
    },
    {
      key: "description",
      dataIndex: ["description"],
      title: "Description",
    },
    {
      key: "manager",
      dataIndex: ["deliveryEmployee", 0, "employee"],
      title: "Manager",
      render: (value: any) => {
        if (value) {
          const { firstName, middleName, lastName } = value;
          return lastName + " " + middleName + " " + firstName;
        }
        return null;
      },
    },
    {
      key: "action",
      title: "Action",
      width: "20%",
      render: (_: any, record: any) => {
        return (
          <AppButton
            buttonTitle="View Employees"
            htmlType="button"
            onClick={onClickButtonViewEmployees(record?.id)}
          />
        );
      },
    },
  ];
};

// employee profile
export const employeeListColumns = ({ currentPage }: any) => {
  return [
    indexColumn(currentPage),
    {
      key: "name",
      title: "Name",
      dataIndex: ["lastName"],
      sorter: true,
      fixed: true,
      render: (_: any, record: any) => {
        return mergeName(record);
      },
      width: 200,
    },
    {
      key: "email",
      dataIndex: ["email"],
      title: "Email",
      width: 300,
    },
    {
      key: "phoneNumber",
      dataIndex: ["phoneNumber"],
      title: "Phone Number",
      width: 150,
    },
    {
      key: "dateOfBirth",
      dataIndex: ["dateOfBirth"],
      title: "Date Of Birth",
      render: (value: any) => {
        if (value) {
          return dayjs(value).format("DD/MM/YYYY");
        }
        return null;
      },
      width: 150,
    },
    {
      key: "position",
      dataIndex: ["positionName"],
      title: "Position",
      width: 150,
    },

    {
      key: "joinDate",
      dataIndex: ["joinDate"],
      title: "Join Date",
      sorter: true,
      render: (value: any) => {
        if (value) {
          return dayjs(value).format("DD/MM/YYYY");
        }
        return null;
      },
      width: 150,
    },
    {
      key: "role",
      dataIndex: ["role"],
      title: "Role",
      render: (value: number) => {
        const label = getRoleLabel(value);
        return <AppTag color="blue">{label}</AppTag>;
      },
      width: 150,
    },
    {
      key: "workingStatus",
      dataIndex: ["workingStatus"],
      title: "Working Status",
      render: (value: number) => {
        const label = getWorkingStatusLabel(value);
        return <AppTag color="blue">{label}</AppTag>;
      },
      width: 200,
    },
    {
      key: "delivery",
      dataIndex: ["deliveryName"],
      title: "Delivery",
      width: 120,
    },
    {
      key: "action",
      dataIndex: "action",
      title: "Action",
      render: (_: any, record: any) => {
        return <EmployeeGroupButton record={record} />;
      },
      width: 300,
    },
  ];
};

export const accountTableColumns = (currentPage: number, t?: any) => {
  return [
    indexColumn(currentPage),
    {
      key: "email",
      title: "Email",
      fixed: true,
      dataIndex: ["email"],
    },
    {
      key: "employee",
      title: "Employee",
      dataIndex: ["employee"],
      render: (value: any) => {
        if (!value) {
          return <AppTag color="error">Not assigned yet</AppTag>;
        }
        return mergeName(value);
      },
    },
    {
      key: "candidate",
      title: "Candidate",
      dataIndex: ["candidate", "name"],
      render: (value: any) => {
        if (!value) {
          return <AppTag color="error">Not assigned yet</AppTag>;
        }
        return value;
      },
    },
    {
      key: "action",
      title: "Action",
      render: (_value: any, record: any) => {
        return <GroupButtonAccount record={record} />;
      },
    },
  ];
};

// test topics

// test questions
export const testQuestionListColumns = ({ currentPage, allowDelete }: any) => {
  return [
    indexColumn(currentPage),
    {
      key: "questionText",
      dataIndex: ["questionText"],
      title: "Question",
      sorter: true,
      width: 300,
      render: (value: string) => {
        return <Text className="app-text-ellipsis">{value}</Text>;
      },
    },
    {
      key: "type",
      dataIndex: ["type"],
      title: "Type",
      render: (value: any) => {
        const typeObj = getQuestionType(value);
        return <AppTag color={typeObj?.color}>{typeObj?.label}</AppTag>;
      },
      width: 150,
    },
    {
      key: "level",
      dataIndex: ["level"],
      title: "Level",
      render: (value: any) => {
        const levelObj = getQuestionLevel(value);
        return <AppTag color={levelObj?.color}>{levelObj?.label}</AppTag>;
      },
      width: 100,
    },
    {
      key: "topic",
      dataIndex: ["topicName"],
      title: "Topic",
      width: 200,
    },
    {
      key: "action",
      dataIndex: "action",
      title: "Action",
      render: (_: any, record: any) => {
        return (
          <QuestionActionGroup record={record} allowDelete={allowDelete} />
        );
      },
      width: 200,
    },
  ];
};

const getMaxConfig = (classifiedData: any, record: any, level: number) => {
  const topicId = record.id;
  let max = 0;

  if (classifiedData) {
    const findTopicInClassified = classifiedData.find(
      (item: any) => item.topicId === topicId && item.level === level
    );
    if (findTopicInClassified) {
      max = findTopicInClassified._count._all;
    }
  }

  return max;
};

export const createTestColumns = ({
  currentPage = 1,
  t,
  classifiedData,
}: any) => {
  return [
    indexColumn(currentPage),
    {
      key: "name",
      dataIndex: ["name"],
      title: "Name",
      fixed: true,
      width: "40%",
    },
    {
      key: "easy",
      title: "Easy",
      render: (_: any, record: any) => {
        const max = getMaxConfig(classifiedData, record, easy.value);
        return <RenderAction max={max} record={record} level={easy.value} />;
      },
      width: "20%",
    },
    {
      key: "medium",
      title: "Medium",
      render: (_: any, record: any) => {
        const max = getMaxConfig(classifiedData, record, medium.value);
        return (
          <RenderAction
            color="warning"
            max={max}
            record={record}
            level={medium.value}
          />
        );
      },
      width: "20%",
    },
    {
      key: "hard",
      title: "Hard",
      render: (_: any, record: any) => {
        const max = getMaxConfig(classifiedData, record, hard.value);
        return (
          <RenderAction
            color="error"
            max={max}
            record={record}
            level={hard.value}
          />
        );
      },
      width: "20%",
    },
  ];
};

// job

export const jobsTableColumns = (
  currentPage: number,
  t?: any
): ColumnsType<ICandidateProfile> => {
  return [
    indexColumn(currentPage),

    {
      key: "title",
      title: "Job title",
      fixed: true,
      dataIndex: ["title"],
      width: 200,
    },
    {
      key: "typeOfJob",
      title: "Job type",
      dataIndex: ["typeOfJob"],
      render: (value: any, _record: any) => {
        const type = JOB_TYPES[value];
        const label = type?.label;
        const color = type?.color as string;
        return <AppTag color={color}>{label}</AppTag>;
      },
      width: 100,
    },
    {
      key: "upTo",
      title: "Upto",
      dataIndex: ["upTo"],
      width: 100,
    },

    {
      key: "level",
      title: "Level",
      dataIndex: ["level"],
      render: (value: any) => {
        const level = JOB_LEVELS[value];
        const label = level?.label;
        const color = level?.color as string;
        return <AppTag color={color}>{label}</AppTag>;
      },
      width: 100,
    },
    {
      key: "position",
      title: "Position",
      dataIndex: ["positionName"],
      width: 150,
    },

    {
      key: "actions",
      title: "Actions",
      render: (_value: any, record: any) => {
        return <JobListAction jobId={record.id} jobTitle={record.title} />;
      },
      width: 240,
    },
  ];
};

export const requestsTableColumns = (
  currentPage: number,
  role: number = APP_ROLES.EMPLOYEE.value,
  employeeId: number
): ColumnsType<ICandidateProfile> => {
  const employeeNameColumn =
    role === APP_ROLES.EMPLOYEE.value
      ? []
      : [
          {
            key: "employeeName",
            title: "Employee Name",
            dataIndex: ["lastName"],
            sorter: true,
            fixed: true,
            width: 200,
            render: (value: any, record: any) => {
              return employeeId === record.employeeId
                ? "Me"
                : mergeName(record.employee);
            },
          },
        ];
  return [
    indexColumn(currentPage),
    ...employeeNameColumn,
    {
      key: "date",
      title: "Date",
      dataIndex: ["date"],
      sorter: true,
      render: (value: any) => {
        return getDateFormat(value);
      },
      width: 150,
    },
    {
      key: "duration",
      title: "Duration",
      dataIndex: ["duration"],
      render: (value: string) => {
        return <AppTag color="blue">{value}</AppTag>;
      },
      width: 120,
    },
    {
      key: "type",
      title: "Type",
      dataIndex: ["type"],
      render: (value: number) => {
        const typeLabel = getRequestTypeLabel(value);
        return <AppTag color="warning">{typeLabel}</AppTag>;
      },
      width: 200,
    },
    {
      key: "reason",
      title: "Reason",
      dataIndex: ["reason"],
      width: 250,
    },
    {
      key: "status",
      title: "Status",
      dataIndex: ["status"],
      render: (value: number) => {
        const status = getRequestStatus(value);
        return <AppTag color={status?.color}>{status?.label}</AppTag>;
      },
      width: 100,
    },
    {
      key: "isCancelled",
      title: "Cancel",
      dataIndex: ["isCancelled"],
      render: (value: number) => {
        const tag = value
          ? { label: "Yes", color: "green" }
          : { label: "No", color: "warning" };
        return <AppTag color={tag.color}>{tag.label}</AppTag>;
      },
      width: 100,
    },
    {
      key: "actions",
      title: "Actions",
      render: (_value: any, record: any) => {
        return <ListRequestActions record={record} />;
      },
      width: 100,
    },
  ];
};

export const checkInOutTableColumns = (
  currentPage: number = 1,
  t?: any
): ColumnsType<ICandidateProfile> => {
  return [
    indexColumn(currentPage, false),
    {
      key: "employeeName",
      title: "Employee Name",
      dataIndex: ["employee"],
      render: (value: any) => {
        return mergeName(value);
      },
      width: "40%",
    },
    {
      key: "checkIn",
      title: "Check in",
      dataIndex: ["checkin"],
      render: (value: any) => {
        if (value) {
          return getTime(value);
        }
        return value;
      },
    },
    {
      key: "checkout",
      title: "Check out",
      dataIndex: ["checkout"],
      render: (value: any) => {
        if (value) {
          return getTime(value);
        }
        return value;
      },
    },
  ];
};

export const timesheetTableColumns = (): ColumnsType<ICandidateProfile> => {
  return [
    {
      key: "date",
      title: "Date",
      dataIndex: ["date"],
      width: "15%",
      render: (value: string) => {
        const [day, dayName] = value?.split(" ");
        return (
          <Space direction="horizontal" size="small">
            <AppTag color="green">{day}</AppTag>
            <AppTag color="blue">{dayName}</AppTag>
          </Space>
        );
      },
    },
    {
      key: "checkIn",
      title: "Check in",
      dataIndex: ["checkin"],
      render: (value: string, record: any) => {
        const { requestType = "" } = record;
        if (requestType) {
          if (leavingMorning.includes(requestType)) {
            return (
              <Space>
                <AppTag color="warning">Leaving</AppTag>
                {!!value && <AppTag color="warning">{value}</AppTag>}
              </Space>
            );
          }
        }
        return value;
      },
    },
    {
      key: "checkout",
      title: "Check out",
      dataIndex: ["checkout"],
      render: (value: string, record: any) => {
        const { requestType = "" } = record;
        if (requestType) {
          if (leavingAfternoon.includes(requestType)) {
            return (
              <Space>
                <AppTag color="warning">Leaving</AppTag>
                {!!value && <AppTag color="warning">{value}</AppTag>}
              </Space>
            );
          }
        }
        return value;
      },
    },
    {
      key: "workingHour",
      title: "Working Hour",
      dataIndex: ["workingHour"],
      render: (value: string) => {
        if (value === OTHERS_CONSTANTS.INVALID_DATE) {
          return null;
        }
        return value;
      },
    },
    {
      key: "note",
      title: "Note",
      dataIndex: ["note"],
    },
  ];
};
