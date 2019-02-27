import * as React from "react";
import { Nav } from "../components/Nav";
import { Link } from "react-router-dom";
import { routes } from "../constants/routes";
import { Icon, Upload, Button } from "antd";
import console = require("console");

export class HwrInvoice extends React.Component {
  state = {
    disabled: false
  };

  handleChange = (info: any) => {
    const { response } = info.file;

    if (response) {
      const { data, totalNumberOfGames, keys, folderName } = response;
    }
  };

  render() {
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
            action="http://localhost:3000/hwri"
            multiple={false}
          >
            <Button type="primary" disabled={this.state.disabled}>
              <Icon type="upload" /> Upload Invoice
            </Button>
          </Upload>
        </div>
      </div>
    );
  }
}
