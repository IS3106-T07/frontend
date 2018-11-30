import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import OrderDetails from "./components/OrderDetails";

const styles = theme => ({
  root: {
    width: "100vw",
    paddingTop: 5
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

function TrackOrderList(props) {
  const { classes, order } = props;
  const orderTotal = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "SGD"
  }).format(
    order.orderDishes
      .map(od => od.amount * od.dish.price)
      .reduce((a, b) => a + b, 0)
  );
  const orderStatus = order.customerOrderType.name;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          className={classes.heading}
          expandIcon={<ExpandMoreIcon />}
        >
          <div className="col-xs-2">
            <Typography
              style={{
                fontSize: 15
              }}
            >
              {order.id}
            </Typography>
          </div>
          <div className="col-xs-4">
            <Typography
              align="left"
              style={{
                paddingLeft: 5,
                fontSize: 15,
                color: orderStatus === "READY" ? "red" : null
              }}
            >
              {orderStatus}
            </Typography>
          </div>
          <div className="col-xs-5">
            <Typography
              align="right"
              style={{
                paddingLeft: 5,
                fontSize: 15
              }}
            >
              {orderTotal}
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <OrderDetails order={order} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

TrackOrderList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TrackOrderList);
