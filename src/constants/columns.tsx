import { ColumnsType } from "antd/es/table";
import moment from "moment";
import { Typography } from "antd";

import AppButton from "@/components/AppButton";
import AppTag from "@/components/AppTag";
import RenderAction from "@/components/pages/create-test/InputQuestionInfo/Action";
import { ICandidateProfile } from "@/hooks/candidate/interface";
import { FC } from "react";
import { ASSESSMENT, JOB_LEVELS, JOB_TYPES, TEST_STATUS } from "./common";
import JobListAction from "@/components/pages/job/JobListAction";
import GroupButton from "@/components/pages/candidate/ProfileTable/GroupButton";
import { getDateFormat, mergeName } from "@/utils";
import TestListAction from "@/components/pages/test/TestListAction";
import ButtonDeleteAccount from "@/components/pages/account/ButtonDeleteAccount";
import {
  REQUEST_STATUS,
  REQUEST_TYPES,
  REQUEST_TYPES_OPTIONS,
  WORKING_TIME,
  LEAVING_TIME,
  REQUEST_STATUS_OPTIONS,
} from "./request";
import ListRequestButtons from "@/components/pages/request/List/GroupButton";

const { Text } = Typography;

const {
  ANNUAL_LEAVE,
  MODIFY_CHECKIN,
  MODIFY_CHECKOUT,
  OVER_TIME,
  REMOTE,
  UNPAID_LEAVE,
} = REQUEST_TYPES;

const { AFTERNOON_END, AFTERNOON_START, MORNING_END, MORNING_START } =
  WORKING_TIME;

const { AFTERNOON, ALLDAY, MORNING } = LEAVING_TIME;

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
      key: "job",
      title: "Job",
      dataIndex: ["job", "title"],
    },
    {
      key: "cvLink",
      title: "CV Link",
      dataIndex: ["cvLink"],
      render: (value) => {
        return <a href={value}>View CV</a>;
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
      // render: (value) => {
      //   if (!value) {
      //     return (
      //       <AppButton
      //         buttonTitle="Assign Interviewer"
      //         onClick={() => console.log("here")}
      //       />
      //     );
      //   } else {
      //     <Link to="/">{value}</Link>;
      //   }
      // },
    },
    {
      key: "appointmentTime",
      title: "Appointment Time",
      dataIndex: ["appointmentTime"],
      render: (value) => {
        if (!value) {
          return "No info";
        }
        return moment(value).format("DD/MM/yyyy");
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
export const employeeListColumns = (
  onClickButtonViewDetail: (id: any) => void,
  currentPage: number,
  t?: any
) => {
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
          return moment(value).format("DD/MM/YYYY");
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
          return moment(value).format("DD/MM/YYYY");
        }
        return null;
      },
    },
    {
      key: "role",
      dataIndex: ["role"],
      title: "Role",
    },
    {
      key: "workingStatus",
      dataIndex: ["workingStatus"],
      title: "Working Status",
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
        return (
          <AppButton
            buttonTitle="View Employees"
            htmlType="button"
            onClick={onClickButtonViewDetail(record.id)}
          />
        );
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
      key: "name",
      title: "Name",
      dataIndex: ["employee"],
      render: (value: any) => {
        return mergeName(value);
      },
    },
    {
      key: "action",
      title: "Action",
      render: (_value: any, record: any) => {
        return <ButtonDeleteAccount email={record?.email} />;
      },
    },
  ];
};

// test topics

