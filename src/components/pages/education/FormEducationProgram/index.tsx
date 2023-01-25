import AppForm from "@/components/AppForm";
import { createEducationProgramSchema } from "@/schemas";
import { Dayjs } from "dayjs";
import { FC } from "react";
import FormFields from "./FormField";

import { dayjs } from "@/dayjs-config";
import { useParams } from "react-router-dom";

export interface IAddNewEducationProgram {
  title: string;
  content: string;
  time?: Dayjs;
  duration: number;
  tutorId?: number | string;
  materials?: any[];
  deleteMaterialList: string[];
}

const initialValues: IAddNewEducationProgram = {
  title: "",
  content: "",
  duration: 0,
  time: dayjs(Date.now()),
  tutorId: undefined,
  materials: [],
  deleteMaterialList: [],
};

const FormEducationProgram: FC<{ onSubmit: any }> = ({ onSubmit }) => {
  const { programId } = useParams();

  return (
    <div className="form-education">
      <AppForm<IAddNewEducationProgram>
        initialValues={initialValues}
        handleSubmitForm={onSubmit}
        validationSchema={createEducationProgramSchema}
        title={programId ? "Update program" : "Add new program"}
      >
        <FormFields />
      </AppForm>
    </div>
  );
};

export default FormEducationProgram;
