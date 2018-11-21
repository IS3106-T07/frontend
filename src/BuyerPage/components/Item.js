import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {handleActivateResponse} from '../../_helpers/handleResponse'
import config from 'config';

const styles = {
  wrapper: {
  },
};

function Item(props) {
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

      <div className="btn-group" style={{marginTop:20}}>
        <button type="button" className="btn btn-success" onClick={() => {
          console.log(JSON.stringify(user, undefined, 2));
          fetch(`${config.apiUrl}/webresources/customers/additem`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: item.id, buyerId:user.id, buyerEmail:user.email})
          })
            .then(handleActivateResponse);
          window.location.reload();
        }}>Add to cart</button>

      </div>
    </div>



  );
}

export default withStyles(styles)(Item);
