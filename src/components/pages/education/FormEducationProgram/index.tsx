import AppForm from "@/components/AppForm";
import { createEducationProgramSchema } from "@/schemas";
import { Dayjs } from "dayjs";
import { FC } from "react";
import FormFields from "./FormField";

import { dayjs } from "@/dayjs-config";

export interface IAddNewEducationProgram {
  title: string;
  content: string;
  time?: Dayjs;
  duration: number;
  tutorId?: number | string;
}

const initialValues: IAddNewEducationProgram = {
  title: "",
  content: "",
  duration: 0,
  time: dayjs(Date.now()),
  tutorId: undefined,
};

const FormEducationProgram: FC<{ onSubmit: any }> = ({ onSubmit }) => {
  return (
    <div>
      <AppForm<IAddNewEducationProgram>
        initialValues={initialValues}
        handleSubmitForm={onSubmit}
        validationSchema={createEducationProgramSchema}
      >
        <FormFields />
      </AppForm>
    </div>
  );
};

export default FormEducationProgram;
