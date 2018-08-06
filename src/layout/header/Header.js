import React from "react";
import PropTypes from "prop-types";
import { Grid, Menu, Icon, Sidebar } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import "./Header.css";

class Header extends React.Component {
  state = {
    sideBarVisible: false,
    readingStatusVisible: false
  };

  toggleSidebarVisibility = () => {
    this.setState({ sideBarVisible: !this.state.sideBarVisible });
  };

  toggleReadingStatusVisibility = () => {
    this.setState({ readingStatusVisible: !this.state.readingStatusVisible });
  };

  handleClickItemHeader = route => {
    const { history } = this.props;
    history.push(route);
  };

  renderMenu = (menu, location) => {
    if (!menu.length) return null;
    const rendered = menu.map((item, i) => {
      const { text, icon, ...itemProps } = item;
      return (
        <Menu.Item
          {...itemProps}
          active={location && location.pathname === itemProps.route}
          onClick={() => {
            this.handleClickItemHeader(itemProps.route);
          }}
          key={item.name || i}
        >
          <Icon className={icon} size="large" /> {text}
        </Menu.Item>
      );
    });
    return (
      <Menu secondary pointing>
        {rendered}
      </Menu>
    );
  };

  renderTabMobileMenu = (menu, location) => {
    const rendered = menu.map((item, i) => {
      const { text, icon, ...itemProps } = item;
      return (
        <Menu.Item
          {...itemProps}
          active={location && location.pathname === itemProps.route}
          onClick={() => {
            this.handleClickItemHeader(itemProps.route);
          }}
          key={item.name || i}
        >
          <Icon className={icon} size="large" /> {text}
        </Menu.Item>
      );
    });
    return [
      <Icon
        name="content"
        size="big"
        link
        key="sidebar-menu-toggle-icon"
        style={{
          marginLeft: "24px",
          marginTop: "14px",
          color: "teal"
        }}
        onClick={this.toggleSidebarVisibility}
      />,
      <Sidebar
        as={Menu}
        key="sidebar-menu"
        animation="overlay"
        width="wide"
        visible={this.state.sideBarVisible}
        vertical
        style={{ top: "64px" }}
      >
        {rendered}
      </Sidebar>
    ];
  };

  render() {
    const { menu, location } = this.props;

    return (
      <Grid
        className={`MYWEBSITE-header ${
          this.state.sideBarVisible || this.state.readingStatusVisible
            ? "fixed"
            : ""
        }`}
      >
        <header style={{ width: "100%" }}>
          <Grid>
            <Grid.Column
              className="MYWEBSITE-menu-bar"
              width={5}
              only="computer"
            >
              {this.renderMenu(menu, location)}
            </Grid.Column>
            <Grid.Column
              className="MYWEBSITE-menu-bar"
              width={4}
              only="tablet mobile"
            >
              {this.renderTabMobileMenu(menu, location)}
            </Grid.Column>
            <Grid.Column
              className="MYWEBSITE-logo-bar"
              style={{ paddingTop: 0 }}
              width={2}
              textAlign="center"
              verticalAlign="middle"
              only="computer"
            />
            <Grid.Column
              className="MYWEBSITE-logo-bar"
              width={4}
              textAlign="center"
              verticalAlign="middle"
              only="tablet mobile"
            />
            <Grid.Column textAlign="right" width={4} only="tablet mobile">
              <Icon
                className="ico--person"
                size="big"
                link
                style={{ lineHeight: "2em" }}
                onClick={this.toggleReadingStatusVisibility}
              />
              <Sidebar
                as={Menu}
                floated="right"
                direction="right"
                vertical
                width="thin"
                animation="overlay"
                style={{ top: "64px" }}
                visible={this.state.readingStatusVisible}
              >
                {this.props.children}
              </Sidebar>
            </Grid.Column>
            <Grid.Column
              className="MYWEBSITE-right-bar"
              style={{ paddingTop: 0 }}
              width={5}
              only="computer"
            >
              <Menu floated="right" secondary>
                {this.props.children}
              </Menu>
            </Grid.Column>
          </Grid>
        </header>
      </Grid>
    );
  }
}

Header.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired
    })
  ),
  logoData: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      clickHandler: PropTypes.func
    })
  ),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.object.isRequired
};

Header.defaultProps = {
  menu: [],
  logoData: [],
  children: null
};

export default withRouter(Header);
