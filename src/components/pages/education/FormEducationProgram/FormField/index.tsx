import AppButton from "@/components/AppButton";
import AppDatePicker from "@/components/AppDatePicker";
import AppFormErrorMessage from "@/components/AppFormErrorMessage";
import AppTextEditor from "@/components/AppTextEditor";
import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES } from "@/constants/common";
import { useGetEducationProgramById } from "@/hooks/education";
import { useGetEmployees } from "@/hooks/employee";
import { dataToOptions, disabledDateBeforeToday } from "@/utils";
import { Space, Typography } from "antd";
import cx from "classnames";
import { Form, useFormikContext } from "formik";
import { FC, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import AppUpload from "@/components/AppUpload";
import { dayjs } from "@/dayjs-config";

const { Text } = Typography;

const { TEXT, SELECT, INPUT_NUMBER } = FORM_ITEM_TYPES;

const FormFields: FC<{ loading?: boolean }> = ({ loading }) => {
  const { programId = "" } = useParams();
  const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
    useFormikContext() as any;
  const { data: employees = [] } = useGetEmployees();
  const { data: program = {} } = useGetEducationProgramById(programId) as any;

  useEffect(() => {
    if (Object.keys(program).length > 0) {
      const { title, content, time, tutor, duration } = program;
      setFieldValue("title", title);
      setFieldValue("content", content);
      setFieldValue("duration", duration);
      setFieldValue("time", dayjs(time ?? Date.now()));
      setFieldValue("tutorId", tutor?.id);
    }
  }, [program]);

  const currentMaterials = useMemo(() => {
    return program?.materials || [];
  }, [program]);

  const buttonTitle = useMemo(() => {
    if (programId) {
      return "Update";
    } else {
      return "Create";
    }
  }, [programId]);

  const handleChangeEditor = (value: string) => {
    setFieldValue("content", value);
  };

  const handleDatePickerChange = (newDate: any) => {
    setFieldValue("time", newDate);
  };

  const setFiles = (files: any) => {
    setFieldValue("materials", files);
  };

  const toggleDeleteMaterial = (link: string) => () => {
    let newDeleteMaterialList;

    if (values.deleteMaterialList.includes(link)) {
      newDeleteMaterialList = values.deleteMaterialList.filter(
        (deleteLink: string) => deleteLink !== link
      );
    } else {
      newDeleteMaterialList = [...values.deleteMaterialList, link];
    }

    setFieldValue("deleteMaterialList", newDeleteMaterialList);
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="title"
        label="Program title"
        value={values.title}
        type={TEXT}
        onChange={handleChange}
        placeholder="Enter program title"
      />

      <AppTextEditor
        onChange={handleChangeEditor}
        initialValue={values.content}
        title="Program Content"
      />
      {!!errors.content && !!touched.content && (
        <AppFormErrorMessage message={errors.content} />
      )}

      <div className="part">
        <AppDatePicker
          value={values.time}
          onChange={handleDatePickerChange}
          pickerLabel="Start Time"
          format="DD-MM-YYYY HH:mm"
          disabledDate={disabledDateBeforeToday}
          showTime={{ defaultValue: dayjs("00:00", "HH:mm") }}
        />

        <FormItem
          name="duration"
          label="Duration (Minutes)"
          value={values.duration}
          type={INPUT_NUMBER}
          min={0}
          placeholder="Choose duration"
        />

        <FormItem
          name="tutorId"
          label="Tutor"
          value={values.tutorId}
          type={SELECT}
          options={dataToOptions(employees?.data)}
          placeholder="Choose tutor"
        />
      </div>

      <AppUpload
        standard={{
          name: "materials",
          accept: ".doc, .docx, .xls, .xlsx, .ppt, .pptx",
        }}
        extra={{ changeFile: setFiles }}
      />
      {programId && !!currentMaterials.length && (
        <div className="materials">
          <Text>Current materials</Text>
          <div className="items">
            {currentMaterials.map((item: string) => {
              const isDeleted = values.deleteMaterialList.includes(item);
              return (
                <div key={item} className="item">
                  <a
                    href={item}
                    target="_blank"
                    className={cx({
                      delete: isDeleted,
                    })}
                  >
                    {item}
                  </a>
                  <AppButton
                    buttonTitle={isDeleted ? "Undo" : "Delete"}
                    className="-danger"
                    onClick={toggleDeleteMaterial(item)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      <AppButton
        buttonTitle={buttonTitle}
        htmlType="submit"
        loading={loading}
      />
    </Form>
  );
};

export default FormFields;
