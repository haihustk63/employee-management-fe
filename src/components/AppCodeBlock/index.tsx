import { purityContent } from "@/utils";
import { CloseCircleFilled, RightCircleFilled } from "@ant-design/icons";
import { FC } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import AppTooltip from "../AppTooltip";
import { IAppCodeBlockProps } from "./interface";

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
      <div className="actions">
        {onDelete && (
          <AppTooltip title="Delete this code block">
            <>
              <CloseCircleFilled className="icon" onClick={onDelete} />
            </>
          </AppTooltip>
        )}
        {onShow && (
          <AppTooltip title="Show on editor">
            <>
              <RightCircleFilled className="icon" onClick={onShow} />
            </>
          </AppTooltip>
        )}
      </div>
    </div>
  );
};

export default AppCodeBlock;
