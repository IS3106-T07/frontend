/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import connect from "react-redux/es/connect/connect";
import SuccessDialog from "../../_commons/SuccessDialog";
import ErrorDialog from "../../_commons/ErrorDialog";
import vendorApi from "../../_api/vendors";
import { withStyles } from "@material-ui/core/styles";

import { GET_VENDOR_DETAILS_SUCCESS } from "../../VendorPages/VendorMenu/VendorMenuPage";

const styles = theme => ({
  colorSwitchBase: {
    color: "red",
    "&$colorChecked": {
      color: "red",
      "& + $colorBar": {
        backgroundColor: "red"
      }
    }
  },
  colorBar: {},
  colorChecked: {},
  iOSSwitchBase: {
    "&$iOSChecked": {
      color: theme.palette.common.white,
      "& + $iOSBar": {
        backgroundColor: "#52d869"
      }
    },
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp
    })
  },
  iOSChecked: {
    transform: "translateX(15px)",
    "& + $iOSBar": {
      opacity: 1,
      border: "none"
    }
  },
  iOSBar: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: "solid 1px",
    borderColor: "#ff3b30",
    backgroundColor: "#ff3b30",
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"])
  },
  iOSIcon: {
    width: 24,
    height: 24
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1]
  }
});

class VendorSwitch extends React.Component {
  handleChange = () =>
    vendorApi
      .toggleStatus()
      .then(() => {
        const { dispatch } = this.props;
        vendorApi
          .getVendorDetails(JSON.parse(localStorage.getItem("user")).id)
          .then(response => {
            dispatch({
              type: GET_VENDOR_DETAILS_SUCCESS,
              data: response.data
            });
            localStorage.setItem("store", JSON.stringify(response.data));
            SuccessDialog("Changed Status Successfully", "Status", "changed");
          })
          .catch(error => ErrorDialog("retrieving vendor details", error));
      })
      .catch(error => ErrorDialog("changing status", error));

  render() {
    const { vendorDetails, classes } = this.props;
    const checked = vendorDetails.receivingOrders;
    const status = (
      <div style={{ paddingTop: 1, color: "white", fontSize: 14 }}>
        {checked ? "Open" : "Closed"}
      </div>
    );
    return (
      <div className={classes.root}>
        <FormGroup style={{ paddingTop: 5 }} row>
          <FormControl component="fieldset">
            <FormControlLabel
              control={
                <Switch
                  checked={!!checked}
                  onChange={this.handleChange}
                  classes={{
                    switchBase: classes.iOSSwitchBase,
                    bar: classes.iOSBar,
                    icon: classes.iOSIcon,
                    iconChecked: classes.iOSIconChecked,
                    checked: classes.iOSChecked
                  }}
                  disableRipple
                />
              }
              labelPlacement="start"
              label={status}
            />
          </FormControl>
        </FormGroup>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vendorDetails: state.userProfile.vendorDetails
});

export default connect(mapStateToProps)(withStyles(styles)(VendorSwitch));
