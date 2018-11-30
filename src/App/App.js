import React from "react";
import { Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import MetaTags from "react-meta-tags";
import { history } from "../_helpers";
import { alertActions } from "../_actions";

import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
import HomePage from "../HomePage/index";
import UserTypePage from "../LoginPage/UserTypePage";
import RegisterVendorPage from "../RegisterPage/RegisterVendorPage";
import VendorPages from "../VendorPages";
import VendorMenuPage from "../VendorPages/VendorMenu/VendorMenuPage";

export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_CURRENT_TITLE = "SET_CURRENT_TITLE";

function ContentPage() {
  return (
    <Router history={history}>
      <div>
        <Route
          exact
          path="/"
          render={() =>
            localStorage.getItem("store") !== null ? (
              <Redirect to={{ pathname: "/vendor/menu" }} />
            ) : (
              <Redirect to={{ pathname: "/homepage/canteen" }} />
            )
          }
        />
        <Route path="/homepage" component={HomePage} />
        <Route path="/vendor" component={VendorPages} />
      </div>
    </Router>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div id="parentWrapper" className="wrapper">
        <MetaTags>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </MetaTags>
        <div>
          <div className="col">
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
            <Router history={history}>
              <div>
                {/* <PrivateRoute exact path="/" component={HomePage} /> */}
                <Route exact path="/vendor" component={ContentPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/userType" component={UserTypePage} />
                <Route exact path="/registerStudent" component={RegisterPage} />
                <Route
                  exact
                  path="/registerVendor"
                  component={RegisterVendorPage}
                />
                <Route
                  path="/"
                  render={() =>
                    localStorage.getItem("user") ? (
                      <ContentPage />
                    ) : (
                      <Redirect to={{ pathname: "/login" }} />
                    )
                  }
                />
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
