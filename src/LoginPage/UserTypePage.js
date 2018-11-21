/* eslint-disable react/jsx-one-expression-per-line */
import * as React from 'react';
import connect from 'react-redux/es/connect/connect';
import Typography from '@material-ui/core/Typography/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button/Button';

class UserTypePage extends React.Component {
  render() {
    return (
      <div className="col-md-6 col-md-offset-3" align="center">
        <Typography
          variant="h2"
          style={{
            marginTop: 40,
            color: '#CB9D1B',
          }}
        >I am a ...
        </Typography>
        <div style={{
          marginTop: 30,
        }}>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            style={{
              borderColor: '#CB9D1B',
              width: 140,
              height: 140,
              textTransform: 'none',
              backgroundColor: 'floralWhite',
              marginRight: 5,
            }}
            onClick={() => {}}
            to={{
              pathname: '/registerStudent',
            }}
          >
            <Typography
              variant="h4"
              style={{
                color: '#CB9D1B',
              }}
            >Buyer
            </Typography>
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            style={{
              borderColor: '#CB9D1B',
              width: 140,
              height: 140,
              textTransform: 'none',
              backgroundColor: 'floralWhite',
              marginLeft: 5,
            }}
            onClick={() => {}}
            to={{
              pathname: '/registerVendor',
            }}
          >
            <Typography
              variant="h4"
              style={{
                color: '#CB9D1B',
              }}
            >Seller
            </Typography>
          </Button>
        </div>
      </div>
    );
  }
}

export default connect()(UserTypePage);
