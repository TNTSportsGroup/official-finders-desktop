import * as React from "react";
import { Menu, Icon } from "antd";
import console = require("console");

const SubMenu = Menu.SubMenu;

interface IProps {
  sportKeys: any[];
  handleSelect: (item: string) => void;
}

export const SiderMenu = (props: IProps) => {
  const Sports = [
    "Soccer",
    "Football",
    "Baseball",
    "Softball",
    "Floor Hockey",
    "Dodgeball",
    "Concessions",
    "Scorekeepers",
    "Hall Monitors",
    "Volleyball",
    "Basketball"
  ];
  return (
    <Menu
      theme="dark"
      //   onClick={({ key }) => console.log(key)}
      onSelect={({ key }) => props.handleSelect(key)}
      style={{ width: 275, height: "110%" }}
      defaultOpenKeys={["sub1"]}
      selectedKeys={["0"]}
      mode="inline"
    >
      {Sports.map((sport, index) => {
        return (
          <SubMenu
            key={index}
            title={
              <span>
                <span>{sport}</span>
              </span>
            }
          >
            {props.sportKeys.map((key, index) => {
              if (key.includes(sport)) {
                return <Menu.Item key={key}>{key}</Menu.Item>;
              }
            })}
          </SubMenu>
        );
      })}
    </Menu>
  );
};
