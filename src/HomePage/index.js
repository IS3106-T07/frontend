import React from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import './css/HomePage.css';
import ProfilePage from '../ProfilePage/ProfilePage';
import { history } from '../_helpers';
import CanteenPage from '../StudentPages/CanteenPage';
import StudentOrderPage from '../StudentPages/StudentOrderPage';
import CanteenStorePage from '../StudentPages/CanteenStorePage';
import CartPage from '../StudentPages/CartPage';
import TrackOrderPage from '../StudentPages/TrackOrderPage';
import BookmarkPage from '../StudentPages/BookmarkPage';
import customerApi from '../_api/customers';
import ErrorDialog from '../_commons/ErrorDialog';
import { GET_USER_ORDERS_SUCCESS } from '../_reducers/userProfile.reducer';
import { canteenActions } from '../_actions';

class HomePage extends React.Component {
  componentWillMount() {
    this.getOrders();
    setInterval(this.getOrders, 3000);
  }

  getOrders = () => {
    const { dispatch } = this.props;
    dispatch(canteenActions.getAllCanteens());
    customerApi
      .orders()
      .then((response) => {
        dispatch({
          type: GET_USER_ORDERS_SUCCESS,
          orders: response.data.filter(
            o => o.customerOrderType.name !== 'IN BASKET',
          ),
          cart: response.data.filter(
            o => o.customerOrderType.name === 'IN BASKET',
          ),
        });
      })
      .catch(error => ErrorDialog('retrieving orders', error));
  };

  render() {
    const { classes } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100vw',
          height: '100vh',
        }}
      >
        <TopBar />
        <Router history={history}>
          <main
            style={{
              flex: 1,
              display: 'flex',
              overflow: 'scroll',
            }}
          >
            <Route exact path="/homepage/profile" component={ProfilePage} />
            <Route exact path="/homepage/canteen" component={CanteenPage} />
            <Route
              exact
              path="/homepage/menu/:cId/:sId"
              component={StudentOrderPage}
            />
            <Route
              exact
              path="/homepage/store/:id"
              component={CanteenStorePage}
            />
            <Route exact path="/homepage/cart" component={CartPage} />
            <Route
              exact
              path="/homepage/trackOrder"
              component={TrackOrderPage}
            />
            <Route exact path="/homepage/bookmark" component={BookmarkPage} />
          </main>
        </Router>

        <BottomBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
