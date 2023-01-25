import FormEducationProgram from "@/components/pages/education/FormEducationProgram";
import { useCreateEducationProgram } from "@/hooks/education";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";

const CreateNewEducationProgram = () => {
  const { mutate: onCreate, isSuccess, isError } = useCreateEducationProgram();

  useTriggerNoti({
    isSuccess,
    isError,
    messageSuccess: "New program was added",
  });

  const handleSubmit = (values: any) => {
    const { materials = [], _deleteMaterialList, ...rest } = values;

    const formData = new FormData();
    materials.map((item: any) => {
      formData.append("materials[]", item);
    });
    formData.append("data", JSON.stringify(rest));

    onCreate({
      data: formData,
      config: {
        headers: { "Content-Type": "multipart/form-data" },
      },
    });
  };

  return <FormEducationProgram onSubmit={handleSubmit} />;
};

export default CreateNewEducationProgram;
