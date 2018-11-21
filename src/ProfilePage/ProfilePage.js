/* eslint-disable react/jsx-one-expression-per-line */
import * as React from 'react';
import connect from 'react-redux/es/connect/connect';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import Typography from '@material-ui/core/Typography/Typography';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import Link from 'react-router-dom/es/Link';
import { SET_CURRENT_PAGE } from '../App/index';
import { handleUpdateResponse } from '../_helpers/handleResponse';
import config from 'config';

export const UPDATE_PROFILE_DETAILS = 'UPDATE_PROFILE_DETAILS';
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(JSON.stringify(user, undefined, 2));
    this.state = {
      user: user,
    }
  }


  componentWillMount() {
    const { userProfile, dispatch } = this.props;
    this.setState({
      matric: userProfile.matric,
      cardDetail: userProfile.cardDetail,
    }, () => dispatch({
      type: SET_CURRENT_PAGE,
      page: 'profilePage',
    }));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: SET_CURRENT_PAGE,
      page: 0,
    });
  }

  render() {
    const { classes, dispatch } = this.props;

    const { matric, cardDetail } = this.state;

    const updateField = (e) => {
      this.setState({
        user: {
          ...this.state.user,
          password: e.target.value
        }
      });

    };


    return (
      <div className={classes.container}>
        <div style={{marginTop:20}}>
          <Typography
            variant="h3"
            component="h3"
            style={{
              marginTop: 10,
            }}
          >
            {this.state.user.email}
          </Typography>
        </div>
        <div style={{
          marginTop: '10%',
        }}
        >
          <Grid container spacing={0} className={classes.grid}>
            <Grid item xs={6}>
              Password
            </Grid>
            <Grid item xs={6}>
              <TextField
                // value={cardDetail}
                value={this.state.user.password}
                onChange={updateField}
                name="password"
                onBlur={updateField}
                InputProps={{
                  style: {
                    fontSize: 16,
                  },
                }}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.item}>
          <Grid
            container
            spacing={0}
            style={{
              marginTop: '8%',
            }}
          >
            <Grid
              item
              xs={12}
              style={{
                marginBottom: 20,
              }}
            >
              <Button
                variant="contained"
                size="large"
                style={{
                  fontSize: 25,
                  backgroundColor: '#CB9D1B',
                  width: 150,
                  color: 'floralWhite',
                }}
                onClick={() => {
                  localStorage.clear();
                  localStorage.setItem('user', JSON.stringify(this.state.user));
                  console.log(`updated user: \n${JSON.stringify(this.state.user, undefined, 2)}`);
                  fetch(`${config.apiUrl}/webresources/customers/update`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email: this.state.user.email, password: this.state.user.password})
                  })
                    .then(handleUpdateResponse);

                  history.back()
                }}
              >
                Update
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginBottom: 20,
              }}
            >
              <Button
                variant="contained"
                size="large"
                component={Link}
                style={{
                  fontSize: 25,
                  color: '#CB9D1B',
                  border: '2px solid',
                  borderColor: '#CB9D1B',
                  backgroundColor: 'floralWhite',
                  width: 150,
                }}
                onClick={() => {
                  localStorage.clear();
                }}
                to={{
                  pathname: '../login',
                }}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  item: {
    flexGrow: '1',
  },
  grid: {
    textAlign: 'left',
    width: '80vw',
    display: 'inline-flex',
    fontSize: 16,
  },
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
});

export default compose(withStyles(styles), connect(mapStateToProps))(ProfilePage);
