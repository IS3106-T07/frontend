import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Home from '@material-ui/icons/Home';
import Bookmark from '@material-ui/icons/Bookmark';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Assignment from '@material-ui/icons/Assignment';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';
import Badge from '@material-ui/core/Badge/Badge';
import { history } from '../../_helpers/history';

const styles = {
  root: {
    width: '100%',
    backgroundColor: '#DAA520',
    height: 58,
    padding: 3,
    overflow: 'hidden',
  },
  icon: {
    fontSize: 25,
    // position: 'absolute',
    // top: 2,
  },
  selected: {
    color: 'White !important',
    // position: 'relative',
  },
  label: {
    // position: 'absolute',
    // bottom: 0,
    fontSize: '12px !important',
  },
};

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: -1,
    };
  }

  componentWillMount() {
    const { page } = this.props;
    this.setState({
      value: page,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { page } = nextProps;
    this.setState({
      value: page,
    });
  }

  getCartItems = () => {
    const { cart } = this.props;
    const canteens = {};
    cart.map((c) => {
      const { orderDishes } = c;
      orderDishes.map((od) => {
        const canteen = canteens[`${od.dish.store.canteen.id}||${od.dish.store.id}`];
        if (canteen === undefined) {
          canteens[`${od.dish.store.canteen.id}||${od.dish.store.id}`] = {
            orderDishes: [],
          };
        }
        canteens[
          `${od.dish.store.canteen.id}||${od.dish.store.id}`
        ].orderDishes.push(od);
        canteens[
          `${od.dish.store.canteen.id}||${od.dish.store.id}`
        ].canteenName = od.dish.store.canteen.name;
        canteens[`${od.dish.store.canteen.id}||${od.dish.store.id}`].storeName = od.dish.store.name;
        return true;
      });
      return true;
    });
    return Object.keys(canteens);
  };

  render() {
    const {
      classes, bookmark, orders, cart,
    } = this.props;
    const { value } = this.state;
    const cartItems = this.getCartItems();
    const handleChange = (event, val) => {
      this.setState({ value: val });
    };

    return (
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.root}
      >
        <BottomNavigationAction
          label="Canteen"
          classes={{
            selected: classes.selected,
            label: classes.label,
          }}
          onClick={() => {
            history.push('/homepage/canteen');
          }}
          icon={<Home className={classes.icon} />}
        />
        <BottomNavigationAction
          label="Bookmark"
          classes={{
            selected: classes.selected,
            label: classes.label,
          }}
          onClick={() => {
            history.push('/homepage/bookmark');
          }}
          icon={(
            <Badge className={classes.margin} badgeContent={bookmark.length} color="secondary" invisible={bookmark.length === 0}>
              <Bookmark className={classes.icon} />
            </Badge>
          )}
        />
        <BottomNavigationAction
          label="Cart"
          classes={{
            selected: classes.selected,
            label: classes.label,
          }}
          onClick={() => {
            history.push('/homepage/cart');
          }}
          icon={(
            <Badge className={classes.margin} badgeContent={cartItems.length} color="secondary" invisible={cartItems.length === 0}>
              <ShoppingCart className={classes.icon} />
            </Badge>
          )}
        />

        <BottomNavigationAction
          label="Orders"
          classes={{
            selected: classes.selected,
            label: classes.label,
          }}
          onClick={() => {
            history.push('/homepage/trackOrder');
          }}
          icon={(
            <Badge className={classes.margin} badgeContent={orders.length} color="secondary" invisible={orders.length === 0}>
              <Assignment className={classes.icon} />
            </Badge>
          )}
        />
      </BottomNavigation>
    );
  }
}

const mapStateToProps = state => ({
  page: state.currentPage.page,
  bookmark: state.userProfile.bookmark,
  orders: state.userProfile.orders,
  cart: state.userProfile.cart,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(BottomBar);
