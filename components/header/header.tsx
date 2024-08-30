import { Flex } from "antd";
import { Header } from "antd/es/layout/layout";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const AppHeader = () => {
  return (
    <Header>
      <Flex>
        <Avatar size={64} icon={<UserOutlined />} />
      </Flex>
    </Header>
  );
};

export default AppHeader;
