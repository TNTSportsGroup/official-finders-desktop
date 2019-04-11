import * as React from "react";
import { Nav } from "../components/Nav";

import { Button, Alert, Table, Select } from "antd";
import { BackToHome } from "../components/BackToHome";

const columns = [
  {
    title: "Game Date",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Game Time",
    dataIndex: "amount",
    key: "amount"
  },
  {
    title: "Home Team",
    dataIndex: "amount",
    key: "amount"
  },
  {
    title: "Away Yeam",
    dataIndex: "amount",
    key: "amount"
  },
  {
    title: "Facility",
    dataIndex: "amount",
    key: "amount"
  }
];

const handleGetGames = async (season: string, year: number) => {
  const response = await fetch(
    `http://localhost:3000/qs?season=${season}&year=${year}`
  );

  return response.json();
};

const Option = Select.Option;

export const QuickScoresGames = () => {
  const [error, setError] = React.useState("");
  const [season, setSeason] = React.useState("Spring");
  const [newGames, setNewGames] = React.useState("");
  const [updatedGames, setUpdatesGames] = React.useState("");
  const [year, setYear] = React.useState(2019);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto"
      }}
    >
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
          <div>
            <Select defaultValue={season} onChange={value => setSeason(value)}>
              <Option value="Spring">Spring</Option>
            </Select>
            <Select defaultValue={year} onChange={value => setYear(value)}>
              <Option value={2019}>2019</Option>
            </Select>
          </div>
          <Button
            type="primary"
            onClick={async () => {
              const response = await handleGetGames(season, year);

              if (response.error) {
                setError(response.error);
                return;
              }
            }}
          >
            Get Games
          </Button>
          {error && (
            <Alert
              type="error"
              message=""
              showIcon={true}
              description={error}
              closable={true}
              afterClose={() => {
                setError("");
              }}
            />
          )}
        </div>
        <div style={{ flex: 11, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              padding: "3rem"
            }}
          >
            <h1>New Games</h1>
            <Table bordered={true} columns={columns} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Button type="primary">Download</Button>
            <Alert
              message="Download was a success"
              type="success"
              showIcon={true}
            />
          </div>

          <div
            style={{
              padding: "3rem"
            }}
          >
            <h1>Updated Games</h1>
            <Table bordered={true} columns={columns} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Button type="primary">Download</Button>
            <Alert
              message="Download was a success"
              type="success"
              showIcon={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
