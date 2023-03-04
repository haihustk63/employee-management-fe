import { Typography, Upload, UploadProps } from "antd";
import AntdImgCrop from "antd-img-crop";
import { FC, Fragment, useEffect, useMemo, useState } from "react";
import appNotification from "../AppNotification";
import UploadIcon from "../Icons/UploadIcon";

const { Text } = Typography;

const AppUpload: FC<{ standard: UploadProps; extra?: any }> = ({
  standard = {},
  extra = {},
}) => {
  const [fileList, setFileList] = useState<any[]>([]);

  const Wrapper = useMemo(() => {
    if (extra.cropFeature) {
      return AntdImgCrop;
    }
    return Fragment;
  }, [extra]);

  const props = useMemo(() => {
    if (extra.cropFeature) {
      return { rotate: true };
    }
    return {};
  }, [extra]);

  useEffect(() => {
    extra?.changeFile?.(fileList);
  }, [fileList]);

  const handleRemove = (file: any) => {
    const newFileList = fileList.filter((f: any) => f.uid !== file.uid);
    setFileList(newFileList);
  };

  const changeFileList = (newFile: any) => {
    const existedFile = fileList.find(
      (file: any) => file.name === newFile.name
    );
    if (existedFile) {
      appNotification({
        message: "Error",
        description: "This file is existed",
        type: "error",
      });
      return false;
    }
    let newFileList;
    if (extra.onlyOne) {
      newFileList = [newFile];
    } else {
      newFileList = [...fileList, newFile];
    }
    setFileList(newFileList);
    return false;
  };

  return (
    <div className="app-upload">
      <Wrapper {...props}>
        <Upload.Dragger
          {...standard}
          fileList={fileList}
          beforeUpload={changeFileList}
          onRemove={handleRemove}
        >
          <UploadIcon />
          <Text className="instruction">
            {extra?.description ??
              "You can click here to upload files or dragging files here"}
          </Text>
        </Upload.Dragger>
      </Wrapper>
    </div>
  );
};

export default AppUpload;
