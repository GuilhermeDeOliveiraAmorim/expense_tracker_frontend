"use client";

import { Layout } from "antd";
import Signup from "./components/signup/signup";

const { Sider, Content } = Layout;

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
  height: "100vh",
  display: "flex",
};

const siderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  backgroundColor: "#ffffff",
  backgroundImage: `url('coins-8450635_640.jpg')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const contentStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  backgroundColor: "#669bbc",
};

export default function Home() {
  return (
    <main>
      <Layout style={layoutStyle}>
        <Layout>
          <Sider width="50%" style={siderStyle}></Sider>
          <Content style={contentStyle}>
            <Signup />
          </Content>
        </Layout>
      </Layout>
    </main>
  );
}
