"use client";

import { Layout } from "antd";
import Signup from "../../components/sign_up/signup";
import Login from "../../components/login/login";

const { Header, Footer, Sider, Content } = Layout;

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
  maxWidth: "100%",
  height: "100vh",
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#1677ff",
};

const contentStyle: React.CSSProperties = {
  flex: 1,
  justifyContent: "center",
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#0958d9",
  height: "100%",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

export default function Home() {
  return (
    <main>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>Header</Header>
        <Layout>
          <Sider width="25%" style={siderStyle}>
            <Login />
          </Sider>
          <Content style={contentStyle}>
            <Signup />
          </Content>
        </Layout>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </main>
  );
}
