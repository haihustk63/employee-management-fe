
import AppForm from "@/components/AppForm";
import FormFields from "./FormFields";
import { IAddNewDeliveryProps } from "./interface";

const initialValues: IAddNewDeliveryProps = {
  name: "",
  description: "",
  managerId: undefined,
};

const AddNewDelivery = () => {
  const handleSubmitForm = () => {};
  return (
    <div className="add-new-delivery">
      <AppForm<IAddNewDeliveryProps>
        title="Add New Delivery"
        initialValues={initialValues}
        handleSubmitForm={handleSubmitForm}
      >
        <FormFields />
      </AppForm>
    </div>
  );
};

export default AddNewDelivery;
