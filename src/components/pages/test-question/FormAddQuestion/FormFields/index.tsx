import { Form, useFormikContext } from "formik";
import { useContext, useMemo } from "react";

import AppButton from "@/components/AppButton";
import AppCodeBlock from "@/components/AppCodeBlock";
import AppTooltip from "@/components/AppTooltip";
import FormItem from "@/components/FormItem";
import AddIcon from "@/components/Icons/AddIcon";
import {
  COMMON_TYPE_QUESTION,
  FORM_ITEM_TYPES,
  QUESTION_LEVELS,
} from "@/constants/common";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import { useGetAllTestTopics } from "@/hooks/test-topic";
import { addKeyToData, dataToOptions } from "@/utils";
import { Space, Switch, Typography } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FormAddQuestionContext } from "..";
import FormAddChoices from "../FormAddChoices";
import TypeGroup from "../TypeGroup";

const { TEXTAREA, SELECT } = FORM_ITEM_TYPES;
const { Text } = Typography;

const { essays, multipleChoice, oneChoice } = COMMON_TYPE_QUESTION;

const FormFields = () => {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const { values, handleSubmit, handleChange, setFieldValue, resetForm } =
    useFormikContext() as any;

  const {
    questionSource = [],
    setQuestionSource,
    isDisplayCodeEditor,
    handleChangeSwitch,
    setCurrentLanguage,
    setCurrentSource,
  } = useContext(FormAddQuestionContext) as any;

  const { data: testTopics = [] } = useGetAllTestTopics();

  const AddChoiceQuestionComponent = useMemo(() => {
    if (!values.type || values.type === essays.value) {
      return null;
    }
    return <FormAddChoices />;
  }, [values.type]);

  const addButtonTitle = useMemo(() => {
    if (questionId) {
      return "Update";
    } else {
      return "Add";
    }
  }, [questionId]);

  const navigateAddTopic = () => {
    navigate(`${APP_PAGE_NAME_ROUTES.TEST_TOPIC}?modal=true`);
  };

  const TopicLabel = useMemo(() => {
    return (
      <Space>
        <Text className="text">Topic</Text>
        <AppTooltip title="Click here to add topic">
          <Link
            to={`${APP_PAGE_NAME_ROUTES.TEST_TOPIC}?modal=true`}
            target="_blank"
            className="app-link"
          >
            <AddIcon />
          </Link>
        </AppTooltip>
      </Space>
    );
  }, []);

  const handleDeleteCodeBlock = (codeBlockId: string) => () => {
    if (setQuestionSource) {
      const newQuestionSource = questionSource.filter(
        (block: any) => block.id !== codeBlockId
      );
      setQuestionSource(newQuestionSource);
    }
  };

  const handleShowCodeBlock = (codeBlockId: string) => () => {
    const codeBlock = questionSource.find(
      (block: any) => block.id === codeBlockId
    );

    const newQuestionSource = questionSource.filter(
      (block: any) => block.id !== codeBlockId
    );

    if (codeBlock) {
      const {
        source: { type, content },
      } = codeBlock;
      setCurrentLanguage(type);
      setCurrentSource(content);
      handleChangeSwitch(true);
    }
    setQuestionSource(newQuestionSource);
  };

  const handleClearForm = () => {
    resetForm();
    setQuestionSource([]);
  };

  const handleChangeType = (type: string) => {
    setFieldValue("type", type);
    setFieldValue("answer", []);
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="topicId"
        label={TopicLabel}
        value={values.topicId}
        type={SELECT}
        options={dataToOptions(testTopics)}
        placeholder="Select topic"
      />

      <FormItem
        name="level"
        label="Level"
        value={values.level}
        type={SELECT}
        options={addKeyToData(Object.values(QUESTION_LEVELS))}
        placeholder="Select level"
      />

      <FormItem
        name="questionText"
        label="Question"
        value={values.questionText}
        type={TEXTAREA}
        onChange={handleChange}
        placeholder="Enter question text"
      />

      <TypeGroup handleChangeType={handleChangeType} type={values.type} />

      {AddChoiceQuestionComponent && AddChoiceQuestionComponent}

      <div className="form-item switch">
        <Text className="form-label">Add code block</Text>
        <Switch
          onChange={handleChangeSwitch}
          defaultChecked={isDisplayCodeEditor}
        />
      </div>

      {questionSource?.map(({ id, source }: any) => {
        return (
          <AppCodeBlock
            key={id}
            content={source.content}
            type={source.type}
            onDelete={handleDeleteCodeBlock(id)}
            onShow={handleShowCodeBlock(id)}
          />
        );
      })}
      <div className="buttons">
        <AppButton buttonTitle={addButtonTitle} htmlType="submit" />
        <AppButton
          buttonTitle="Clear and add new"
          htmlType="button"
          className="-danger"
          onClick={handleClearForm}
        />
      </div>
    </Form>
  );
};

export default FormFields;
