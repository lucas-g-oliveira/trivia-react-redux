import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import md5 from 'crypto-js/md5';

class Header extends Component {
  state = {
    hashUserImage: '',
  };

  componentDidMount() {
    const { infoUser } = this.props;
    const hashImage = md5(infoUser.email).toString();
    this.setState({ hashUserImage: hashImage });
  }

  render() {
    const { infoUser } = this.props;
    const { hashUserImage } = this.state;
    return (
      <>
        <img src={ `https://www.gravatar.com/avatar/${hashUserImage}` } alt={ infoUser.name } data-testid="header-profile-picture" />
        <h3 data-testid="header-player-name">{infoUser.name}</h3>
        <h4 data-testid="header-score">0</h4>
      </>
    );
  }
}

Header.propTypes = {
  infoUser: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = ({ user }) => ({
  infoUser: user,
});

export default connect(mapStateToProps)(Header);
