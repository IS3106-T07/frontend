/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography/Typography';
import config from 'config';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button/Button';
import SellerItemList from './components/SellerItemList'


class SellerPage extends Component {
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
      if (item.sellerEmail === this.state.user.email) {
        return (
          <SellerItemList
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



        <div className="col-md-6 col-md-offset-3" align="center">
          <div style={{
            marginTop: 30,
          }}>
            <Button
              variant="outlined"
              size="medium"
              component={Link}
              style={{
                borderColor: '#CB9D1B',
                width: 175,
                height: 80,
                textTransform: 'none',
                backgroundColor: 'floralWhite',
                marginRight: 5,
              }}
              onClick={() => {}}
              to={{
                pathname: '/homepage/createitem',
              }}
            >
              <Typography
                variant="h4"
                style={{
                  color: '#CB9D1B',
                }}
              >Create Item
              </Typography>
            </Button>
            <Button
              variant="outlined"
              size="medium"
              component={Link}
              style={{
                borderColor: '#CB9D1B',
                width: 175,
                height: 80,
                textTransform: 'none',
                backgroundColor: 'floralWhite',
                marginLeft: 5,
              }}
              onClick={() => {}}
              to={{
                pathname: '/homepage/search',
              }}
            >
              <Typography
                variant="h4"
                style={{
                  color: '#CB9D1B',
                }}
              >Search Items
              </Typography>
            </Button>
          </div>
        </div>



        <div style={{marginBottom:20}}>
          { items }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect()(SellerPage);
