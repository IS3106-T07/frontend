/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography/Typography';
import connect from 'react-redux/es/connect/connect';
import SuccessDialog from '../../_commons/SuccessDialog';
import ErrorDialog from '../../_commons/ErrorDialog';
import vendorApi from '../../_api/vendors';
import { GET_VENDOR_DETAILS_SUCCESS } from '../../VendorPages/VendorMenu/VendorMenuPage';

class VendorSwitch extends React.Component {
  handleChange = () => vendorApi.toggleStatus()
    .then(() => {
      const { dispatch } = this.props;
      vendorApi.getVendorDetails(JSON.parse(localStorage.getItem('user')).id)
        .then((response) => {
          dispatch({
            type: GET_VENDOR_DETAILS_SUCCESS,
            data: response.data,
          });
          localStorage.setItem('store', JSON.stringify(response.data));
          SuccessDialog('Changed Status Successfully', 'Status', 'changed');
        }).catch(error => ErrorDialog('retrieving vendor details', error));
    })
    .catch(error => ErrorDialog('changing status', error));

  render() {
    const { vendorDetails } = this.props;
    const checked = vendorDetails.receivingOrders;
    return (
      <FormGroup row>
        <FormControlLabel
          control={(
            <Switch
              checked={!!checked}
              onChange={this.handleChange}
            />
          )}
          label={(
            <Typography
              variant="h4"
              style={{
                color: 'white',
              }}
            >
              {checked ? 'Cooking' : 'Closed'}
            </Typography>
          )}
        />
      </FormGroup>
    );
  }
}

const mapStateToProps = state => ({
  vendorDetails: state.userProfile.vendorDetails,
});

export default connect(mapStateToProps)(VendorSwitch);
