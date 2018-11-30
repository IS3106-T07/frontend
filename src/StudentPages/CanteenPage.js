/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/es/styles/withStyles";
import CanteenCard from "./CanteenCard";
import { canteenActions } from "../_actions";
import { history } from "../_helpers/history";
import { SET_CURRENT_PAGE } from "../App";

const style = {
  wrapper: {
    padding: "0 15px 15px calc(6vw - 15px)",
    boxSizing: "border-box",
    width: "100vw"
  }
};

class CanteenPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { dispatch } = this.props;
    const { userType } = JSON.parse(localStorage.getItem("user"));
    this.setState({}, () =>
      dispatch({
        type: SET_CURRENT_PAGE,
        page: userType === "VENDOR" ? 1 : 0
      })
    );
    dispatch(canteenActions.getAllCanteens());
  }

  onCanteenClick = canteenId => {
    // console.log('####clicked a canteen');
    const { userType } = JSON.parse(localStorage.getItem("user"));
    if (userType === "VENDOR") {
      history.push(`/vendor/store/${canteenId}`);
    } else {
      history.push(`/homepage/store/${canteenId}`);
    }
  };

  render() {
    const { classes, canteens } = this.props;
    return (
      <div className={classes.wrapper}>
        <Typography
          variant="h3"
          style={{
            color: "gray",
            marginLeft: "2vw",
            marginTop: 20
          }}
        >
          Canteen
        </Typography>
        {canteens !== undefined &&
          canteens.map(c => (
            <div
              className="col-xs-6 col-sm-6 col-md-6"
              key={c.id}
              onClick={() => this.onCanteenClick(c.id)}
            >
              <CanteenCard canteen={c} />
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  canteens: state.canteens.canteens
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(CanteenPage));
