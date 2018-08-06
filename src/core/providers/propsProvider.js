import React from "react";
import isEmpty from "lodash/isEmpty";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

import ResourceStrings from "../../resources/index";
import storage from "../storage";

const { userCornerMenu } = ResourceStrings;

const logout = () => {
  storage.set("user", {});
  storage.set("auth", {});
  window.location.href = "/user";
};

const propsProvider = {
  headerData: {
    menu: [
      {
        route: "/events",
        name: "events",
        text: "Events",
        icon: "ico--mosque"
      }
    ]
  },
  footerData: {
    menu: [
      {
        href: "/about",
        title: "About"
      },
      {
        href: "/tutorials",
        title: "Tutorials"
      },
      {
        href: "/data-policy",
        title: "Data Use Policy"
      },
      {
        href: "/contact",
        title: "Contact Us"
      }
    ]
  },
  streakData: {
    period: "Today",
    goal: "No reading yet",
    badge: ""
  },
  cornerMenu: {
    showBadge: true,
    content: (
      <Menu vertical>
        <Menu.Item>
          <Menu.Menu>
            {isEmpty(storage.get("auth")) ? (
              <Link href="/user/login" to="/user/login">
                <Menu.Item>
                  <Icon name="sign in" />
                  {userCornerMenu.login}
                </Menu.Item>
              </Link>
            ) : (
              <Menu.Item onClick={logout}>
                <Icon name="sign out" />
                {userCornerMenu.logout}
              </Menu.Item>
            )}
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    )
  }
};

export default propsProvider;
