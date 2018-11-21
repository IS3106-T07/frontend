import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {handleActivateResponse} from '../../_helpers/handleResponse'
import config from 'config';

const styles = {
  wrapper: {
  },
};

function SellerItem(props) {
  const { classes, item } = props;
  console.log(JSON.stringify(item,undefined,2));
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

      <div className="btn-group" style={{marginTop:20}}>
        <button type="button" className="btn btn-danger" onClick={() => {
          fetch(`${config.apiUrl}/webresources/customers/deleteitem`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: item.id})
          })
            .then(handleActivateResponse);
          window.location.reload();
        }}>Delete</button>

      </div>
    </div>



  );
}

export default withStyles(styles)(SellerItem);
