import { Typography } from "antd";
import { FC, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IAppTextEditor } from "./interface";

const { Text } = Typography;

const AppTextEditor: FC<IAppTextEditor> = ({
  title,
  initialValue,
  onChange,
}) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (initialValue) {
      setContent(initialValue);
    }
  }, [initialValue]);

  const handleContentChange = (newContent: any) => {
    if (content === "<p></br></p>") {
      setContent("");
    } else {
      setContent(newContent);
    }
    onChange(newContent);
  };

  return (
    <div className="app-text-editor">
      {!!title && <Text className="form-label">{title}</Text>}
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
      {/* <AppButton
        buttonTitle="Save"
        htmlType="button"
        onClick={onClickSave(content)}
      /> */}
    </div>
  );
};

export default AppTextEditor;
