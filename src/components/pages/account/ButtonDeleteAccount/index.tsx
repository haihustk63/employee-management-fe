import { FC } from "react";
import AppButton from "@/components/AppButton";
import { useDeleteAccount } from "@/hooks/account";

const ButtonDeleteAccount: FC<{ email: string }> = ({ email }) => {
  const { mutate } = useDeleteAccount(email);

  return <AppButton buttonTitle="Delete" onClick={mutate} />;
};

export default ButtonDeleteAccount;
