import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import connect from 'react-redux/es/connect/connect';
import { compose } from 'redux';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    marginTop: 7,
    marginRight: 20,
    width: 45,
    height: 45,
  },
  bigAvatar: {
    marginTop: 2,
    marginRight: 15,
    width: 55,
    height: 55,
  },
};

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

class ProfileIcon extends React.Component {
  render() {
    const { classes, currentPage } = this.props;
    return (
      <Avatar
        className={currentPage === 'profilePage' ? classes.bigAvatar : classes.avatar}
        component={StyledLink}
        to="/homepage/profile"
      >
        <img alt="profile" className="logo" src="../../../img/profileLogo.png" />
      </Avatar>
    );
  }
}

const mapStateToProps = state => ({
  currentPage: state.currentPage.page,
});
export default compose(withStyles(styles), connect(mapStateToProps))(ProfileIcon);
