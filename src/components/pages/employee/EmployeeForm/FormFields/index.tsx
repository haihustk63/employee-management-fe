import { FC, useMemo } from "react";
import { Form, useFormikContext } from "formik";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import AppDatePicker from "@/components/AppDatePicker";
import { useGetAllPositions } from "@/hooks/position";
import { dataToOptions } from "@/utils";
import { useGetAllDeliveries } from "@/hooks/delivery";
import {
  BASIC_ROLES,
  FORM_ITEM_TYPES,
  WORKING_STATUS,
} from "@/constants/common";
import { Link, useParams } from "react-router-dom";
import { useGetAccounts } from "@/hooks/account";
import AppUpload from "@/components/AppUpload";
import { useGetEmployeeById } from "@/hooks/employee";
import { Image, Space, Typography } from "antd";
import AppTooltip from "@/components/AppTooltip";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import AddIcon from "@/components/Icons/AddIcon";

const { TEXT, SELECT, INPUT_NUMBER } = FORM_ITEM_TYPES;
const { Text } = Typography;

const FormFields: FC = () => {
  const { values, handleSubmit, handleChange, setFieldValue, errors } =
    useFormikContext() as any;

  const { employeeId = "" } = useParams();
  const { data: employee } = useGetEmployeeById(employeeId);

  const { data: positions = [] } = useGetAllPositions();
  const { data: deliveries = [] } = useGetAllDeliveries();
  const { data: accounts = [] } = useGetAccounts();

  const accountOptions = useMemo(() => {
    return dataToOptions(
      accounts
        .filter(
          (acc: any) =>
            acc.employeeId === null || acc.employeeId === Number(employeeId)
        )
        .map((acc: any) => ({ value: acc.email, label: acc.email }))
    );
  }, [accounts]);

  const buttonTitle = useMemo(() => {
    if (employeeId !== "") {
      return "Update";
    } else {
      return "Create";
    }
  }, [employeeId]);

  const positionLabel = useMemo(() => {
    return (
      <Space>
        <Text className="text">Position</Text>
        <AppTooltip title="Click here to add position">
          <Link
            to={`${APP_PAGE_NAME_ROUTES.POSITION}?modal=true`}
            target="_blank"
            className="app-link"
          >
            <AddIcon />
          </Link>
        </AppTooltip>
      </Space>
    );
  }, []);

  const deliveryLabel = useMemo(() => {
    return (
      <Space>
        <Text className="text">Delivery</Text>
        <AppTooltip title="Click here to add delivery">
          <Link
            to={`${APP_PAGE_NAME_ROUTES.DELIVERY}?modal=true`}
            target="_blank"
            className="app-link"
          >
            <AddIcon />
          </Link>
        </AppTooltip>
      </Space>
    );
  }, []);

  const handleDateOfBirthChange = (newDate: any) => {
    setFieldValue("dateOfBirth", newDate);
  };

  const handleJoinDateChange = (newDate: any) => {
    setFieldValue("joinDate", newDate);
  };

  const setAvatar = (fileList: any) => {
    setFieldValue("avatar", fileList?.[0]);
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <div className="parts">
        <div className="part">
          <FormItem
            name="firstName"
            label="First Name"
            value={values.firstName}
            type={TEXT}
            onChange={handleChange}
            placeholder="Enter first name"
          />
          <FormItem
            name="middleName"
            label="Middle Name"
            value={values.middleName}
            type={TEXT}
            onChange={handleChange}
            placeholder="Enter middle name"
          />
          <FormItem
            name="lastName"
            label="Last Name"
            value={values.lastName}
            type={TEXT}
            onChange={handleChange}
            placeholder="Enter last name"
          />
          <AppDatePicker
            value={values.dateOfBirth}
            pickerLabel="Date Of Birth"
            onChange={handleDateOfBirthChange}
          />
          <FormItem
            name="email"
            label="Email"
            value={values.email}
            type={SELECT}
            options={accountOptions}
            placeholder="Choose email"
          />
          <FormItem
            name="phoneNumber"
            label="Phone Number"
            value={values.phoneNumber}
            type={TEXT}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>
        <div className="part">
          <FormItem
            name="deliveryId"
            label={deliveryLabel}
            value={values.deliveryId}
            type={SELECT}
            options={dataToOptions(deliveries)}
            placeholder="Choose delivery"
          />
          <FormItem
            name="positionId"
            label={positionLabel}
            value={values.positionId}
            type={SELECT}
            options={dataToOptions(positions)}
            placeholder="Choose position"
          />
          <AppDatePicker
            value={values.joinDate}
            pickerLabel="Join Date"
            onChange={handleJoinDateChange}
          />
          <FormItem
            name="workingStatus"
            label="Working Status"
            value={values.workingStatus}
            type={SELECT}
            options={Object.values(WORKING_STATUS)}
            placeholder="Choose workingStatus"
          />

          <FormItem
            name="role"
            label="Role"
            value={values.role}
            type={SELECT}
            options={Object.values(BASIC_ROLES)}
            placeholder="Choose role"
          />
          <FormItem
            name="paidLeaveCount"
            label="Paid Leave Count (Days)"
            value={values.paidLeaveCount}
            type={INPUT_NUMBER}
            min={0}
            max={12}
            placeholder="Enter paid leave count"
          />
        </div>
      </div>
      <AppUpload
        standard={{ name: "avatar" }}
        extra={{
          changeFile: setAvatar,
          onlyOne: true,
          cropFeature: true,
        }}
      />
      {employee?.avatar && (
        <Image
          width={200}
          height={200}
          src={employee.avatar}
          alt="Avatar"
          loading="lazy"
        />
      )}
      <AppButton buttonTitle={buttonTitle} htmlType="submit" />
    </Form>
  );
};

export default FormFields;
