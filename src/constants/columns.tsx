import { Link } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import moment from "moment";

import AppButton from "@/components/AppButton";
import { ICandidateProfile } from "@/hooks/candidate/interface";
import AppTag from "@/components/AppTag";

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
      key: "position",
      title: "Position",
      dataIndex: ["position", "name"],
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
          return (
            <AppButton
              buttonTitle="Assign Interviewer"
              onClick={() => console.log("here")}
            />
          );
        } else {
          <Link to="/">{value}</Link>;
        }
      },
    },
    {
      key: "appointmentTime",
      title: "Appointment Time",
      dataIndex: ["appointmentTime"],
      render: (value) => {
        if (!value) {
          return "Not assigned yet";
        } else return value;
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
            <AppTag color={testQuestionTypesContants[value].value}>
              {testQuestionTypesContants[value].text}
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
            <AppTag color={testQuestionLevelsContants[value].value}>
              {testQuestionLevelsContants[value].text}
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
