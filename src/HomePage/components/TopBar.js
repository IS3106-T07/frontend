import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ProfileIcon from './ProfileIcon';

const styles = {
  appBar: {
    backgroundColor: '#CB9D1B',
    position: 'relative',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize:20
  },
  profile: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function TopBar(props) {
  const { classes } = props;
  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.title}>
            Assignment 2
          </div>
          <div className={classes.profile}>
            <ProfileIcon />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(TopBar);
