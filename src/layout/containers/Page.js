import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Grid, Button, Menu } from "semantic-ui-react";

import { Header } from "../header";
import { Footer } from "../footer";
import storage from "../../core/storage";
import { getCookieValue } from "../../core/utils/index";

class Page extends React.Component {
  state = {
    showEmailConfirmationBanner: true,
    emailConfirmed: false,
    cookiesBanner: getCookieValue("cookiesBanner") || false
  };

  toggleEmailBannerVisibility = () => {
    this.setState({
      showEmailConfirmationBanner: !this.state.showEmailConfirmationBanner
    });
  };

  toggleCookiesBannerVisibility = () => {
    document.cookie = "cookiesBanner=true";
    this.setState({ cookiesBanner: true });
  };

  render() {
    const {
      columns,
      centered,
      showHeader,
      showFooter,
      headerData,
      footerData,
      noContainer,
      location,
      showEmailBanner
    } = this.props;
    const { cookiesBanner } = this.state;
    const user = storage.get("user");

    return (
      <React.Fragment>
        {showHeader ? (
          <Header {...headerData} {...{ location }}>
            <Menu.Item>
              <Button primary style={{ padding: "12px 15px" }}>
                <Link style={{ color: "white" }} to="/events" href="/events">
                  Read Now
                </Link>
              </Button>
            </Menu.Item>
          </Header>
        ) : null}
        {!this.state.emailConfirmed &&
          this.state.showEmailConfirmationBanner &&
          showEmailBanner && (
            <div className="email-confirmation-banner">
              To confirm your account, please follow the instructions we sent to
              your email
              <span
                className="ico--cross email-cross-icon"
                onClick={this.toggleEmailBannerVisibility}
                onKeyPress={this.toggleEmailBannerVisibility}
              />
            </div>
          )}
        {user &&
          !cookiesBanner && (
            <div className="email-confirmation-banner">
              This site uses cookies. By continuing to browse the site you are
              agreeing to our use of cookies.
              <span
                className="email-cross-icon"
                onClick={this.toggleCookiesBannerVisibility}
                onKeyPress={this.toggleCookiesBannerVisibility}
              >
                Dismiss
              </span>
            </div>
          )}
        <Grid
          style={
            user && !cookiesBanner
              ? { backgroundColor: "#f7fafa", marginTop: 0, width: "100%" }
              : { backgroundColor: "#f7fafa" }
          }
        >
          <Grid
            className="MYWEBSITE-page-container"
            {...{
              centered,
              container: !noContainer
            }}
          >
            <Grid.Column width={columns}>{this.props.children}</Grid.Column>
          </Grid>
        </Grid>
        {showFooter ? <Footer {...footerData} /> : null}
      </React.Fragment>
    );
  }
}

Page.propTypes = {
  columns: PropTypes.number,
  centered: PropTypes.bool,
  showEmailBanner: PropTypes.bool,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
  headerData: PropTypes.object,
  footerData: PropTypes.object,
  noContainer: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  userMenu: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  streakData: PropTypes.object,
  cornerMenu: PropTypes.object,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

Page.defaultProps = {
  columns: 12,
  centered: true,
  showHeader: true,
  showFooter: true,
  headerData: {},
  footerData: {},
  noContainer: false,
  userMenu: null,
  streakData: {},
  cornerMenu: {},
  showEmailBanner: false
};

export default Page;
