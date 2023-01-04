import FormEducationProgram from "@/components/pages/education/FormEducationProgram";
import { useUpdateEducationProgram } from "@/hooks/education";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { useParams } from "react-router-dom";

const UpdateNewEducationProgram = () => {
  const { programId = "" } = useParams();
  const {
    mutate: onUpdate,
    isSuccess,
    isError,
  } = useUpdateEducationProgram(programId);

  useTriggerNoti({
    isSuccess,
    isError,
    messageSuccess: "A program was updated",
  });

  const handleSubmit = (values: any) => {
    onUpdate(values);
  };

  return (
    <div>
      <h1>Update Education Program</h1>
      <FormEducationProgram onSubmit={handleSubmit} />
    </div>
  );
};

export default UpdateNewEducationProgram;
