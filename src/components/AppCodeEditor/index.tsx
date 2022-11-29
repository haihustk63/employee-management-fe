import { FC, useRef, useState } from "react";
import CodeEditor from "@monaco-editor/react";
import { Select } from "antd";
import AppButton from "../AppButton";

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

const AppCodeEditor: FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState("javascript");

  const codeEditorRef = useRef(null) as any;

  const handleChange = (value: string) => {
    setCurrentLanguage(value);
  };

  const handleCodeEditorMount = (editor: any, monaco: any) => {
    codeEditorRef.current = editor;
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
        height={500}
        onMount={handleCodeEditorMount}
      />
      <AppButton
        buttonTitle="Submit"
        onClick={() => {
          console.log(codeEditorRef.current.getValue());
        }}
      />
    </div>
  );
};

export default AppCodeEditor;
