import * as React from "react";
import { Nav } from "../components/Nav";
import { Link } from "react-router-dom";
import { routes } from "../constants/routes";
import { Icon, Upload, Button, Menu, Layout, Table } from "antd";
import console = require("console");
import { SiderMenu } from "../components/SiderMenu";

const { Sider, Content } = Layout;

export class HwrInvoice extends React.Component {
  state = {
    disabled: false,
    data: {},
    sportKeys: [],
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
        sportKeys: keys,
        totalNumberOfGames,
        folderToDownload: folderName
      });
    }
  };

  handleSelect = (item: string) => {
    console.log(this.state.data[item].games);

    this.setState({
      dataToDisplay: this.state.data[item].games
    });
  };

  render() {
    const columns = [
      {
        title: "ID",
        dataIndex: "ID",
        key: "ID"
      },
      {
        title: "Game Date",
        dataIndex: "Game Date",
        key: "Game Date"
      },
      {
        title: "Type",
        dataIndex: "Type",
        key: "Type"
      },
      {
        title: "Home Team",
        dataIndex: "Home Team",
        key: "Home Team"
      },
      {
        title: "Away Team",
        dataIndex: "Away Team",
        key: "Away Team"
      },
      {
        title: "Facility",
        dataIndex: "Facility",
        key: "Facility"
      },
      {
        title: "Total",
        dataIndex: "Total",
        key: "Total"
      }
    ];
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
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

        <Layout hasSider={true} style={{ height: "110%" }}>
          <Sider>
            <SiderMenu
              sportKeys={this.state.sportKeys}
              handleSelect={this.handleSelect}
            />
          </Sider>
          <Content>
            <div style={{ padding: "6rem" }}>
              <Table
                bordered={true}
                dataSource={this.state.dataToDisplay}
                columns={columns}
              />
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}
