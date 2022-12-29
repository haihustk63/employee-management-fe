import { Form, useFormikContext } from "formik";
import { useContext, useMemo } from "react";

import AppButton from "@/components/AppButton";
import AppCodeBlock from "@/components/AppCodeBlock";
import FormItem from "@/components/FormItem";
import { COMMON_TYPE_QUESTION, FORM_ITEM_TYPES } from "@/constants/common";
import { useGetConstantTestQuestionValue } from "@/hooks/constant";
import { useGetAllTestTopics } from "@/hooks/test-topic";
import { addKeyToData, dataToOptions } from "@/utils";
import { FormAddQuestionContext } from "..";
import FormAddChoices from "../FormAddChoices";
import GroupButtonChooseType from "../GroupButtonChooseType";

const { TEXTAREA, SELECT } = FORM_ITEM_TYPES;

const FormFields = () => {
  const { values, handleSubmit, handleChange, setFieldValue, resetForm } =
    useFormikContext() as any;

  const {
    questionSource = [],
    setQuestionSource,
    setCurrentLanguage,
    setCurrentSource,
  } = useContext(FormAddQuestionContext) as any;

  const [{ data: types = [] }, { data: levels = [] }] =
    useGetConstantTestQuestionValue() as any;

  const { data: testTopics = [] } = useGetAllTestTopics();

  const AddChoiceQuestionComponent = useMemo(() => {
    if (!values.type || values.type === COMMON_TYPE_QUESTION.ESSAYS) {
      return null;
    }
    return <FormAddChoices />;
  }, [values.type]);

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

    const {
      source: { type, content },
    } = codeBlock;
    if (type && content) {
      setCurrentLanguage(type);
      setCurrentSource(content);
    }
  };

  const handleClearForm = () => {
    resetForm();
    setQuestionSource([]);
  };

  const handleChangeType = (type: string) => () => {
    setFieldValue("type", type);
  };

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="topicId"
        label="Topic"
        value={values.topicId}
        type={SELECT}
        options={dataToOptions(testTopics)}
        placeholder="Select topic"
        showSearch
      />

      <FormItem
        name="level"
        label="Level"
        value={values.level}
        type={SELECT}
        options={addKeyToData(levels)}
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

      <GroupButtonChooseType handleChangeType={handleChangeType} />

      {AddChoiceQuestionComponent && AddChoiceQuestionComponent}

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
      <AppButton buttonTitle="Add" htmlType="submit" />
      <AppButton
        buttonTitle="Clear and add new"
        htmlType="button"
        onClick={handleClearForm}
      />
    </Form>
  );
};

export default FormFields;
