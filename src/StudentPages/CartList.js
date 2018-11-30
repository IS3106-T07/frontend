/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FoodItem from "./components/FoodItem";
import OrderConfirmationDialog from "./components/OrderConfirmationPage";
import TotalAmount from "./components/TotalAmount";

const styles = theme => ({
  root: {
    width: "100vw",
    paddingTop: 5
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "100%"
  }
});

function CartList(props) {
  const { classes, data, orderId } = props;
  if (!data) return null;
  const { orderDishes } = data;
  const canteens = {};
  orderDishes.map(od => {
    const canteen =
      canteens[`${od.dish.store.canteen.id}||${od.dish.store.id}`];
    if (canteen === undefined)
      canteens[`${od.dish.store.canteen.id}||${od.dish.store.id}`] = {
        orderDishes: []
      };
    canteens[
      `${od.dish.store.canteen.id}||${od.dish.store.id}`
    ].orderDishes.push(od);
    canteens[`${od.dish.store.canteen.id}||${od.dish.store.id}`].canteenName =
      od.dish.store.canteen.name;
    canteens[`${od.dish.store.canteen.id}||${od.dish.store.id}`].storeName =
      od.dish.store.name;
    return true;
  });
  console.log("CANTEENS");
  console.table(canteens);
  const total = orderDishes
    .map(od => od.dish.price * od.amount)
    .reduce((a, b) => a + b, 0);
  const orderPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "SGD"
  }).format(total);

  return (
    <div className={classes.root}>
      <div>
        {Object.keys(canteens)
          .sort()
          .map((k, index) => {
            const storeNameLength = 15;
            const canteenNameLength = 10;
            const { canteenName, storeName, orderDishes: ods } = canteens[k];
            const trimmedCanteenName =
              canteenName.length > canteenNameLength
                ? `${canteenName.substring(0, canteenNameLength - 3)}..`
                : canteenName;
            const trimmedDishName =
              storeName.length > storeNameLength
                ? `${storeName.substring(0, storeNameLength - 3)}..`
                : storeName;
            const t = ods
              .map(od => od.dish.price * od.amount)
              .reduce((a, b) => a + b, 0);
            const oPrice = new Intl.NumberFormat("en-GB", {
              style: "currency",
              currency: "SGD"
            }).format(t);
            return (
              <ExpansionPanel key={canteens[k].id}>
                <ExpansionPanelSummary
                  key={canteens[k].id}
                  className={classes.heading}
                  expandIcon={<ExpandMoreIcon key={canteens[k].id} />}
                >
                  <div className="col-xs-4">
                    <Typography
                      align="left"
                      key={canteens[k].id}
                      style={{
                        width: "20vw",
                        textAlign: "left",
                        fontSize: 15
                      }}
                    >
                      {trimmedCanteenName || "canteenName"}:
                    </Typography>
                  </div>
                  <div className="col-xs-6">
                    <Typography
                      align="left"
                      key={canteens[k].id}
                      style={{
                        width: "40vw",
                        fontSize: 15
                      }}
                    >
                      {trimmedDishName || "storeName"}
                    </Typography>
                  </div>
                  {/* <div className="col-xs-1">
                    <Typography
                      align="left"
                      key={canteens[k].id}
                      style={{
                        fontSize: 15
                      }}
                    >
                      {oPrice}
                    </Typography>
                  </div> */}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails key={canteens[k].id}>
                  {/* <div className={classes.wrapper}> */}
                  {/* <OrderItems data={data}/> */}
                  {/* <TotalAmount total={total} /> */}
                  {/* <div className="col-xs-5"></div> */}
                  {/* <div className="col-xs-7"> */}
                  {/* <OrderConfirmationDialog total={total} orderId={orderId} data={data}/> */}
                  {/* </div> */}
                  {/* </div> */}
                  <div key={canteens[k].id}>
                    {ods.map((orderDish, index) => (
                      <FoodItem
                        key={orderDish.id}
                        data={orderDish}
                        orderId={orderId}
                      />
                    ))}
                    <TotalAmount key={canteens[k].id} dish={data} total={t} />
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
      </div>
      <div>
        <div
          className="col-xs-8"
          style={{
            marginTop: 15
          }}
        >
          <div className="col-xs-3">
            <Typography variant="h4" align="center">
              Total:&nbsp;
            </Typography>
          </div>
          <div className="col-xs-9">
            <Typography variant="h4" align="center">
              {orderPrice}
            </Typography>
          </div>
        </div>
        <OrderConfirmationDialog total={total} orderId={orderId} data={data} />
      </div>
    </div>
  );
}

export default withStyles(styles)(CartList);
