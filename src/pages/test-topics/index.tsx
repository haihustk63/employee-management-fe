import AddNewTopicModal from "@/components/pages/test-topic/AddNewTopic";
import TopicList from "@/components/pages/test-topic/TopicList";
import { useGetAllTestTopics } from "@/hooks/test-topic";
import useModal from "@/hooks/useModal";
import { createContext, useState } from "react";

export const TopicManagementContext = createContext({}) as any;

const TopicManagement = () => {
  const { data = [], isFetching, isLoading } = useGetAllTestTopics();
  const { showModal, handleToggleModal: onToggleModal } = useModal();
  const [topicUpdateId, setTopicUpdateId] = useState<string | number>();

  const handleSetTopicUpdateId = (topicId: string | number) => {
    setTopicUpdateId(topicId);
  };

  const handleToggleModal = () => {
    if (showModal) {
      setTopicUpdateId(undefined);
    }
    onToggleModal();
  };

  return (
    <TopicManagementContext.Provider
      value={{
        data,
        showModal,
        topicUpdateId,
        handleToggleModal,
        handleSetTopicUpdateId,
      }}
    >
      <div className="Topic-management">
        <AddNewTopicModal />
        <TopicList />
      </div>
    </TopicManagementContext.Provider>
  );
};

export default TopicManagement;
