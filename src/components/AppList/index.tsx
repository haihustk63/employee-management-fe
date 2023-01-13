import { Avatar, List } from "antd";
import React, { FC } from "react";
import { IAppListProps } from "./interface";

const AppList: FC<IAppListProps> = ({ dataSource, loading, onClickItem }) => {
  return (
    <div className="app-list">
      <List
        dataSource={dataSource}
        loading={loading}
        renderItem={(item) => (
          <List.Item onClick={item.onClick}>
            <List.Item.Meta
              // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={item?.title}
              description={item?.description}
            />
            {item?.content}
          </List.Item>
        )}
      />
    </div>
  );
};

export default AppList;
