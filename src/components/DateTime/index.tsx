import React, { useMemo } from "react";
import { format } from "date-fns";
import { Typography } from "antd";

const { Title } = Typography;

const DateTime = () => {
  const time = useMemo(() => {
    return format(Date.now(), "dd/MM/yyyy");
  }, []);

  return <Title level={5}>Today is: {time}</Title>;
};

export default DateTime;
