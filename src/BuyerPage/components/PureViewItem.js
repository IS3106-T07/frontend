import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {handleActivateResponse} from '../../_helpers/handleResponse'
import config from 'config';

const styles = {
  wrapper: {
  },
};

function PureViewItem(props) {
  const { classes, item } = props;
  const user = JSON.parse(localStorage.getItem("user"));
  if(!item) {
    return (
      <div></div>
    );
  }
  return (
    <div className={classes.wrapper}>
      <div>
        Item Name: {item.name}
      </div>
      <div>
        Price: {item.price}
      </div>
      <div>
        Seller: {item.sellerEmail}
      </div>
      <div>
        Buyer: {item.buyerEmail}
      </div>
      <div>
        Status: {item.status}
      </div>

    </div>



  );
}

export default withStyles(styles)(PureViewItem);
