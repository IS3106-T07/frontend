import React from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import '../HomePage/css/HomePage.css';
import ProfilePage from '../ProfilePage/ProfilePage';
import { history } from '../_helpers';
import VendorMenuPage, { GET_VENDOR_DETAILS_SUCCESS } from './VendorMenu/VendorMenuPage';
import VendorOrdersPage from './VendorOrders/VendorOrdersPage';
import VendorHistoryPage from './VendorHistory/VendorHistoryPage';
import VendorTopBar from '../HomePage/components/VendorTopBar';
import VendorBottomBar from '../HomePage/components/VendorBottomBar';
import CanteenPage from '../StudentPages/CanteenPage';
import api from '../_api/vendors';
import ErrorDialog from '../_commons/ErrorDialog';
import StudentOrderPage from "../StudentPages/StudentOrderPage";
import CanteenStorePage from "../StudentPages/CanteenStorePage";

class VendorPages extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    api.getVendorDetails(JSON.parse(localStorage.getItem('user')).id)
      .then((response) => {
        dispatch({
          type: GET_VENDOR_DETAILS_SUCCESS,
          data: response.data,
        });
        localStorage.setItem('store', JSON.stringify(response.data));
      }).catch(error => ErrorDialog('retrieving vendor details', error));
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      >
        <VendorTopBar />

        <Router history={history}>
          <main style={{
            flex: 1,
            display: 'flex',
            overflow: 'scroll',
          }}
          >
            <Route
              exact
              path="/vendor/menu/:cId/:sId"
              component={StudentOrderPage}
            />
            <Route
              exact
              path="/vendor/store/:id"
              component={CanteenStorePage}
            />
            <Route exact path="/vendor/canteen" component={CanteenPage} />
            <Route exact path="/vendor/menu" component={VendorMenuPage} />
            <Route exact path="/vendor/vendorHistory" component={VendorHistoryPage} />
            <Route exact path="/vendor/vendorOrders" component={VendorOrdersPage} />
          </main>
        </Router>
        <VendorBottomBar />
      </div>
    );
  }
}

export default connect()(VendorPages);
