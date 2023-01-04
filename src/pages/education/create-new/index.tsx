import FormEducationProgram from "@/components/pages/education/FormEducationProgram";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import { useCreateEducationProgram } from "@/hooks/education";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { useNavigate } from "react-router-dom";

const CreateNewEducationProgram = () => {
  const { mutate: onCreate, isSuccess, isError } = useCreateEducationProgram();

  useTriggerNoti({
    isSuccess,
    isError,
    messageSuccess: "New program was added",
  });

  const handleSubmit = (values: any) => {
    onCreate(values);
  };

  return (
    <div>
      <h1>Create Education Program</h1>
      <FormEducationProgram onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateNewEducationProgram;
