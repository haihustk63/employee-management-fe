import AppForm from "@/components/AppForm";
import AppModal from "@/components/AppModal";
import {
  useCreateTopic,
  useGetAllTestTopics,
  useUpdateTopic,
} from "@/hooks/test-topic";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { TopicManagementContext } from "@/pages/test-topics";
import { FC, useContext, useEffect, useMemo, useRef } from "react";
import FormFields from "./FormFields";
import { IAddNewTopicProps } from "./interface";

const initialValues: IAddNewTopicProps = {
  name: "",
  description: "",
};

const AddNewTopicModal: FC = () => {
  const { showModal, handleToggleModal, topicUpdateId, data } = useContext(
    TopicManagementContext
  ) as any;

  const { mutate: onCreateTopic, isError, isSuccess } = useCreateTopic();
  const {
    mutate: onUpdateTopic,
    isError: updateErorr,
    isSuccess: updateSuccess,
  } = useUpdateTopic(topicUpdateId);

  const formRef = useRef(null) as any;

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: "Topic was successfully created",
  });

  useTriggerNoti({
    isError: updateErorr,
    isSuccess: updateSuccess,
    messageSuccess: "Topic was successfully updated",
  });

  useEffect(() => {
    if (topicUpdateId !== undefined) {
      const topic: any = data?.find((topic: any) => topic.id === topicUpdateId);
      if (topic) {
        formRef.current?.setFieldValue("name", topic.name);
        formRef.current?.setFieldValue("description", topic.description);
      }
    } else {
      formRef.current?.resetForm();
    }
  }, [topicUpdateId, data]);

  const appFormTitle = useMemo(() => {
    if (topicUpdateId !== undefined) {
      return "Update Topic";
    } else {
      return "Create Topic";
    }
  }, [topicUpdateId]);

  const handleSubmitForm = (values: any) => {
    if (topicUpdateId) {
      onUpdateTopic(values);
    } else {
      onCreateTopic(values);
    }
  };

  return (
    <AppModal open={showModal} onCancel={handleToggleModal}>
      <div className="add-new-topic">
        <AppForm<IAddNewTopicProps>
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

export default AddNewTopicModal;
