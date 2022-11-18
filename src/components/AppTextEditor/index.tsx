import { FC, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AppButton from "../AppButton";

const TextEditor: FC<{ onClickSave?: any; initialValue?: string }> = ({
  onClickSave,
  initialValue,
}) => {
  const [content, setContent] = useState(initialValue || "");

  useEffect(() => {
    if (initialValue) {
      setContent(initialValue);
    }
  }, [initialValue]);

  const handleContentChange = (newContent: any) => {
    setContent(newContent);
  };

  return (
    <div className="app-text-editor">
      <div className="editor">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleContentChange}
          placeholder="Write something"
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image", "video"],
              ["clean"],
            ],
            clipboard: {
              // toggle to add extra line breaks when pasting HTML:
              matchVisual: false,
            },
          }}
          // className="react-quill-editor"
        />
      </div>
      <AppButton
        buttonTitle="Save"
        htmlType="button"
        onClick={onClickSave(content)}
      />
    </div>
  );
};

export default TextEditor;
