import AppModal from "@/components/AppModal";
import AppUpload from "@/components/AppUpload";
import { useUpdateEmployeeProfile } from "@/hooks/employee";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { FC } from "react";

const UploadAvatarModal: FC<{
  employee: any;
  showModal: boolean;
  toggleModal: any;
  callbackUploadSuccess?: any;
}> = ({ employee, showModal, toggleModal, callbackUploadSuccess }) => {
  const {
    mutate: updateEmployee,
    isError,
    isSuccess,
    data,
  } = useUpdateEmployeeProfile(employee?.id) as any;

  useTriggerNoti({
    isSuccess,
    isError,
    messageSuccess: "Upload avatar successfully",
    callbackSuccess: callbackUploadSuccess?.(data),
  });

  const changeFile = (fileList: any) => {
    const newAvatar = fileList?.[0];
    if (!newAvatar) return;
    const formData = new FormData();
    formData.append("avatar", newAvatar);
    updateEmployee({
      data: formData,
      config: {
        headers: { "Content-Type": "multipart/form-data" },
      },
    });
    toggleModal();
  };

  return (
    <AppModal open={showModal} onCancel={toggleModal}>
      <AppUpload
        standard={{ name: "avatar" }}
        extra={{
          changeFile,
          onlyOne: true,
          cropFeature: true,
          description:
            "You can click here to upload avatar or dragging avatar here",
        }}
      />
    </AppModal>
  );
};

export default UploadAvatarModal;
