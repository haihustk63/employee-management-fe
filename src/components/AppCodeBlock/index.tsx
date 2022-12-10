import React, { FC } from "react";
import { CloseCircleFilled, RightCircleFilled } from "@ant-design/icons";
import AppTag from "../AppTag";

import { IAppCodeBlockProps } from "./interface";

const AppCodeBlock: FC<IAppCodeBlockProps> = ({
  content,
  type,
  onDelete,
  onShow,
}) => {
  return (
    <div className="app-code-block">
      <AppTag>{type}</AppTag>
      <pre>{content}</pre>
      {onDelete && <CloseCircleFilled onClick={onDelete} />}
      {onShow && <RightCircleFilled onClick={onShow} />}
    </div>
  );
};

export default AppCodeBlock;
