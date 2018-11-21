import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PureViewItem from './PureViewItem';


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

function PureViewItemList(props) {
  const { classes, item, key } = props;
  if(!item) {
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
            Item: {item.name}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <PureViewItem
            item={item}
            key={item.id}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

PureViewItemList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PureViewItemList);
