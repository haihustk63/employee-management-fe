import { FC, useContext, useEffect, useMemo, useRef } from "react";

import AppForm from "@/components/AppForm";
import AppModal from "@/components/AppModal";
import { IModalControlProps } from "@/constants/interface";
import { DeliveryManagementContext } from "@/pages/delivery";
import { addDeliveryValidateSchema } from "@/schemas";
import FormFields from "./FormFields";
import { IAddNewDeliveryProps } from "./interface";

const initialValues: IAddNewDeliveryProps = {
  name: "",
  description: "",
  managerId: undefined,
};

const AddNewDeliveryModal: FC<IModalControlProps> = ({
  showModal,
  onToggleModal,
}) => {
  const { deliveryUpdateInfo, createDelivery, updateDelivery } = useContext(
    DeliveryManagementContext
  ) as any;

  const formRef = useRef(null) as any;

  useEffect(() => {
    if (deliveryUpdateInfo) {
      formRef.current?.setFieldValue("name", deliveryUpdateInfo.name);
      formRef.current?.setFieldValue(
        "description",
        deliveryUpdateInfo.description
      );
      formRef.current?.setFieldValue(
        "managerId",
        deliveryUpdateInfo.deliveryEmployee?.[0]?.employeeId
      );
    } else {
      formRef.current?.resetForm();
    }
  });

  const appFormTitle = useMemo(() => {
    if (deliveryUpdateInfo) {
      return "Update Delivery";
    } else {
      return "New Delivery";
    }
  }, [deliveryUpdateInfo]);

  const handleSubmitForm = (values: any) => {
    if (deliveryUpdateInfo) {
      updateDelivery(values);
    } else {
      createDelivery(values);
    }
  };

  return (
    <AppModal open={showModal} onCancel={onToggleModal}>
      <div className="add-new-delivery">
        <AppForm<IAddNewDeliveryProps>
          initialValues={initialValues}
          innerRef={formRef}
          handleSubmitForm={handleSubmitForm}
          validationSchema={addDeliveryValidateSchema}
          title={appFormTitle}
        >
          <FormFields />
        </AppForm>
      </div>
    </AppModal>
  );
};

export default AddNewDeliveryModal;
