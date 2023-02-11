import CodeEditor from "@monaco-editor/react";
import { Typography } from "antd";
import { FC, useEffect, useState } from "react";
import AppButton from "../AppButton";
import { AppSelect } from "../AppFormField";
import { IAppCodeEditorProps } from "./interface";

const { Text } = Typography;

const languages = [
  {
    label: "Javascript",
    value: "javascript",
  },
  {
    label: "HTML",
    value: "html",
  },
  {
    label: "CSS",
    value: "css",
  },
];

const AppCodeEditor: FC<IAppCodeEditorProps> = ({
  onSubmitCodeBlock,
  currentLanguage: languageProp,
  currentSource: sourceProp,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState("javascript");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (languageProp) {
      setCurrentLanguage(languageProp);
    }
  }, [languageProp]);

  useEffect(() => {
    if (sourceProp) {
      setValue(sourceProp);
    }
  }, [sourceProp]);

  const handleChange = (value: string) => {
    setCurrentLanguage(value);
  };

  const handleSourceChange = (value: any) => {
    setValue(value);
  };

  const handleAddCodeBlock = () => {
    onSubmitCodeBlock({
      type: currentLanguage,
      content: value,
    });
  };

  const handleClear = () => {
    setValue("");
  };

  return (
    <div className="app-code-editor">
      <div className="form-item">
        <Text className="form-label">Choose language</Text>
        <AppSelect
          options={languages}
          placeholder="Select language"
          onChange={handleChange}
          value={currentLanguage}
        />
      </div>
      <CodeEditor
        language={currentLanguage}
        value={value}
        onChange={handleSourceChange}
        height={500}
        loading={<div>Loading...</div>}
        className="editor"
      />
      <div className="actions">
        <AppButton buttonTitle="Submit" onClick={handleAddCodeBlock} />
        <AppButton buttonTitle="Clear" onClick={handleClear} />
      </div>
    </div>
  );
};

export default AppCodeEditor;
