/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button/Button';
import { userService } from '../_services'
import config from 'config';
import { handleCreateItemResponse } from '../_helpers/handleResponse';
import {history} from '../_helpers';

class CreateItem extends React.Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(JSON.stringify(user,undefined,2));
    this.state = {
      user: user,
      submitted: false,
      item:{
        sellerId: user.id,
        sellerEmail: user.email,
        name: '',
        price: '',
        status: 'active'
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { item } = this.state;
    this.setState({
      item: {
        ...item,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { item } = this.state;
    if (item.name && item.price) {
      fetch(`${config.apiUrl}/webresources/customers/item/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sellerId: this.state.user.id,
          sellerEmail: this.state.user.email,
          name: this.state.item.name,
          price: this.state.item.price,
          status: 'active'
        })
      })
        .then(handleCreateItemResponse);
      history.push('/homepage/seller');
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted, item } = this.state;
    return (
      <div className="container-fluid">
        <div
          style={{
            marginTop: 20
          }}
        >
        </div>
        <form name="form" onSubmit={this.handleSubmit}>


          <div className="form-group">
            <label htmlFor="name">Item Name</label>
            <input type="text" className="form-control" name="name" value={item.name}
                   onChange={this.handleChange}/>
          </div>

          <div className="form-group">
            <label htmlFor="price">Item Price</label>
            <input type="text" className="form-control" name="price" value={item.price}
                   onChange={this.handleChange}/>
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
                Create Item
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


const connectedRegisterPage = connect()(CreateItem);
export { connectedRegisterPage as CreateItem };
