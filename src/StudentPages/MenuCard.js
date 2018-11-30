/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Add from "@material-ui/icons/Add";

import Remove from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button/Button";
import { compose } from "redux";
import connect from "react-redux/es/connect/connect";
import { history } from "../_helpers";
import { GET_USER_ORDERS_SUCCESS } from "../_reducers/userProfile.reducer";
import customerApi from "../_api/customers";
import ErrorDialog from "../_commons/ErrorDialog";
import SuccessDialog from "../_commons/SuccessDialog";

const styles = () => ({
  card: {
    width: "100%",
    marginTop: 10,
    marginBottom: 20
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex",
    height: 25
  },
  content: {
    paddingTop: 0,
    textAlign: "justify",
    align: "center"
  }
});

class MenuCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
  }

  handleOnClick = dish => {
    const { quantity } = this.state;
    const req = {
      customerId: parseFloat(JSON.parse(localStorage.getItem("user")).id),
      dishId: dish.id,
      quantity
    };
    customerApi
      .addItemToCart(req)
      .then(() => {
        SuccessDialog("Add Item To Cart Successfully", "Item", "added to cart");
        history.push("/homepage/cart");
        this.getOrder();
      })
      .catch(error => ErrorDialog("adding item to cart", error));
  };

  getOrder = () => {
    const { dispatch } = this.props;
    customerApi.orders().then(response => {
      dispatch({
        type: GET_USER_ORDERS_SUCCESS,
        orders: response.data.filter(
          o => o.customerOrderType.name !== "IN BASKET"
        ),
        cart: response.data.filter(
          o => o.customerOrderType.name === "IN BASKET"
        )
      });
    });
  };

  render() {
    const { classes, dish, currentStore } = this.props;
    const { userType } = JSON.parse(localStorage.getItem("user"));
    const { quantity } = this.state;
    const adjustQuantity = value => {
      this.setState({
        quantity: Math.max(1, quantity + value)
      });
    };
    return (
      <div>
        <Card
          className={classes.card}
          key={dish.id}
          style={{
            position: "relative"
          }}
        >
          {!currentStore.receivingOrders && (
            <div
              style={{
                padding: 10,
                paddingLeft: 25,
                paddingRight: 25,
                position: "absolute",
                backgroundColor: "#D32F2F",
                borderRadius: 5,
                top: 0,
                right: 0
              }}
            >
              <Typography
                variant="h4"
                style={{
                  color: "white"
                }}
              >
                CLOSED
              </Typography>
            </div>
          )}
          <CardMedia
            className={classes.media}
            image="../../../img/ytf.png"
            title={dish.name}
          />
          <CardContent className={classes.content}>
            <Typography
              component="p"
              variant="h3"
              align="left"
              style={{
                paddingTop: "1vh",
                textAlign: "center",
                height: "3vh",
                width: "55vw",
                fontSize: 15,
                display: "inline-block"
              }}
            >
              {dish.name}
            </Typography>
            <Typography
              component="p"
              variant="h3"
              align="right"
              style={{
                paddingTop: "1vh",
                textAlign: "center",
                height: "3vh",
                fontSize: 15,
                display: "inline-block"
              }}
            >
              {Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "SGD"
              }).format(dish.price)}
            </Typography>
            {currentStore.receivingOrders && userType !== "VENDOR" && (
              <CardActions
                className={classes.actions}
                disableActionSpacing
                style={{
                  display: "inline-block",
                  verticalAlign: "baseline"
                }}
              >
                <IconButton
                  aria-label="Add quantity"
                  onClick={() => adjustQuantity(1)}
                >
                  <Add className={classes.icon} />
                </IconButton>
                <Typography
                  component="p"
                  variant="h3"
                  style={{
                    fontSize: 15,
                    display: "inline-block"
                  }}
                >
                  {quantity}
                </Typography>
                <IconButton
                  aria-label="Minus quantity"
                  onClick={() => adjustQuantity(-1)}
                >
                  <Remove className={classes.icon} />
                </IconButton>
                <Button
                  variant="outlined"
                  size="medium"
                  // component={Link}
                  style={{
                    borderColor: "#DAA520",
                    backgroundColor: "floralWhite",
                    textTransform: "none",
                    textDecoration: "none",
                    justifyItems: "center",
                    alignItems: "center"
                  }}
                  onClick={() => this.handleOnClick(dish)}
                >
                  <Typography
                    style={{
                      fontSize: 15,
                      color: "#DAA520"
                    }}
                  >
                    Add To Cart
                  </Typography>
                </Button>
              </CardActions>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  canteens: state.canteens.canteens
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(MenuCard);
