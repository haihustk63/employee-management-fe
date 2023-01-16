import { FC, useEffect, useState } from "react";
import CodeEditor from "@monaco-editor/react";
import { Select } from "antd";
import AppButton from "../AppButton";
import { IAppCodeEditorProps } from "./interface";

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
      <Select
        options={languages}
        placeholder="Select language"
        onChange={handleChange}
        value={currentLanguage}
      />
      <CodeEditor
        language={currentLanguage}
        value={value}
        onChange={handleSourceChange}
        height={500}
      />
      <AppButton buttonTitle="Submit" onClick={handleAddCodeBlock} />
      <AppButton buttonTitle="Clear" onClick={handleClear} />
    </div>
  );
};

export default AppCodeEditor;
