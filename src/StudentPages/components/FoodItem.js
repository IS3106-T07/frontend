import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TotalAmount from './TotalAmount';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import OrderConfirmationDialog from './OrderConfirmationPage';
import OrderItems from './OrderItems';

const styles = {
  wrapper: {

  },
};

function FoodItem(props) {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <OrderItems/>
      <TotalAmount/>
      <div className="col-xs-5"></div>
      <div className="col-xs-7">
        <OrderConfirmationDialog/>
      </div>
    </div>



  );
}

export default withStyles(styles)(FoodItem);
