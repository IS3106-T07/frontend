/* eslint-disable react/jsx-one-expression-per-line */
import * as React from 'react';
import connect from 'react-redux/es/connect/connect';
import Typography from '@material-ui/core/Typography/Typography';
import TrackOrderList from './TrackOrderList';
import { SET_CURRENT_PAGE } from '../App';

class TrackOrderPage extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    this.setState({}, () => dispatch({
      type: SET_CURRENT_PAGE,
      page: 3,
    }));
  }

  render() {
    const { orders } = this.props;
    const orderLists = orders
      .sort((o1, o2) => (o1.created >= o2.created ? -1 : 1))
      .filter(o => o.customerOrderType.name !== 'IN BASKET')
      .map(order => <TrackOrderList order={order} key={order.id} />);
    return (
      <div>
        <Typography
          variant="h3"
          style={{
            color: 'gray',
            marginTop: 20,
            marginLeft: '4vw',
          }}
        >
          Orders
        </Typography>
        <div>{orderLists}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.userProfile.orders,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrackOrderPage);
