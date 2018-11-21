/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography/Typography';
import PureViewItemList from './components/PureViewItemList';
import config from 'config';


class OrderHistoryPage extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(JSON.stringify(user, undefined, 2));
    this.state = {
      user: user,
      items:[]
    }
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

    fetch(`${config.apiUrl}/webresources/customers/items`, {method:'GET'})
      .then(handleResponse)
      .then(
        items => {
          this.setState({
            items: items
          });
        }
      );
  }

  render() {
    console.log(JSON.stringify(this.state.user, undefined, 2));
    console.log(JSON.stringify(this.state.items, undefined, 2));

    const items = this.state.items.map(item => {
      if (item.status === 'sold' && item.buyerEmail === this.state.user.email) {
        return (
          <PureViewItemList
            item={item}
            key={item.id}
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
        >{this.state.user.email}
        </Typography>

        <div style={{marginBottom:20}}>
          {items}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect()(OrderHistoryPage);
