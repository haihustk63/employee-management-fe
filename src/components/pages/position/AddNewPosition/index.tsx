
import AppForm from "@/components/AppForm";
import FormFields from "./FormFields";
import { IAddNewPositionProps } from "./interface";

const initialValues: IAddNewPositionProps = {
  name: "",
  description: "",
};

const AddNewPosition = () => {
  const handleSubmitForm = () => {};
  return (
    <div className="add-new-delivery">
      <AppForm<IAddNewPositionProps>
        title="Add New Delivery"
        initialValues={initialValues}
        handleSubmitForm={handleSubmitForm}
      >
        <FormFields />
      </AppForm>
    </div>
  );
};

export default AddNewPosition;
