import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {handleActivateResponse} from '../../_helpers/handleResponse'
import config from 'config';

const styles = {
  wrapper: {
  },
};

function CustomerItems(props) {
  const { classes, user } = props;
  console.log(user);

  if(!user) {
    return (
      <div></div>
    );
  }
  return (
    <div className={classes.wrapper}>
      <div>
        User Type: {user.userType}
      </div>
      <div>
        Email: {user.email}
      </div>
      <div>
        Password: {user.password}
      </div>
      <div>
        Active: {user.active?'Active':'Not Active'}
      </div>

      <div className="btn-group" style={{marginTop:20}}>
        <button type="button" className="btn btn-success" onClick={() => {
          console.log(JSON.stringify(user, undefined, 2));
          fetch(`${config.apiUrl}/webresources/customers/activate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: user.id, active:true})
          })
            .then(handleActivateResponse);
          // window.location.reload();
        }}>Activate</button>
        <button type="button" className="btn btn-danger" onClick={() => {
          console.log(JSON.stringify(user, undefined, 2));
          fetch(`${config.apiUrl}/webresources/customers/activate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: user.id, active:false})
          })
            .then(handleActivateResponse);
          // window.location.reload();
        }}>Deactivate</button>
      </div>
    </div>



  );
}

export default withStyles(styles)(CustomerItems);
