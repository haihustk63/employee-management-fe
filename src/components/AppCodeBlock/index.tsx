import React, { FC } from "react";
import { CloseCircleFilled, RightCircleFilled } from "@ant-design/icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import AppTag from "../AppTag";
import { IAppCodeBlockProps } from "./interface";
import { purityContent } from "@/utils";

const AppCodeBlock: FC<IAppCodeBlockProps> = ({
  content,
  type,
  onDelete,
  onShow,
}) => {
  return (
    <div className="app-code-block">
      <div className="type">{type}</div>
      <SyntaxHighlighter
        language={type}
        style={darcula}
        showLineNumbers
        wrapLines
      >
        {purityContent(content)}
      </SyntaxHighlighter>
      {onDelete && <CloseCircleFilled onClick={onDelete} />}
      {onShow && <RightCircleFilled onClick={onShow} />}
    </div>
  );
};

export default AppCodeBlock;
