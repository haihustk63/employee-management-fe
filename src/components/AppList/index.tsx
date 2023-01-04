import { Avatar, List } from "antd";
import React, { FC } from "react";
import { IAppListProps } from "./interface";

const AppList: FC<IAppListProps> = ({ dataSource, loading }) => {
  return (
    <div className="app-list">
      <List
        dataSource={dataSource}
        loading={loading}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<a href="https://ant.design">{item.title}</a>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default AppList;
