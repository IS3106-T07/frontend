/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography/Typography";
import Divider from "@material-ui/core/Divider/Divider";
import Button from "@material-ui/core/Button/Button";
import TotalAmount from "./TotalAmount";
import OrderItems from "./OrderItems";
import CollectionStore from "./CollectionStore";
import customerApi from "../../_api/customers";
import ErrorDialog from "../../_commons/ErrorDialog";
import SuccessDialog from "../../_commons/SuccessDialog";

const styles = {
  wrapper: {}
};

function OrderDetails(props) {
  const { classes, order } = props;

  const handleSetCollected = id => {
    customerApi
      .setCollected(id)
      .then(() => {
        SuccessDialog("Collected Order Successfully", "Order", "collected");
      })
      .catch(error => ErrorDialog("collecting order", error));
  };

  const dishes = order.orderDishes.map(dish => (
    <div
      style={{
        width: "100%",
        paddingTop: 10,
        paddingBottom: 10
      }}
    >
      {}
      <Divider />
      <div
        style={{
          paddingTop: 10,
          overflow: "hidden",
          width: "100%"
        }}
      >
        <Typography
          variant="h5"
          style={{
            color: "#CB9D1B",
            fontSize: 20
          }}
        >
          {dish.dish.store.canteen.name}: {dish.dish.store.name}
        </Typography>
      </div>
      <div
        style={{
          paddingTop: 10,
          overflow: "hidden",
          width: "100%"
        }}
      >
        <Typography
          variant="h5"
          style={{
            color: "#CB9D1B",
            fontSize: 15,
            paddingBottom: 10
          }}
        >
          {dish.dish.name}
        </Typography>
      </div>
      <div
        style={{
          overflow: "hidden"
        }}
      >
        <OrderItems dish={dish} />
      </div>
    </div>
  ));
  const total = order.orderDishes
    .map(o => o.amount * o.dish.price)
    .reduce((a, b) => a + b, 0);
  return (
    <div className={classes.wrapper}>
      <div
        style={{
          overflow: "hidden",
          width: "100%"
        }}
      >
        {/* <CollectionStore order={order} /> */}
        <div className="col-xs-1" />
        <div className="col-xs-11">{dishes}</div>
        <div>
          <TotalAmount total={total} />
        </div>
      </div>
      {order.customerOrderType.name === "READY" && (
        <div
          style={{
            marginTop: 20,
            textAlign: "center"
          }}
        >
          <Button
            variant="contained"
            style={{
              backgroundColor: "#DAA520",
              width: "80%",
              padding: 10,
              boxSizing: "border-box"
            }}
            onClick={() => handleSetCollected(order.id)}
          >
            <Typography
              style={{
                color: "white",
                fontSize: 15
              }}
            >
              Collected
            </Typography>
          </Button>
        </div>
      )}
    </div>
  );
}

export default withStyles(styles)(OrderDetails);
