import * as React from "react";
import { Nav } from "../components/Nav";
import { Link } from "react-router-dom";
import { routes } from "../constants/routes";
import { Icon, Upload, Button, Menu, Layout } from "antd";
import console = require("console");

const SubMenu = Menu.SubMenu;
const { Sider, Content } = Layout;

export class HwrInvoice extends React.Component {
  state = {
    disabled: false,
    data: {},
    keys: [],
    folderToDownload: "",
    totalNumberOfGames: 0,
    dataToDisplay: []
  };

  handleChange = (info: any) => {
    const { response } = info.file;

    if (response) {
      const { data, totalNumberOfGames, keys, folderName } = response;

      this.setState({
        data,
        keys,
        totalNumberOfGames,
        folderToDownload: folderName
      });
    }
  };

  render() {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "pink",
          justifyContent: "flex-start",
          flexDirection: "column"
        }}
      >
        <Nav>
          <Link to={routes.HOME}>
            <Icon
              type="arrow-left"
              style={{
                color: "white",
                marginLeft: ".5rem",
                fontSize: "1.5rem"
              }}
            />
          </Link>
        </Nav>

        <div
          style={{
            padding: "4rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Upload
            onChange={this.handleChange}
            name="file"
            accept="*"
            action="http://localhost:3000/hwri"
            multiple={false}
          >
            <Button type="primary" disabled={this.state.disabled}>
              <Icon type="upload" /> Upload Invoice
            </Button>
          </Upload>
        </div>

        <Layout hasSider={true} style={{ height: "100%" }}>
          <Sider>Sider</Sider>
          <Content>Content</Content>
        </Layout>

        {/* <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "blue",
            flex: 1
          }}
        >
          <Menu
            theme="dark"
            onClick={() => console.log("click")}
            style={{ width: 256, height: "100%" }}
            defaultOpenKeys={["sub1"]}
            selectedKeys={["0"]}
            mode="inline"
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="mail" />
                  <span>Navigation One</span>
                </span>
              }
            >
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="appstore" />
                  <span>Navigtion Two</span>
                </span>
              }
            >
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon type="setting" />
                  <span>Navigation Three</span>
                </span>
              }
            >
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </Menu>
        </div> */}
      </div>
    );
  }
}
