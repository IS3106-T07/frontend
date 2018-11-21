/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography/Typography';
import PureItemList from './components/PureViewItemList';
import config from 'config';
import Button from '@material-ui/core/Button/Button';


class UpdateItemPage extends Component {
  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(JSON.stringify(user, undefined, 2));
    this.state = {
      user: user,
      items:[],
      searchName: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChange(event) {
    const { value } = event.target;
    this.setState({
      searchName:value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { searchName } = this.state;
    if (searchName) {
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

      fetch(`${config.apiUrl}/webresources/customers/search`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:searchName})
      })
        .then(handleResponse)
        .then(
          items => {
            this.setState({
              items: items
            });
          }
        );
    }
    console.log(JSON.stringify(this.state.items, undefined, 2));
  }

  render() {


    const items = this.state.items.map(item => {
      if (item.status === 'active') {
        return (
          <PureItemList
            item={item}
            key={item.id}
          />
        );
      }
    });

    const {searchName} = this.state;

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

        <div className="container-fluid">
          <div
            style={{
              marginTop: 20
            }}
          >
          </div>
          <form name="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" name="searchName" value={searchName}
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
                    fontSize: 25,
                    color: '#CB9D1B',
                  }}
                  onClick={(e) => {
                    this.handleSubmit(e)
                  }}
                >
                  Search
                </Button>
              </div>

            </div>
          </form>
        </div>


      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect()(UpdateItemPage);
