import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FoodItem from './components/FoodItem';
import OrderConfirmationDialog from './components/OrderConfirmationPage';
import OrderItems from './components/OrderItems';
import TotalAmount from './components/TotalAmount';

const styles = theme => ({
  root: {
    width: 375,
    paddingTop: 5,

  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,

  },
});

function CartList(props) {
  const { classes } = props;
  if(!props.data) {
    return (
      <div></div>
    )
  }
  //dirty
  const totalPrice = 0;
  const canteenName = 'FineFood';
  const storeName = props.data.storeName;
  const orders = props.data.orders;
  const orderId = props.orderId;

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          className={classes.heading}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography
            style={{
              fontSize: 20,
            }}
          >
            {canteenName?canteenName:'canteenName'}:
          </Typography>
          <Typography
            style={{
              paddingLeft: 5,
              fontSize: 20,
            }}
          >
            {storeName?storeName:'storeName'}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {/*<div className={classes.wrapper}>*/}
            {/*<OrderItems data={data}/>*/}
            {/*<TotalAmount total={total} />*/}
            {/*<div className="col-xs-5"></div>*/}
            {/*<div className="col-xs-7">*/}
              {/*<OrderConfirmationDialog total={total} orderId={orderId} data={data}/>*/}
            {/*</div>*/}
          {/*</div>*/}
          {
            orders?orders.map(function(order, key) {
              return (<FoodItem key={key} data={order} total={totalPrice} orderId={orderId} />)
            }):''
          }
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

CartList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CartList);
