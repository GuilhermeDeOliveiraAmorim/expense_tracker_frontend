"use client";

import { Layout } from "antd";
import AppHeader from "../components/header/header";
import AddCategory from "../components/category/addcategory";
import { ListCategory } from "../components/category/listcategory";

const { Content } = Layout;

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
  height: "100vh",
  display: "flex",
};

const contentStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  backgroundColor: "#669bbc",
};

export default function Dashboard() {
  return (
    <main>
      <Layout style={layoutStyle}>
        <AppHeader />
        <Layout>
          <Content style={contentStyle}>
            <AddCategory />
            <ListCategory />
          </Content>
        </Layout>
      </Layout>
    </main>
  );
}
