import * as React from "react";
import { Nav } from "../components/Nav";

import { Button, Alert, Table } from "antd";
import { BackToHome } from "../components/BackToHome";

export const QuickScoresGames = () => {
  const [error, setError] = React.useState("ff");
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Nav>
        <BackToHome />
      </Nav>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            flex: 1.5,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            borderBottomStyle: "solid",
            borderBottomColor: "grey",
            borderBottomWidth: "1px"
          }}
        >
          <Button type="primary">Get Games</Button>
          {error && (
            <Alert
              type="error"
              message=""
              showIcon={true}
              description={error}
              closable={true}
            />
          )}
        </div>
        <div style={{ flex: 11, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              padding: "3rem"
            }}
          >
            <Table
              bordered={true}
              columns={[{ title: "name" }, { title: "location" }]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
