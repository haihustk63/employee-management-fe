import { Space, Typography } from "antd";
import { ColumnsType } from "antd/es/table";

import AppButton from "@/components/AppButton";
import AppTag from "@/components/AppTag";
import GroupButtonAccount from "@/components/pages/account/GroupButtonAccount";
import GroupButton from "@/components/pages/candidate/ProfileTable/GroupButton";
import RenderAction from "@/components/pages/create-test/InputQuestionInfo/Action";
import JobListAction from "@/components/pages/job/JobListAction";
import ListRequestButtons from "@/components/pages/request/List/GroupButton";
import { ICandidateProfile } from "@/hooks/candidate/interface";
import {
  getDateFormat,
  getQuestionLevel,
  getQuestionType,
  getRequestStatus,
  getRequestTypeValues,
  getRoleLabel,
  getTime,
  getWorkingStatusLabel,
  mergeName,
} from "@/utils";
import {
  ASSESSMENT,
  JOB_LEVELS,
  JOB_TYPES,
  OTHERS_CONSTANTS,
  TEST_STATUS,
  QUESTION_LEVELS,
  APP_ROLES,
} from "./common";
import { REQUEST_TYPES, WORKING_TIME } from "./request";
import { dayjs } from "@/dayjs-config";
import EmployeeGroupButton from "@/components/pages/employee/EmployeeList/GroupButton";

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

