/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import Typography from "@material-ui/core/Typography/Typography";
import CartList from "./CartList";
import { SET_CURRENT_PAGE } from "../App";

class CartPage extends Component {
  componentWillMount() {
    // const { getCart } = cartService;
    // const cartItems = getCart().then(
    //   items => this.setState({
    //     cartItems: items,
    //   }),
    // );
    const { dispatch } = this.props;
    dispatch({
      type: SET_CURRENT_PAGE,
      page: 2
    });
  }

  render() {
    const { cart } = this.props;
    console.log("CART");
    console.table(cart);

    return (
      <div>
        <Typography
          variant="h3"
          style={{
            color: "gray",
            marginTop: 20,
            marginLeft: "4vw"
          }}
        >
          {" "}
          Cart
        </Typography>
        {cart.length === 0 ? (
          <Typography
            variant="h4"
            align="center"
            style={{
              color: "gray",
              width: "100vw",
              textAlign: "center",
              lineHeight: "50vh",
              verticalAlign: "middle"
            }}
          >
            Seems a little empty around here
          </Typography>
        ) : (
          ""
        )}
        {cart.length > 0 &&
          cart.map(item => (
            <CartList
              key={item.id}
              data={item}
              total={item.price}
              orderId={item.id}
            />
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.userProfile.cart
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartPage);
