import AppButton from "@/components/AppButton";
import { AppSelect } from "@/components/AppFormField";
import { APP_ROLES } from "@/constants/common";
import {
  useCreateNotificationTopic,
  useGetNotificationConfig,
  useGetNotificationTopics,
  useUpdateNotificationTopic,
} from "@/hooks/setting";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { dataToOptions } from "@/utils";
import { Typography } from "antd";
import { useCallback, useState } from "react";
const { Text } = Typography;

const SettingPage = () => {
  const { data: availableTopics = [] } = useGetNotificationConfig() as any;
  const { data: runningTopics = [] } = useGetNotificationTopics() as any;
  const {
    mutate: onUpdateTopic,
    isError: errorUpdate,
    isSuccess: successUpdate,
  } = useUpdateNotificationTopic();

  const {
    mutate: onCreateTopic,
    isError: errorCreate,
    isSuccess: successCreate,
  } = useCreateNotificationTopic();

  useTriggerNoti({
    isError: errorCreate,
    isSuccess: successCreate,
    messageSuccess: "Notification topic is added",
  });

  useTriggerNoti({
    isError: errorUpdate,
    isSuccess: successUpdate,
    messageSuccess: "Notification topic is updated",
  });

  const [notificationConfig, setNotificationConfig] = useState<
    {
      topicKey: string;
      role: number[];
    }[]
  >([]);

  const getButtonModifyTitle = useCallback(
    (topic: any) => {
      return runningTopics.find((t: any) => t.topicKey === topic.topicKey)
        ? "Update"
        : "Add";
    },
    [runningTopics]
  );

  const getDefaultAppConfig = useCallback(
    (topic: any) => {
      return runningTopics.find((t: any) => t.topicKey === topic.topicKey)
        ?.role;
    },
    [runningTopics]
  );

  const handleChangeSelect = (topic: any) => (value: number[]) => {
    const currentTopicIndex = notificationConfig.findIndex(
      (config) => config.topicKey === topic.topicKey
    );
    if (value.length) {
      setNotificationConfig((prev) => [
        ...prev.slice(0, currentTopicIndex),
        { topicKey: topic.topicKey, role: value },
        ...prev.slice(currentTopicIndex + 1, notificationConfig.length),
      ]);
    } else {
      setNotificationConfig((prev) => [
        ...prev.slice(0, currentTopicIndex),
        ...prev.slice(currentTopicIndex + 1, notificationConfig.length),
      ]);
    }
  };

  const updateTopic = (topic: any) => () => {
    const topicRoleConfig = notificationConfig.find(
      (t) => t.topicKey === topic.topicKey
    )?.role;
    const isTopicExisted = runningTopics.find(
      (t: any) => t.topicKey === topic.topicKey
    );
    if (isTopicExisted)
      onUpdateTopic({
        topicKey: topic.topicKey,
        role: topicRoleConfig,
      });
    else
      onCreateTopic({
        topicKey: topic.topicKey,
        role: topicRoleConfig,
      });
  };

  return (
    <div className="setting-page">
      <div className="notification">
        <Text className="title">Notification Setting</Text>
        <div className="topics">
          {availableTopics.map((topic: any) => (
            <div className="topic" key={topic.key}>
              <Text className="text">{topic.label}</Text>
              <div className="actions">
                <AppSelect
                  options={dataToOptions(Object.values(APP_ROLES))}
                  placeholder="Select roles"
                  mode="multiple"
                  onChange={handleChangeSelect(topic)}
                  defaultValue={getDefaultAppConfig(topic)}
                />
                <AppButton
                  buttonTitle={getButtonModifyTitle(topic)}
                  onClick={updateTopic(topic)}
                />
                {/* <AppButton
                  buttonTitle="Delete"
                  className="-danger"
                  onClick={null}
                /> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
