/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { convertDateTime } from '../../../_commons/convertTimeToString';
import { SET_CALENDAR_TIMES } from '../../../_reducers/vendorOrders.reducer';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { startDate, endDate } = this.props;
    console.log(convertDateTime(startDate, true));
    console.log(convertDateTime(endDate, true));
    this.setState({
      startDate: convertDateTime(startDate, true),
      endDate: convertDateTime(endDate, true),
    });
  }

  render() {
    const { classes, dispatch } = this.props;
    const { startDate, endDate } = this.state;
    const handleChange = (e) => {
      const field = e.target.name;
      const val = e.target.value;
      const checkedStartDate = convertDateTime(Math.min(new Date(endDate).getTime(), new Date(val).getTime()), true);
      const checkedEndDate = convertDateTime(Math.max(new Date(startDate).getTime(), new Date(val).getTime()), true);
      const value = field === 'endDate' ? checkedEndDate : checkedStartDate;
      this.setState({
        [field]: value,
      }, () => dispatch({
        type: SET_CALENDAR_TIMES,
        data: {
          startDate: new Date(this.state.startDate).getTime(),
          endDate: new Date(this.state.endDate).getTime(),
        },
      }));
    };
    return (
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          type="date"
          style={{
            marginTop: 20,
            marginLeft: 20,
            width: '42%',
            float: 'left',
          }}
          label={(
            <Typography
              style={{
                fontSize: 20,
                color: '#DAA520',
              }}
            >Select Start Date
            </Typography>
          )}
          name="startDate"
          value={startDate}
          onChange={handleChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            style: {
              fontSize: 15,
            },
          }}
        />

        <TextField
          id="date"
          type="date"
          style={{
            marginTop: 20,
            marginLeft: 20,
            width: '42%',
            float: 'left',
          }}
          label={(
            <Typography
              style={{
                fontSize: 20,
                color: '#DAA520',
              }}
            >Select End Date
            </Typography>
          )}
          name="endDate"
          value={endDate}
          onChange={handleChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            style: {
              fontSize: 15,
            },
          }}
        />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  startDate: state.vendorOrders.startDate,
  endDate: state.vendorOrders.endDate,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Calendar);
