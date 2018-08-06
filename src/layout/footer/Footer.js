import React from "react";
import { Grid, Menu, Image } from "semantic-ui-react";
import PropTypes from "prop-types";
import "./Footer.css";

class Footer extends React.Component {
  renderMenu = menu => {
    if (!menu.length) return null;
    const rendered = menu.map((item, i) => {
      const { clickHandler, ...itemProps } = item;
      return (
        <Menu.Item {...itemProps} onClick={clickHandler} key={item.key || i}>
          {item.title}
        </Menu.Item>
      );
    });
    return (
      <Menu stackable text>
        {rendered}
      </Menu>
    );
  };

  render() {
    // const { menu } = this.props;
    return (
      <Grid className="MYWEBSITE-footer" reversed="mobile" stackable>
        <Grid.Column
          className="MYWEBSITE-footer-menu"
          width={10}
          only="computer"
        />
        <Grid.Column className="MYWEBSITE-footer-logo" width={2}>
          {/* <Logo /> */}
          <Image className="MYWEBSITE-logo" src="" />
        </Grid.Column>
      </Grid>
    );
  }
}

Footer.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      clickHandler: PropTypes.func
    })
  )
};

Footer.defaultProps = {
  menu: []
};

export default Footer;
