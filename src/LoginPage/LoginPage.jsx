/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  userActions,
  canteenActions
} from '../_actions';

import './login.css';
import Button from '@material-ui/core/Button/Button';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    console.log(`**********************\nconstructor`);


    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      email: '',
      password: '',
      submitted: false,
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    console.log(`**********\nsubmit clicked`)
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(userActions.login(email, password));
      dispatch(canteenActions.getAllCanteens());
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { email, password, submitted } = this.state;
    return ( // TODO: resize the logo
      <div className="col-md-6 col-md-offset-3" align="center">

        {/* <p>Welcome To Qoodie</p> */}
        <img
          alt="Qoodie"
          src="../../img/logo_background.png"
          style={{
            width: '100%',
          }}
        />

        <form name="form" onSubmit={this.handleSubmit}>
          <div className={`form-group${submitted && !email ? ' has-error' : ''}`}>
            <label htmlFor="email">Username</label>
            <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
            {submitted && !email
                            && <div className="help-block">Email is required</div>
                        }
          </div>
          <div className={`form-group${submitted && !password ? ' has-error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
            {submitted && !password
                            && <div className="help-block">Password is required</div>
                        }
          </div>
          <div className="form-group">
            <Button
              variant="text"
              size="large"
              component={Link}
              style={{
                fontSize: 25,
                color: '#CB9D1B',
                width: 150,
                marginBottom: 20,
              }}
              onClick={this.handleSubmit}
              to={{
                pathname: '../login',
              }}
            >
              Login
            </Button>
            {loggingIn
            && <img alt="Loading Icon" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />}
          </div>
          <div>
            <div
              to="/register"
              style={{
                fontSize: 20,
                color: '#CB9D1B',
              }}
            >Don't have an account?
            </div>
            <Link
              to="/userType"
              style={{
                fontSize: 20,
                color: '#CB9D1B',
              }}
              className="btn btn-link"
            >Sign up
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn,
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
