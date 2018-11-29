/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { compose } from 'redux';
import withStyles from '@material-ui/core/es/styles/withStyles';
import connect from 'react-redux/es/connect/connect';
import Typography from '@material-ui/core/Typography/Typography';
import Paper from '@material-ui/core/Paper/Paper';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TextField from '@material-ui/core/TextField/TextField';
import CameraAlt from '@material-ui/icons/CameraAlt';
import Button from '@material-ui/core/Button/Button';
import { history } from '../../../_helpers/history';

class VendorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentWillMount() {
    const { vendorDetails } = this.props;
    this.setState({ ...vendorDetails });
  }

  componentWillReceiveProps(nextProps) {
    const { vendorDetails } = nextProps;
    this.setState({ ...vendorDetails });
  }

  render() {
    const { classes, vendorDetails } = this.props;
    const tableConfig = [
      { field: 'vendorName', type: 'text', label: 'Name' },
      { field: 'vendorAddress', type: 'text', label: 'Address' },
      { field: 'vendorEmail', type: 'text', label: 'Email' },
      { field: 'vendorBankAccountNumber', type: 'text', label: 'Bank Account' },
    ];
    const updateField = e => this.setState({
      [e.target.name]: e.target.value,
    });
    return (
      <div className={classes.container}>
        <Paper className={classes.image}>
          {vendorDetails.vendorPhotoDir !== null && (
            <img alt={vendorDetails.vendorName} src={vendorDetails.photoDir} />
          )}
          {vendorDetails.vendorPhotoDir === null && (
            <CameraAlt className={classes.add} />
          )}
        </Paper>
        <Paper className={classes.details}>
          <Typography
            variant="h4"
            style={{
              color: '#DAA520',
            }}
          >
            Personal Account
          </Typography>
          <Table>
            <TableBody>
              {tableConfig.map(row => (
                <TableRow>
                  <TableCell padding="dense">
                    <Typography
                      variant="h6"
                      style={{
                        color: '#DAA520',
                        fontSize: 14,
                      }}
                    >
                      {row.label}
                    </Typography>
                  </TableCell>
                  <TableCell padding="dense">
                    <TextField
                      type={row.type}
                      value={this.state[row.field]}
                      name={row.field}
                      onChange={updateField}
                      InputProps={{
                        style: {
                          fontSize: 15,
                          paddingLeft: 10,
                          paddingRight: 10,
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#DAA520',
              width: '80%',
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <Typography
              variant="h6"
              style={{
                fontSize: 15,
                color: 'white',
              }}
            >Update
            </Typography>
          </Button>
          <Button
            variant="outlined"
            style={{
              borderColor: '#DAA520',
              width: '80%',
              marginBottom: 20,
            }}
            onClick={() => {
              localStorage.clear();
              history.push('/login');
            }}
          >
            <Typography
              variant="h6"
              style={{
                fontSize: 15,
                color: '#DAA520',
              }}
            >Logout
            </Typography>
          </Button>
        </Paper>
      </div>
    );
  }
}

const style = () => ({
  container: {
    width: '100%',
    paddingLeft: '5vw',
    paddingRight: '5vw',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '40vw',
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 20,
  },
  add: {
    marginTop: 20,
    fontSize: '30vw',
    color: 'lightgray',
  },
});

const mapStateToProps = state => ({
  vendorDetails: state.userProfile.vendorDetails,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default compose(withStyles(style), connect(mapStateToProps, mapDispatchToProps))(VendorProfile);
