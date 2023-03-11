import { Typography } from "antd";
import { FC, useMemo } from "react";

import AppPrimaryCard from "@/components/AppCard/Primary";
import AppCodeBlock from "@/components/AppCodeBlock";
import {
  AppCheckboxGroup,
  AppInputTextArea,
  AppRadioGroup,
} from "@/components/AppFormField";
import { COMMON_TYPE_QUESTION } from "@/constants/common";
import { IShowQuestionProps } from "./interface";

const { multipleChoice, oneChoice } = COMMON_TYPE_QUESTION;

const { Text } = Typography;

const ShowQuestion: FC<IShowQuestionProps> = ({
  question: { questionText, options = [], questionSource = [], type },
  answer,
  disableInput,
  idx,
  handleChange,
  value,
}) => {
  const RenderOptions: any = useMemo(() => {
    switch (type) {
      case oneChoice.value:
        return AppRadioGroup;
      case multipleChoice.value:
        return AppCheckboxGroup;
      default:
        return AppInputTextArea;
    }
  }, [type]);

  return (
    <AppPrimaryCard
      className="skill-test-question-card"
      id={`skill-test-question-${idx}`}
    >
      {idx && <Text className="index">Question {idx}</Text>}
      <Text className="text">{questionText}</Text>
      {questionSource.length > 0 && (
        <div className="source">
          {questionSource.map((block: any) => (
            <AppCodeBlock
              key={block.id}
              type={block.source.type}
              content={block.source.content}
            />
          ))}
        </div>
      )}
      <div className="answers">
        {options.length > 0 ? (
          <RenderOptions
            options={options}
            value={answer || value}
            onChange={handleChange}
          />
        ) : (
          <RenderOptions
            placeholder="Enter your answer"
            disabled={disableInput}
            value={value}
            onChange={handleChange}
          />
        )}
      </div>
    </AppPrimaryCard>
  );
};

export default ShowQuestion;
