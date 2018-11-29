/* eslint-disable react/jsx-one-expression-per-line */
import * as React from 'react';
import connect from 'react-redux/es/connect/connect';
import Typography from '@material-ui/core/Typography/Typography';
import withStyles from '@material-ui/core/es/styles/withStyles';
import { compose } from 'redux';
import MenuCard from './MenuCard';
import { canteenActions } from '../_actions';
import { SET_CURRENT_PAGE } from '../App';

class StudentOrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: {},
    };
  }

  componentWillMount() {
    const { canteens, dispatch } = this.props;
    if (canteens === undefined) {
      dispatch(canteenActions.getAllCanteens());
    }
    const { userType } = JSON.parse(localStorage.getItem('user'));
    dispatch({
      type: SET_CURRENT_PAGE,
      page: userType === 'VENDOR' ? 1 : 0,
    });
    this.getMenu(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getMenu(nextProps);
  }

  getMenu(nextProps) {
    const { canteens } = nextProps;
    const { cId, sId } = this.props.match.params;
    if (cId !== undefined && sId !== undefined) {
      const filterElement = canteens === undefined
        ? {}
        : canteens.filter(c => c.id === parseFloat(cId))[0];
      const store = filterElement.stores === undefined
        ? {}
        : filterElement.stores.filter(s => s.id === parseFloat(sId))[0];
      this.setState({
        store: store.dishes === undefined ? {} : store,
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { store } = this.state;
    return (
      <div>
        <Typography
          variant="h3"
          style={{
            color: 'gray',
            marginTop: 20,
            marginLeft: '4vw',
            marginBottom: 0,
          }}
        >
          Menu
        </Typography>
        <div className={classes.menuWrapper}>
          {store.dishes !== undefined
            && store.dishes.map((d, index) => (
              <div
                className="col-xs-12 col-md-6"
                style={{
                  paddingLeft: 5,
                  paddingRight: 5,
                }}
              >
                <MenuCard dish={d} currentStore={store} key={index} />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const style = {
  menuWrapper: {
    padding: '0 15px 15px 15px',
    width: '100%',
  },
};

const mapStateToProps = state => ({
  canteens: state.canteens.canteens,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default compose(
  withStyles(style),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(StudentOrderPage);
