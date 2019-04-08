import * as React from "react";
import { Nav } from "../components/Nav";
import { Link } from "react-router-dom";
import { routes } from "../constants/routes";
import { Icon, Button, Alert, Table } from "antd";

export const QuickScoresGames = () => {
  const [error, setError] = React.useState("ff");
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
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
