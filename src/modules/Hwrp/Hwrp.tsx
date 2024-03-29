import { Alert, Button, Icon, Table, Upload } from "antd";
import * as dayjs from "dayjs";
import * as fs from "fs";
import * as path from "path";
import * as React from "react";
import { Link } from "react-router-dom";
import { Nav } from "../components/Nav";
import { routes } from "../constants/routes";
import { HOST } from "../constants/keys";

interface IState {
  disabled: boolean;
  data: any[];
  fileName: string;
  negativeReport: any[];
  showNegativeReport: boolean;
  showSuccess: boolean;
}

export class Hwrp extends React.Component<any, IState> {
  state = {
    disabled: false,
    data: [],
    fileName: "",
    negativeReport: [],
    showNegativeReport: false,
    showSuccess: false
  };

  handleChange = (info: any) => {
    const { response } = info.file;

    if (response) {
      this.setState({
        fileName: response.fileName,
        data: response.userData,
        negativeReport: response.negative
      });
    }
  };

  handleReportClick = () => {
    this.setState((prevState: IState) => ({
      showNegativeReport: !prevState.showNegativeReport
    }));
  };

  handleDownloadClick = async () => {
    const { fileName } = this.state;

    const response = await fetch(`${HOST}/hwrp/${fileName}`);

    if (response && response.body) {
      if (response.status === 200) {
        const res = await response.text();
        const userDir = process.env.HOME || process.env.PWD;
        const DOWNLOAD_DIR = path.join(userDir as string, "Documents/");
        const formattedDate = dayjs().format("MMM:D-hh-mm");
        const savedFileName = `Payroll-${formattedDate}.csv`;

        const myWritableStream = fs.createWriteStream(
          DOWNLOAD_DIR + savedFileName
        );
        await myWritableStream.write(res);

        await this.setState({
          showSuccess: true
        });
      }
    }
  };

  render() {
    const columns = [
      {
        title: "Receiver Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Receiver Amount",
        dataIndex: "amount",
        key: "amount"
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
            padding: "5rem",
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
            action={`${HOST}/hwrp`}
            multiple={false}
          >
            <Button type="primary" disabled={this.state.disabled}>
              <Icon type="upload" /> Upload Payroll
            </Button>
          </Upload>
        </div>

        {this.state.data.length >= 1 && (
          <div style={{ padding: "2rem" }}>
            <Table
              bordered={true}
              dataSource={this.state.data}
              columns={columns}
            />
          </div>
        )}

        {this.state.data.length >= 1 && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              padding: "1rem"
            }}
          >
            <Button onClick={this.handleReportClick}>Show Report</Button>
            <Button type="primary" onClick={this.handleDownloadClick}>
              Download
              <Icon type="cloud-download" />
            </Button>

            {this.state.showSuccess && (
              <Alert
                message="Download was a success"
                type="success"
                showIcon={true}
              />
            )}
          </div>
        )}

        {this.state.showNegativeReport && (
          <div style={{ padding: "2rem" }}>
            <Table
              bordered={true}
              dataSource={this.state.negativeReport}
              columns={columns}
            />
          </div>
        )}
      </div>
    );
  }
}
