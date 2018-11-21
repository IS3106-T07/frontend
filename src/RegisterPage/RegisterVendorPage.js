/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button/Button';
import { userActions } from '../_actions';
import { userService } from '../_services'
import {history} from '../_helpers';

class RegisterVendorPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: '',
        email: '',
        password: '',
        userType:'seller',
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.email && user.password) {
      userService.register(user);
    }
    history.push('/login');
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    return (
      <div className="container-fluid">
        <div
          style={{
            marginTop: 20
          }}
        >
        </div>
        <form name="form" onSubmit={this.handleSubmit}>


          <div className={`form-group${submitted && !user.email ? ' has-error' : ''}`}>
            <label htmlFor="email">Email</label>
            <input type="text" className="form-control" name="email" value={user.email}
                   onChange={this.handleChange}/>
            {submitted && !user.email
            && <div className="help-block">Email is required</div>
            }
          </div>
          <div className={`form-group${submitted && !user.password ? ' has-error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" value={user.password}
                   onChange={this.handleChange}/>
            {submitted && !user.password
            && <div className="help-block">Password is required</div>
            }
          </div>
          <div
            className="form-group"
            style={{
              textAlign: 'center',
            }}
          >
            <div>
              <Button
                variant="text"
                size="large"
                style={{
                  marginTop: 10,
                  fontSize: 25,
                  color: '#CB9D1B',
                }}
                onClick={(e) => {
                  this.handleSubmit(e)
                }}
              >
                Register
              </Button>
            </div>
            <div>
              {registering
              && <img alt="Loading Icon"
                      src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
              }
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
    registering,
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterVendorPage);
export { connectedRegisterPage as RegisterVendorPage };
