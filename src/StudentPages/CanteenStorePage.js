/* eslint-disable react/jsx-one-expression-per-line */
import * as React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography/Typography';
import { compose } from 'redux';
import withStyles from '@material-ui/core/es/styles/withStyles';
import StoreCard from './StoreCard';
import { canteenActions } from '../_actions';
import { SET_CURRENT_PAGE } from '../App';

class CanteenStorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canteen: {},
    };
  }

  componentWillMount() {
    const { canteens } = this.props;
    if (canteens === undefined) this.props.dispatch(canteenActions.getAllCanteens());
    const { userType } = JSON.parse(localStorage.getItem('user'));
    const { dispatch } = this.props;
    dispatch({
      type: SET_CURRENT_PAGE,
      page: userType === 'VENDOR' ? 1 : 0,
    });
    this.getStores(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getStores(nextProps);
  }

  getStores(nextProps) {
    const { canteens } = nextProps;
    const { id } = this.props.match.params;
    if (id !== undefined) {
      const filterElement = canteens === undefined
        ? {} : canteens.filter(c => c.id === parseFloat(id))[0];
      this.setState({
        canteen: filterElement === undefined ? {} : filterElement,
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { canteen } = this.state;
    const storeCards = canteen.stores !== undefined
      && canteen.stores.map(s => (
        <div
          key={s.id}
          className="col-xs-12 col-md-6"
          style={{
            paddingLeft: 5,
            paddingRight: 5,
          }}
        >
          <StoreCard canteen={canteen} qoodieStore={s} key={s.id} />
        </div>
      ));
    return (
      <div className={classes.wrapper}>
        <Typography
          variant="h3"
          style={{
            color: 'gray',
            marginTop: 20,
            marginBottom: 10,
            marginLeft: '2vw',
          }}
        >
          {canteen.name}'s Store
        </Typography>
        {storeCards}
      </div>
    );
  }
}

const style = {
  wrapper: {
    padding: '0 15px 15px 15px',
    boxSizing: 'border-box',
    width: '100vw',
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
)(CanteenStorePage);
