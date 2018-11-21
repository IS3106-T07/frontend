import React from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import './css/HomePage.css';
import ProfilePage from '../ProfilePage/ProfilePage';
import { history } from '../_helpers';
import StudentOrderPage from '../StudentPages/StudenOrderPage';
import {CreateItem} from '../SellerPage/CreateItem';
import SellerPage from '../SellerPage/SellerPage';
import CartPage from '../BuyerPage/CartPage';
import OrderHistory from '../BuyerPage/OrderHistoryPage'
import SearchPage from '../BuyerPage/SearchPage'





import Admin from '../Admin/Admin';
import BuyerPage from '../BuyerPage/BuyerPage'

const HomePage = (props) => {
  const { classes } = props;
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <TopBar />

      <Router history={history}>
        <main style={{
          flexGrow: 1,
          display: 'flex',
          overflow: 'scroll',
        }}
        >
          <Route exact path="/homepage/profile" component={ProfilePage} />
          <Route exact path="/homepage/menu" component={StudentOrderPage} />
          <Route exact path="/homepage/admin" component={Admin}/>
          <Route exact path="/homepage/buyer" component={BuyerPage}/>
          <Route exact path="/homepage/createitem" component={CreateItem}/>
          <Route exact path="/homepage/seller" component={SellerPage}/>
          <Route exact path="/homepage/cart" component={CartPage}/>
          <Route exact path="/homepage/orderhistory" component={OrderHistory}/>
          <Route exact path="/homepage/search" component={SearchPage}/>



        </main>

      </Router>


    </div>
  );
};

export default connect()(HomePage);
