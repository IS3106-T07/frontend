import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import VendorSwitch from "./VendorSwitch";

const styles = {
  appBar: {
    backgroundColor: "#DAA520",
    position: "relative",
    marginTop: "-1.2vw",
    height: 50
  },
  logo: {
    width: "100%",
    textAlign: "left"
  },
  profile: {
    position: "absolute",
    top: 0,
    right: 0
  },
  title: {
    position: "absolute",
    width: "calc(100% - 38px)",
    textAlign: "center"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function TopBar(props) {
  const { classes } = props;
  const titleValue = "Vendor";
  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.logo}>
            <img
              alt="Qoodie"
              className="logo"
              src="../../../img/grey2.png"
              style={{
                padding: 4,
                height: 38
              }}
            />
          </div>
          <div className={classes.title}>
            <Typography variant="h3" style={{ color: "white" }}>
              {`${titleValue}`}
            </Typography>
          </div>
          <div className={classes.switch}>
            <VendorSwitch />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(TopBar);
