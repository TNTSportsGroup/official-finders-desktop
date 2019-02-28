import * as React from "react";
import * as path from "path";
import * as fs from "fs";
import * as child_process from "child_process";
import { Nav } from "../components/Nav";
import { Link } from "react-router-dom";
import { routes } from "../constants/routes";
import { Icon, Upload, Button, Layout, Table } from "antd";
import * as unzipper from "unzipper";

import { SiderMenu } from "../components/SiderMenu";

import { Header } from "../components/Header";
import * as request from "request";
import dayjs = require("dayjs");

const { Sider, Content } = Layout;

export class HwrInvoice extends React.Component {
  state = {
    disabled: false,
    data: {},
    sportKeys: [],
    folderToDownload: "",
    totalNumberOfGames: 0,
    dataToDisplay: [],
    completeTotal: ""
  };

  handleChange = (info: any) => {
    const { response } = info.file;

    if (response) {
      const {
        data,
        totalNumberOfGames,
        keys,
        folderName,
        completeTotal
      } = response;

      this.setState({
        data,
        sportKeys: keys,
        totalNumberOfGames,
        folderToDownload: folderName,
        completeTotal
      });
    }
  };

  handleSelect = (item: string) => {
    this.setState({
      dataToDisplay: this.state.data[item].games
    });
  };

  downloadZip = async () => {
    const { folderToDownload } = this.state;

    const userDir = (process.env.HOME || process.env.PWD) as string;
    const DOWNLOAD_DIR = path.join(userDir, "documents/");

    // A script that will fetch the zip file and extract it to the Dekstop/demo folder.
    // child_process.exec(
    //   `curl http://localhost:3000/hwri/${folderToDownload} | tar -xf - -C ./Desktop/demo
    // `,
    //   {
    //     cwd: userDir
    //   }
    // );

    const directory = await unzipper.Open.url(
      request,
      `http://localhost:3000/hwri/${folderToDownload}`
    );
    const formattedDate = dayjs().format("MMM:D-hh-mm");
    const savedFolderName = `Invoices-${formattedDate}`;

    const newFolder = path.join(DOWNLOAD_DIR, savedFolderName);

    await fs.mkdirSync(newFolder);

    directory.files.map(async file => {
      const csvFile = fs.createWriteStream(path.resolve(newFolder, file.path));

      csvFile.write(await file.buffer());
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
      },
      {
        title: "Grand Total",
        dataIndex: "Grand Total",
        key: "Grand Total"
      }
    ];
    return (
      <div
        style={{
          display: "flex",
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

        <Layout hasSider={true} style={{ flex: 1 }}>
          <Sider style={{ height: "110%" }}>
            <SiderMenu
              sportKeys={this.state.sportKeys}
              handleSelect={this.handleSelect}
            />
          </Sider>
          <Content style={{ height: "110%", padding: "2rem" }}>
            <div style={{ padding: "2rem", marginLeft: "2rem" }}>
              <Table
                bordered={true}
                dataSource={this.state.dataToDisplay}
                columns={columns}
              />
            </div>
            {this.state.completeTotal && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Header
                  color={"black"}
                  fontSize="3.5rem"
                  fontWeight="1"
                >{`Grand Total: $${this.state.completeTotal}`}</Header>
              </div>
            )}
            {this.state.totalNumberOfGames && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Header color={"black"}>{`Total Games: ${
                  this.state.totalNumberOfGames
                }`}</Header>
              </div>
            )}
            {this.state.folderToDownload && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  padding: 15
                }}
              >
                <Button type="primary" onClick={this.downloadZip}>
                  Download All
                </Button>
              </div>
            )}
          </Content>
        </Layout>
      </div>
    );
  }
}
