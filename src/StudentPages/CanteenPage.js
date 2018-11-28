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
    padding: "0 15px 15px 2vw",
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
    this.setState({}, () =>
      dispatch({
        type: SET_CURRENT_PAGE,
        page: 0
      })
    );
    dispatch(canteenActions.getAllCanteens());
  }

  onCanteenClick = canteenId => {
    // console.log('####clicked a canteen');
    history.push(`/homepage/store/${canteenId}`);
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
              className="col-xs-6"
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
