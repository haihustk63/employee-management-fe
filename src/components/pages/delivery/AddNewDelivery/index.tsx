import { FC } from "react";

import AppForm from "@/components/AppForm";
import AppModal from "@/components/AppModal";
import { IModalControlProps } from "@/constants/interface";
import { addDeliveryValidateSchema } from "@/schemas";
import FormFields from "./FormFields";
import { IAddNewDeliveryProps } from "./interface";
import { useCreateDelivery } from "@/hooks/delivery";

const initialValues: IAddNewDeliveryProps = {
  name: "",
  description: "",
  managerId: undefined,
};

const AddNewDeliveryModal: FC<IModalControlProps> = ({
  showModal,
  onToggleModal,
}) => {
  const { mutate } = useCreateDelivery();

  const handleSubmitForm = (values: any) => {
    mutate(values);
  };

  return (
    <AppModal
      title="Add New Delivery"
      open={showModal}
      onCancel={onToggleModal}
    >
      <div className="add-new-delivery">
        <AppForm<IAddNewDeliveryProps>
          // title="Add New Delivery"
          initialValues={initialValues}
          handleSubmitForm={handleSubmitForm}
          validationSchema={addDeliveryValidateSchema}
        >
          <FormFields />
        </AppForm>
      </div>
    </AppModal>
  );
};

export default AddNewDeliveryModal;
