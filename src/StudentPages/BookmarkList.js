import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import RemoveIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { compose } from 'redux';
import connect from 'react-redux/es/connect/connect';
import BookmarkStores from './BookmarkStores';
import { REMOVE_BOOKMARK } from '../_reducers/userProfile.reducer';
import { history } from '../_helpers';

const styles = theme => ({
  root: {
    width: 365,
    backgroundColor: theme.palette.background.paper,
  },
});

class BookmarkList extends React.Component {
  removeBookmark = (e, id) => {
    const { dispatch, bookmark } = this.props;
    e.stopPropagation();
    dispatch({
      type: REMOVE_BOOKMARK,
      bookmark: bookmark.filter(b => b.id !== id),
    });
  };

  render() {
    const { classes, bookmark } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          {bookmark.map((b, index) => (
            <ListItem
              key={b.id}
              onClick={() => history.push(`/homepage/menu/${b.canteen}/${b.id}`)
              }
            >
              <BookmarkStores key={b.id} store={b} />
              <IconButton
                key={index}
                className={classes.button}
                aria-label="Delete"
                onClick={e => this.removeBookmark(e, b.id)}
              >
                <RemoveIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bookmark: state.userProfile.bookmark,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withStyles(styles),
)(BookmarkList);
