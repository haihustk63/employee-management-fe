import FormLeave from "@/components/pages/request/FormLeave";
import { addCommonRequestSchema } from "@/schemas";
import { createContext, useState } from "react";

export const CreateRequestContext = createContext({});

const CreateRequest = () => {
  const [schemaValidation, setSchemaValidation] = useState(
    addCommonRequestSchema
  );

  return (
    <CreateRequestContext.Provider
      value={{ schemaValidation, setSchemaValidation }}
    >
      <div className="request-page">
        <FormLeave />
      </div>
    </CreateRequestContext.Provider>
  );
};

export default CreateRequest;