const indexColumn = (currentPage: number) => ({
  key: "#",
  title: "#",
  fixed: true,
  render: (_value: any, _record: any, index: any) => {
    return currentPage * 10 + index + 1;
  },
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
    },
    {
      key: "email",
      title: "Email",
      dataIndex: ["email"],
    },
    {
      key: "account",
      title: "Account",
      dataIndex: ["employeeAccount", "email"],
      render: (value: any) => {
        if (!value) return <AppTag color="error">Not assigned yet</AppTag>;
        return value;
      },
    },
    {
      key: "status",
      title: "Status",
      dataIndex: ["employeeAccount", "employeeId"],
      render: (value: any, record: any) => {
        console.log(record);
        if (!value) return <AppTag color="error">Candidate</AppTag>;
        return <AppTag color="success">Official Employee</AppTag>;
      },
    },
    {
      key: "job",
      title: "Job",
      dataIndex: ["job", "title"],
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
    },
    {
      key: "interviewer",
      title: "Interviewer",
      dataIndex: ["interviewer"],
      render: (value) => {
        if (!value) {
          return "No info";
        }
        return mergeName(value);
      },
    },
    {
      key: "appointmentTime",
      title: "Appointment Time",
      dataIndex: ["appointmentTime"],
      render: (value) => {
        if (!value) {
          return "No info";
        }
        return dayjs(value).format("DD/MM/YYYY");
      },
    },
    {
      key: "assessment",
      title: "Assessment",
      dataIndex: ["assessment"],
      render: (value) => {
        if (value === undefined) {
          return "No info";
        }
        return (
          <AppTag color={ASSESSMENT[value].color as string}>
            {ASSESSMENT[value].label}
          </AppTag>
        );
      },
    },
    {
      key: "action",
      title: "Action",
      render: (_value: any, record: any) => {
        return <GroupButton record={record} />;
      },
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
export const employeeListColumns = ({ currentPage, t }: any) => {
  return [
    indexColumn(currentPage),
    {
      key: "name",
      title: "Name",
      fixed: true,
      render: (_: any, record: any) => {
        if (record) {
          const { firstName, lastName, middleName } = record;
          return lastName + " " + middleName + " " + firstName;
        }
        return null;
      },
    },
    {
      key: "email",
      dataIndex: ["employeeAccount", "email"],
      title: "Email",
    },
    {
      key: "phoneNumber",
      dataIndex: ["phoneNumber"],
      title: "Phone Number",
    },
    {
      key: "dateOfBirth",
      dataIndex: ["dateOfBirth"],
      title: "Date Of Birth",
      width: "10%",
      render: (value: any) => {
        if (value) {
          return dayjs(value).format("DD/MM/YYYY");
        }
        return null;
      },
    },
    {
      key: "position",
      dataIndex: ["position", "name"],
      title: "Position",
    },
    {
      key: "joinDate",
      dataIndex: ["joinDate"],
      title: "Join Date",
      render: (value: any) => {
        if (value) {
          return dayjs(value).format("DD/MM/YYYY");
        }
        return null;
      },
    },
    {
      key: "role",
      dataIndex: ["role"],
      title: "Role",
      render: (value: number) => {
        const label = getRoleLabel(value);
        return <AppTag color="blue">{label}</AppTag>;
      },
    },
    {
      key: "workingStatus",
      dataIndex: ["workingStatus"],
      title: "Working Status",
      render: (value: number) => {
        const label = getWorkingStatusLabel(value);
        return <AppTag color="blue">{label}</AppTag>;
      },
    },
    {
      key: "delivery",
      dataIndex: ["deliveryEmployee", "delivery", "name"],
      title: "Delivery",
    },
    {
      key: "action",
      dataIndex: "action",
      title: "Action",
      width: "20%",
      render: (_: any, record: any) => {
        return <EmployeeGroupButton record={record} />;
      },
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
        return <GroupButtonAccount email={record?.email} />;
      },
    },
  ];
};

// test topics

// test questions
export const testQuestionListColumns = ({
  onClickButtonViewDetail,
  currentPage,
  t,
}: any) => {
  return [
    indexColumn(currentPage),
    {
      key: "questionText",
      dataIndex: ["questionText"],
      title: "Question",
      fixed: true,
      width: "40%",
    },
    {
      key: "type",
      dataIndex: ["type"],
      title: "Type",
      render: (value: any) => {
        const typeObj = getQuestionType(value);
        return <AppTag color={typeObj?.color}>{typeObj?.label}</AppTag>;
      },
    },
    {
      key: "level",
      dataIndex: ["level"],
      title: "Level",
      render: (value: any) => {
        const levelObj = getQuestionLevel(value);
        return <AppTag color={levelObj?.color}>{levelObj?.label}</AppTag>;
      },
    },
    {
      key: "topic",
      dataIndex: ["topic", "name"],
      title: "Topic",
    },
    {
      key: "action",
      dataIndex: "action",
      title: "Action",
      render: (_: any, record: any) => {
        return (
          <AppButton
            buttonTitle="View Detail"
            htmlType="button"
            onClick={onClickButtonViewDetail(record.id)}
          />
        );
      },
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
  currentPage = 0,
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
    },
    {
      key: "upTo",
      title: "Upto",
      dataIndex: ["upTo"],
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
    },
    {
      key: "position",
      title: "Position",
      dataIndex: ["positionName"],
    },
    {
      key: "actions",
      title: "Actions",
      render: (_value: any, record: any) => {
        return <JobListAction jobId={record.id} jobTitle={record.title} />;
      },
    },
  ];
};

// export const testsTableColumns = (
//   currentPage: number,
//   t?: any
// ): ColumnsType<ICandidateProfile> => {
//   return [
//     indexColumn(currentPage),
//     {
//       key: "title",
//       title: "Title",
//       dataIndex: ["title"],
//       fixed: true,
//     },
//     {
//       key: "duration",
//       title: "Duration (Minutes)",
//       dataIndex: ["duration"],
//     },

//     {
//       key: "actions",
//       title: "Actions",
//       render: (_value: any, record: any) => {
//         return <TestListAction record={record} />;
//       },
//     },
//   ];
// };

const splitDuration = (duration: string) => {
  if (!duration)
    return {
      startTime: 0,
      endTime: 0,
    };
  const [startTime, endTime] = duration.split("-");
  return { startTime, endTime };
};

export const requestsTableColumns = (
  currentPage: number,
  role: number = APP_ROLES.EMPLOYEE.value,
  t?: any
): ColumnsType<ICandidateProfile> => {
  const employeeNameColumn =
    role === APP_ROLES.EMPLOYEE.value
      ? []
      : [
          {
            key: "employeeName",
            title: "Employee Name",
            dataIndex: ["employee"],
            fixed: true,
            width: "15%",
            render: (value: any) => {
              return mergeName(value);
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
      render: (value: any) => {
        return getDateFormat(value);
      },
    },
    {
      key: "duration",
      title: "Duration",
      dataIndex: ["duration"],
      render: (value: string) => {
        return <AppTag color="blue">{value}</AppTag>;
      },
    },
    {
      key: "type",
      title: "Type",
      dataIndex: ["type"],
    },
    {
      key: "reason",
      title: "Reason",
      dataIndex: ["reason"],
      width: "20%",
    },
    {
      key: "status",
      title: "Status",
      dataIndex: ["status"],
      render: (value: number) => {
        const status = getRequestStatus(value);
        return <AppTag color={status?.color}>{status?.label}</AppTag>;
      },
    },
    {
      key: "isCancelled",
      title: "Cancel",
      dataIndex: ["isCancelled"],
      render: (value: number) => {
        const tag = value
          ? { label: "Cancelled", color: "green" }
          : { label: "Not cancelled", color: "warning" };
        return <AppTag color={tag.color}>{tag.label}</AppTag>;
      },
    },
    {
      key: "actions",
      title: "Actions",
      render: (_value: any, record: any) => {
        return <ListRequestButtons record={record} />;
      },
    },
  ];
};

export const checkInOutTableColumns = (
  currentPage: number,
  t?: any
): ColumnsType<ICandidateProfile> => {
  return [
    indexColumn(currentPage),
    {
      key: "employeeName",
      title: "Employee Name",
      dataIndex: ["employee"],
      fixed: true,
      width: "15%",
      render: (value: any) => {
        return mergeName(value);
      },
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

export const timesheetTableColumns = (
  currentPage: number,
  t?: any
): ColumnsType<ICandidateProfile> => {
  return [
    {
      key: "date",
      title: "Date",
      dataIndex: ["date"],
      fixed: true,
      width: "15%",
      render: (value: string) => {
        const [day, dayName] = value.split(" ");
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
