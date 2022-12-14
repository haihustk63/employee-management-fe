import { Form, useFormikContext } from "formik";
import { FC, useContext, useMemo } from "react";

import AppButton from "@/components/AppButton";
import FormItem from "@/components/FormItem";
import { FORM_ITEM_TYPES, MANAGER_EXAMPLE } from "@/constants/common";
import AppCodeBlock from "@/components/AppCodeBlock";
import { useGetConstantTestQuestionValue } from "@/hooks/constant";
import { addKeyToData, dataToOptions } from "@/utils";
import { useGetAllTestTopics } from "@/hooks/test-topic";
import FormAddChoices from "../FormAddChoices";
import { FormAddQuestionContext } from "..";

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
    if (!values.type || values.type === "ESSAYS") return null;
    return <FormAddChoices questionType={values.type} />;
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

  return (
    <Form onSubmit={handleSubmit} className="form">
      <FormItem
        name="topic"
        label="Topic"
        value={values.topic}
        type={SELECT}
        options={dataToOptions(testTopics)}
        placeholder="Select topic"
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
        name="type"
        label="Type"
        value={values.type}
        type={SELECT}
        options={addKeyToData(types)}
        placeholder="Select type"
      />

      {AddChoiceQuestionComponent && AddChoiceQuestionComponent}

      <FormItem
        name="questionText"
        label="Question"
        value={values.questionText}
        type={TEXTAREA}
        onChange={handleChange}
        placeholder="Enter question text"
      />
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
