import "./Table.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Menu,
  Breadcrumb,
  Typography,
  Dropdown,
  Table,
  Input,
  Space,
} from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  DownOutlined,
  AudioOutlined,
} from "@ant-design/icons";
// import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

require("es6-promise").polyfill();
require("isomorphic-fetch");

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const { Title } = Typography;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

function EmployTable() {
  const [collapsed, setCollapsed] = useState(false);
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  const [searchColumns, setSearchColumns] = useState(["WechatID"]);
  const columnsForSearch = data[0] && Object.keys(data[0]);
  // const onSearch = value => console.log(value);
  const columns = [
    {
      title: "WechatID",
      dataIndex: "WechatID",
      key: "WechatID",
      render: (text) => <a>{text}</a>,
      width: 150,
    },
    {
      title: "Field",
      dataIndex: "Field",
      key: "Field",
      render: (text) => <a>{text}</a>,
      width: 150,
    },
    {
      title: "Company",
      dataIndex: "Company",
      key: "Company",
      render: (text) => <a>{text}</a>,
      width: 150,
    },
    {
      title: "Position",
      dataIndex: "Position",
      key: "Position",
      render: (text) => <a>{text}</a>,
      width: 150,
    },
  ];

  useEffect(() => {
    fetch("http://localhost:3000/EmploymentInfo")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  function search_people(rows) {
    const columns_real = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) =>
      columns_real.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }

  // Dropdown menu
  const menu = (
    <Menu>
      <Menu.ItemGroup title="Tables">
        <Menu.Item
          key="2"
          icon={<DesktopOutlined />}
          onClick={() => {
            navigate({ pathname: "/notitable" });
          }}
        >
          Notification Information
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<DesktopOutlined />}
          onClick={() => {
            navigate({ pathname: "/articletable" });
          }}
        >
          Articles Information
        </Menu.Item>
      </Menu.ItemGroup>
      <SubMenu title="User Information">
        <Menu.Item
          key="2"
          icon={<DesktopOutlined />}
          onClick={() => {
            navigate({ pathname: "/search" });
          }}
        >
          General User Information
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<DesktopOutlined />}
          onClick={() => {
            navigate({ pathname: "/detailtable" });
          }}
        >
          Detailed User Information
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<DesktopOutlined />}
          onClick={() => {
            navigate({ pathname: "/contacttable" });
          }}
        >
          Contact Information
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<DesktopOutlined />}
          onClick={() => {
            navigate({ pathname: "/academictable" });
          }}
        >
          Academic Information
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<DesktopOutlined />}
          onClick={() => {
            navigate({ pathname: "/employtable" });
          }}
        >
          Employment Information
        </Menu.Item>
      </SubMenu>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item
            key="1"
            icon={<PieChartOutlined />}
            onClick={() => {
              navigate({ pathname: "/" });
            }}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<DesktopOutlined />}
            onClick={() => {
              navigate({ pathname: "/search" });
            }}
          >
            Search Engine
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">User1</Menu.Item>
            <Menu.Item key="4">User2</Menu.Item>
            <Menu.Item key="5">User3</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Manager View</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 500 }}
          >
            <Title>Search Engine</Title>
            <Dropdown overlay={menu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                Select a Table <DownOutlined />
              </a>
            </Dropdown>
            {/* <Space>
            <Search placeholder="input search text" onSearch={(e) => setQ(e.target.value)} style={{ width: 200 }} />
          </Space> */}
            <Space>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              {columnsForSearch &&
                columnsForSearch.map((column) => (
                  <label>
                    <input
                      type="checkbox"
                      checked={searchColumns.includes(column)}
                      onChange={(e) => {
                        const checked = searchColumns.includes(column);
                        setSearchColumns((prev) =>
                          checked
                            ? prev.filter((sc) => sc !== column)
                            : [...prev, column]
                        );
                      }}
                    />
                    {column}
                  </label>
                ))}
            </Space>
            <Table columns={columns} dataSource={search_people(data)} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>CSSA 会友部</Footer>
      </Layout>
    </Layout>
  );
}

export default EmployTable;