// test questions
export const testQuestionListColumns = ({
  onClickButtonViewDetail,
  currentPage,
  testQuestionLevelsContants,
  testQuestionTypesContants,
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
        if (testQuestionTypesContants) {
          return (
            <AppTag color={testQuestionTypesContants[value].color}>
              {testQuestionTypesContants[value].label}
            </AppTag>
          );
        }
      },
    },
    {
      key: "level",
      dataIndex: ["level"],
      title: "Level",
      render: (value: any) => {
        if (testQuestionLevelsContants) {
          return (
            <AppTag color={testQuestionLevelsContants[value].color}>
              {testQuestionLevelsContants[value].label}
            </AppTag>
          );
        }
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
        console.log(record);
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

const getMaxConfig = (
  classifiedData: any,
  record: any,
  level: "EASY" | "MEDIUM" | "HARD"
) => {
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
  onSubmitQuestionInfo,
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
        const max = getMaxConfig(classifiedData, record, "EASY");
        return (
          <RenderAction
            max={max}
            onSubmitQuestionInfo={onSubmitQuestionInfo?.(record.id, "EASY")}
          />
        );
      },
      width: "20%",
    },
    {
      key: "medium",
      title: "Medium",
      render: (_: any, record: any) => {
        const max = getMaxConfig(classifiedData, record, "MEDIUM");
        return (
          <RenderAction
            color="warning"
            max={max}
            onSubmitQuestionInfo={onSubmitQuestionInfo?.(record.id, "MEDIUM")}
          />
        );
      },
      width: "20%",
    },
    {
      key: "hard",
      title: "Hard",
      render: (_: any, record: any) => {
        const max = getMaxConfig(classifiedData, record, "HARD");
        return (
          <RenderAction
            color="error"
            max={max}
            onSubmitQuestionInfo={onSubmitQuestionInfo?.(record.id, "HARD")}
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

export const testsTableColumns = (
  currentPage: number,
  t?: any
): ColumnsType<ICandidateProfile> => {
  return [
    indexColumn(currentPage),
    {
      key: "candidateName",
      title: "Candidate",
      dataIndex: ["candidate", "name"],
      fixed: true,
      render: (value: any) => {
        if (!value) {
          return <AppTag color="warning">Not assigned yet</AppTag>;
        }
        return value;
      },
    },
    {
      key: "score",
      title: "Score",
      dataIndex: ["score"],
      render: (value: any, record: any) => {
        if (!value) {
          return <AppTag color="warning">Wait for attemp</AppTag>;
        }
        return (
          <Text>
            {value}/{record.countQuestion}
          </Text>
        );
      },
    },
    {
      key: "isSubmitted",
      title: "Status",
      dataIndex: ["isSubmitted"],
      render: (value: any) => {
        const renderIndex = value ? 1 : 0;
        return (
          <AppTag color={TEST_STATUS[renderIndex].color}>
            {TEST_STATUS[renderIndex].label}
          </AppTag>
        );
      },
    },
    {
      key: "actions",
      title: "Actions",
      render: (_value: any, record: any) => {
        return <TestListAction record={record} />;
      },
    },
  ];
};

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
      render: (value: any, record: any) => {
        const { startTime, endTime } = splitDuration(value);
        let showContent;
        const { type } = record;
        switch (type) {
          case MODIFY_CHECKIN: {
            showContent = startTime;
            break;
          }

          case MODIFY_CHECKOUT: {
            showContent = endTime;
            break;
          }

          case OVER_TIME: {
            showContent = value;
            break;
          }

          case UNPAID_LEAVE:
          case ANNUAL_LEAVE:
          case REMOTE:
            if (startTime === MORNING_START && endTime === MORNING_END) {
              showContent = MORNING;
            } else if (
              startTime === AFTERNOON_START &&
              endTime === AFTERNOON_END
            ) {
              showContent = AFTERNOON;
            } else {
              showContent = ALLDAY;
            }
            break;
          default:
            showContent = "";
        }
        return <AppTag color="blue">{showContent}</AppTag>;
      },
    },
    {
      key: "type",
      title: "Type",
      dataIndex: ["type"],
      render: (value: number) => {
        return (
          <AppTag color="warning">
            {REQUEST_TYPES_OPTIONS[value - 1].label}
          </AppTag>
        );
      },
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
        const status = REQUEST_STATUS_OPTIONS[value];
        return <AppTag color={status.color}>{status.label}</AppTag>;
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
