import { Typography } from "antd";
import React, { FC, ReactNode, useMemo } from "react";

import AppPrimaryCard from "@/components/AppCard/Primary";
import { IShowQuestionProps } from "./interface";
import { AppCheckboxGroup, AppRadioGroup } from "@/components/AppFormField";
import AppCodeBlock from "@/components/AppCodeBlock";

const { Text } = Typography;

const ShowQuestion: FC<{ question: IShowQuestionProps }> = ({
  question: { questionText, options = [], questionSource = [], type },
}) => {
  const RenderOptions: any = useMemo(() => {
    switch (type) {
      case "ONE_CHOICE":
        return AppRadioGroup;
      case "MULTIPLE_CHOICE":
        return AppCheckboxGroup;
      default:
        return AppRadioGroup;
    }
  }, []);
  return (
    <div className="show-question">
      <AppPrimaryCard>
        <Text>{questionText}</Text>
        {questionSource.length > 0 &&
          questionSource.map((block: any) => (
            <AppCodeBlock
              key={block.id}
              type={block.source.type}
              content={block.source.content}
            />
          ))}
        {options.length > 0 && <RenderOptions options={options} />}
      </AppPrimaryCard>
    </div>
  );
};

export default ShowQuestion;
