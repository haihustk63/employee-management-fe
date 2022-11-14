import React from "react";
import { Typography } from "antd";

const { Text } = Typography;
//localize

const Footer = () => {
  return (
    <div className="auth-layout-footer">
      <Text>
        Copyright © 2021 HarryCorp. All rights reserved. Privacy Policy | Terms
        of Service
      </Text>
    </div>
  );
};

export default Footer;
