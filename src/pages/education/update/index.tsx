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
    isLoading
  } = useUpdateEducationProgram(programId);

  useTriggerNoti({
    isSuccess,
    isError,
    messageSuccess: "A program was updated",
  });

  const handleSubmit = (values: any) => {
    const { materials = [], ...rest } = values;

    const formData = new FormData();
    materials.map((item: any) => {
      formData.append("materials[]", item);
    });
    formData.append("data", JSON.stringify(rest));

    onUpdate({
      data: formData,
      config: {
        headers: { "Content-Type": "multipart/form-data" },
      },
    });
  };

  return <FormEducationProgram onSubmit={handleSubmit} loading={isLoading} />;
};

export default UpdateNewEducationProgram;
