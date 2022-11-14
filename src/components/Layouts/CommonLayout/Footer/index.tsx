import React from "react";
import { Layout, Typography } from "antd";

const { Footer } = Layout;

const { Text } = Typography;

const CommonFooter = () => {
  return (
    <Footer className="common-footer">
      <Text>
        Copyright © 2021 HarryCorp. All rights reserved. Privacy Policy | Terms
        of Service
      </Text>
    </Footer>
  );
};

export default CommonFooter;
