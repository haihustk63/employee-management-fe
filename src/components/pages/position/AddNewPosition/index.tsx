import AppForm from "@/components/AppForm";
import AppModal from "@/components/AppModal";
import {
  useCreatePosition, useUpdatePosition
} from "@/hooks/position";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { PositionManagementContext } from "@/pages/position";
import { FC, useContext, useEffect, useMemo, useRef } from "react";
import FormFields from "./FormFields";
import { IAddNewPositionProps } from "./interface";

const initialValues: IAddNewPositionProps = {
  name: "",
  description: "",
};

const AddNewPositionModal: FC = () => {
  const { showModal, handleToggleModal, positionUpdateId, data } = useContext(
    PositionManagementContext
  ) as any;

  const { mutate: onCreatePosition, isError, isSuccess } = useCreatePosition();
  const {
    mutate: onUpdatePosition,
    isError: updateErorr,
    isSuccess: updateSuccess,
  } = useUpdatePosition(positionUpdateId);

  const formRef = useRef(null) as any;

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: "Position was successfully created",
  });

  useTriggerNoti({
    isError: updateErorr,
    isSuccess: updateSuccess,
    messageSuccess: "Position was successfully updated",
  });

  useEffect(() => {
    if (positionUpdateId !== undefined) {
      const position: any = data?.find(
        (position: any) => position.id === positionUpdateId
      );
      if (position) {
        formRef.current?.setFieldValue("name", position.name);
        formRef.current?.setFieldValue("description", position.description);
      }
    } else {
      formRef.current?.resetForm();
    }
  }, [positionUpdateId, data]);

  const appFormTitle = useMemo(() => {
    if (positionUpdateId !== undefined) {
      return "Update Position";
    } else {
      return "Create Position";
    }
  }, [positionUpdateId]);

  const handleSubmitForm = (values: any) => {
    if (positionUpdateId) {
      onUpdatePosition(values);
    } else {
      onCreatePosition(values);
    }
  };

  return (
    <AppModal open={showModal} onCancel={handleToggleModal}>
      <div className="add-new-delivery">
        <AppForm<IAddNewPositionProps>
          title={appFormTitle}
          initialValues={initialValues}
          handleSubmitForm={handleSubmitForm}
          innerRef={formRef}
        >
          <FormFields />
        </AppForm>
      </div>
    </AppModal>
  );
};

export default AddNewPositionModal;
