import * as React from "react";
import { Link } from "react-router-dom";

import { Button, Icon } from "antd";

import { routes } from "../constants/routes";
import { Header } from "../components/Header";

export const Home = () => (
  <div
    style={{
      height: "100%",
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundImage:
        "linear-gradient(45deg, rgba(0, 216, 255, 0.5) 10%, rgba(0, 1, 127, 0.7))"
    }}
  >
    <div
      style={{
        padding: 10,
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start"
      }}
    >
      <Header>Home</Header>
      <Link to={routes.HWRPAYROLL}>
        <Button type="primary">
          HWR Payroll
          <Icon type="arrow-right" />
        </Button>
      </Link>
      <Link to={routes.HWRINVOICE}>
        <Button type="primary">
          HWR Invoice
          <Icon type="arrow-right" />
        </Button>
      </Link>
    </div>
  </div>
);
