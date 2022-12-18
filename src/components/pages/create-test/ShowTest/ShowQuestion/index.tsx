import { FC, useMemo } from "react";
import { Typography } from "antd";

import AppPrimaryCard from "@/components/AppCard/Primary";
import { IShowQuestionProps } from "./interface";
import {
  AppCheckboxGroup,
  AppInputTextArea,
  AppRadioGroup,
} from "@/components/AppFormField";
import AppCodeBlock from "@/components/AppCodeBlock";

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
      case "ONE_CHOICE":
        return AppRadioGroup;
      case "MULTIPLE_CHOICE":
        return AppCheckboxGroup;
      default:
        return AppInputTextArea;
    }
  }, [type]);

  return (
    <div className="show-question">
      <AppPrimaryCard>
        <Text>{idx + ". " + questionText}</Text>
        {questionSource.length > 0 &&
          questionSource.map((block: any) => (
            <AppCodeBlock
              key={block.id}
              type={block.source.type}
              content={block.source.content}
            />
          ))}
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
      </AppPrimaryCard>
    </div>
  );
};

export default ShowQuestion;
