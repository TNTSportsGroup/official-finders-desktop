import * as React from "react";
import { Nav } from "../components/Nav";
import * as path from "path";

import * as child_process from "child_process";

import { Button, Alert, Table, Select, Spin } from "antd";
import { BackToHome } from "../components/BackToHome";
import { HOST } from "../constants/keys";

const columns = [
  {
    title: "Game Date",
    dataIndex: "Date",
    key: "date"
  },
  {
    title: "Game Time",
    dataIndex: "Time",
    key: "time"
  },
  {
    title: "Home Team",
    dataIndex: "HomeTeam",
    key: "home"
  },
  {
    title: "Away Team",
    dataIndex: "AwayTeam",
    key: "away"
  },
  {
    title: "Facility",
    dataIndex: "LocationName",
    key: "facility"
  },
  {
    title: "Game Code",
    dataIndex: "LeagueName",
    key: "leagueName"
  }
];

const handleDownload = async (fileName: string) => {
  const userDir = process.env.HOME || process.env.PWD;
  const DOWNLOAD_DIR = path.join(userDir as string, "Documents/");

  child_process.exec(
    `curl ${HOST}/qs/file/${fileName} > ${fileName}
`,
    {
      cwd: DOWNLOAD_DIR
    }
  );
  // const response = await fetch(`http://localhost:3000/qs/file/${fileName}`);

  // if (response && response.body) {
  //   if (response.status === 200) {
  //     const res = await response.text();
  //     const userDir = process.env.HOME || process.env.PWD;
  //     const DOWNLOAD_DIR = path.join(userDir as string, "Documents/");

  //     const savedFileName = `${fileName}`;

  //     const myWritableStream = fs.createWriteStream(
  //       DOWNLOAD_DIR + savedFileName
  //     );
  //     await myWritableStream.write(res);
  //   }
  // }
};

const handleGetGames = async (season: string, year: number) => {
  const response = await fetch(`${HOST}/qs?season=${season}&year=${year}`);

  return response.json();
};

const Option = Select.Option;

export const QuickScoresGames = () => {
  const [error, setError] = React.useState("");
  const [season, setSeason] = React.useState("Fall");
  const [newGames, setNewGames] = React.useState([]);
  const [updatedGames, setUpdatedGames] = React.useState([]);
  const [year, setYear] = React.useState(2019);
  const [loading, setLoading] = React.useState(false);
  const [newGamesFileName, setNewGamesFileName] = React.useState("");
  const [updatedGamesFileName, setUpdatedGamesFileName] = React.useState("");
  const [
    newGamesDownloadComplete,
    setNewGamesDownloadComplete
  ] = React.useState(false);
  const [
    updatedGamesDownloadComplete,
    setUpdatedGamesDownloadComplete
  ] = React.useState(false);

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
              <Option value="Fall">Fall</Option>
              <Option value="Spring">Summer</Option>
            </Select>
            <Select defaultValue={year} onChange={value => setYear(value)}>
              <Option value={2019}>2019</Option>
              <Option value={2020}>2020</Option>
            </Select>
          </div>
          <Button
            type="primary"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              const response = await handleGetGames(season, year);

              if (response.error) {
                setError(response.error);
                setLoading(false);
                return;
              }
              const {
                updatedGames,
                newGames,
                newGamesFileName,
                updatedGamesFileName
              } = response;
              setUpdatedGames(updatedGames);
              setNewGames(newGames);
              setUpdatedGamesFileName(updatedGamesFileName);
              setNewGamesFileName(newGamesFileName);
              setLoading(false);
            }}
          >
            Get Games
          </Button>
          {loading && <Spin />}
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
          {newGames.length > 0 && (
            <>
              <div
                style={{
                  padding: "3rem"
                }}
              >
                <h1>New Games</h1>
                <Table
                  bordered={true}
                  columns={columns}
                  dataSource={newGames}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Button
                  type="primary"
                  onClick={async () => {
                    await handleDownload(newGamesFileName);
                    setNewGamesDownloadComplete(true);
                  }}
                >
                  Download
                </Button>
                {newGamesDownloadComplete && (
                  <Alert
                    message="Download was a success"
                    type="success"
                    showIcon={true}
                  />
                )}
              </div>
            </>
          )}

          {newGames.length > 0 && (
            <>
              <div
                style={{
                  padding: "3rem"
                }}
              >
                <h1>Updated Games</h1>
                <Table
                  bordered={true}
                  columns={columns}
                  dataSource={updatedGames}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  {updatedGames.length > 0 && (
                    <Button
                      type="primary"
                      onClick={async () => {
                        await handleDownload(updatedGamesFileName);
                        setUpdatedGamesDownloadComplete(true);
                      }}
                    >
                      Download
                    </Button>
                  )}
                  {updatedGamesDownloadComplete && (
                    <Alert
                      message="Download was a success"
                      type="success"
                      showIcon={true}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
