import AppButton from "@/components/AppButton";
import { useDeleteAccount } from "@/hooks/account";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { FC } from "react";

const GroupButtonAccount: FC<{ email: string }> = ({ email }) => {
  const { mutate, isError, isSuccess } = useDeleteAccount();
  // const { handleSetEmail, handleToggleModal } = useContext(
  //   AccountManagementContext
  // ) as any;

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: "Delete account successfully",
  });

  // const handleClickAssign = () => {
  //   handleSetEmail(email);
  //   handleToggleModal();
  // };

  const handleClickDelete = () => {
    mutate({ email });
  };

  return (
    <div>
      {/* <AppButton buttonTitle="Assign" onClick={handleClickAssign} /> */}
      <AppButton buttonTitle="Delete" onClick={handleClickDelete} />
    </div>
  );
};

export default GroupButtonAccount;
