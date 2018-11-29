import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider/Divider';
import { convertDateTime } from '../../../_commons/convertTimeToString';

const styles = {
  wrapper: {
    width: 275,
  },
};

function VendorRevenueDetails(props) {
  const { classes, order } = props;
  return (
    <div className={classes.wrapper}>
      <div
        className="col-xs-4"
        style={{
          paddingLeft: 0,
        }}
      >
        {convertDateTime(order.created, true)}
      </div>
      <div
        className="col-xs-6"
        style={{
          paddingLeft: 0,
        }}
      >
        {order.dishName}
      </div>
      <div
        className="col-xs-2"
        style={{
          paddingRight: 0,
        }}
      >
        {parseFloat(order.subtotal).toFixed(2)}
      </div>
      <Divider />
    </div>
  );
}

export default withStyles(styles)(VendorRevenueDetails);
