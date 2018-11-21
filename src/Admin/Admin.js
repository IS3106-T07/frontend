/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography/Typography';

import CustomerList from './components/CustomerList';
import config from 'config';


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {

    const handleResponse = (response) => {
      return response.text()
        .then(text => {
          if (!response.ok) {
            console.log('OK OK');
            if (response.status === 401) {
              logout();
              location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }

          const data = JSON.parse(text);
          return data;
        });
    };

    const requestOptions = {
      method: 'GET',
    };

    fetch(`${config.apiUrl}/webresources/customers`, requestOptions)
      .then(handleResponse)
      .then(
        users => {
          this.setState({
            users: users
          });
        }
      );
  }

  render() {
    console.log(JSON.stringify(this.state.users, undefined, 2));

    const customers = this.state.users.map(user => {

      if (user.email === 'admin') {
        console.log(user.email);
      } else {
        return (
          <CustomerList
            user={user}
            key={user.id}
          />
        );
      }
    });

    return (
      <div>
        <Typography
          variant="h3"
          style={{
            color: 'gray',
            marginTop: 20,
            marginLeft: '4vw',
          }}
        >Admin
        </Typography>
        <div style={{marginBottom:20}}>
          {customers}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect()(Admin);
