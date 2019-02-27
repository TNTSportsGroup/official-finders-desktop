import * as React from "react";
import { Menu, Icon } from "antd";

const SubMenu = Menu.SubMenu;

interface IProps {
  sportKeys: any[];
  onSelect?: () => void;
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
      onClick={({ key }) => console.log(key)}
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

      {/* <SubMenu
        key="sub1"
        title={
          <span>
            <Icon type="mail" />
            <span>Navigation One</span>
          </span>
        }
      >
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
        <Menu.Item key="3">Option 3</Menu.Item>
        <Menu.Item key="4">Option 4</Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub2"
        title={
          <span>
            <Icon type="appstore" />
            <span>Navigtion Two</span>
          </span>
        }
      >
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu
        key="sub4"
        title={
          <span>
            <Icon type="setting" />
            <span>Navigation Three</span>
          </span>
        }
      >
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu> */}
    </Menu>
  );
};
