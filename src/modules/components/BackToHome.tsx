import * as React from "react";
import { Link } from "react-router-dom";
import { Icon } from "antd";
import { routes } from "../constants/routes";

export const BackToHome = () => (
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
);
