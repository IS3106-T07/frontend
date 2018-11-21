import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomerItem from './CustomerItem';


const styles = theme => ({
  root: {
    width: 375,
    paddingTop: 5,

  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,

  },
});

function CustomerList(props) {
  const { classes, user, key } = props;
  if(!user) {
    return (
      <div></div>
    )
  }


  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          className={classes.heading}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography
            style={{
              fontSize: 20,
            }}
          >
            User: {user.email}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <CustomerItem
            user={user}
            key={user.id}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

CustomerList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomerList);
