import AddNewTopicModal from "@/components/pages/test-topic/AddNewTopic";
import TopicList from "@/components/pages/test-topic/TopicList";
import { useGetAllTestTopics } from "@/hooks/test-topic";
import useModal from "@/hooks/useModal";
import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const TopicManagementContext = createContext({}) as any;

const TopicManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data = [] } = useGetAllTestTopics();
  const { showModal, handleToggleModal: onToggleModal } = useModal();
  const [topicUpdateId, setTopicUpdateId] = useState<string | number>();

  useEffect(() => {
    if (searchParams.get("modal")) {
      handleToggleModal();
      setSearchParams({});
    }
  }, [searchParams]);

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
      <div className="topic-management">
        <AddNewTopicModal />
        <TopicList />
      </div>
    </TopicManagementContext.Provider>
  );
};

export default TopicManagement;
