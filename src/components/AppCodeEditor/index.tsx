import CodeEditor from "@monaco-editor/react";
import { Alert, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import AppButton from "../AppButton";
import { AppSelect } from "../AppFormField";
import { IAppCodeEditorProps } from "./interface";

const { Text } = Typography;

const languages = {
  javascript: {
    label: "Javascript",
    value: "javascript",
  },
  html: {
    label: "HTML",
    value: "html",
  },
  css: {
    label: "CSS",
    value: "css",
  },
  typescript: {
    label: "Typescript",
    value: "typescript",
  },
  sql: {
    label: "SQL",
    value: "sql",
  },
  php: {
    label: "PHP",
    value: "php",
  },
  python: {
    label: "Python",
    value: "python",
  },
};

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
        <Text className="form-label">Choose languages</Text>
        <AppSelect
          options={Object.values(languages)}
          placeholder="Select language"
          onChange={handleChange}
          value={currentLanguage}
        />
        {currentLanguage === languages.html.value && (
          <Alert
            description={
              <Text>
                Please do not use script tag! If needed, please use it on
                question text box on the left-hand side!
              </Text>
            }
            type="warning"
          />
        )}
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
