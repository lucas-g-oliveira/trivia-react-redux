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
    const { infoUser, score } = this.props;
    const { hashUserImage } = this.state;
    return (
      <>
        <img src={ `https://www.gravatar.com/avatar/${hashUserImage}` } alt={ infoUser.name } data-testid="header-profile-picture" />
        <h3 data-testid="header-player-name">{infoUser.name}</h3>
        <h4 data-testid="header-score">{score}</h4>
      </>
    );
  }
}

Header.propTypes = {
  infoUser: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ user, player }) => ({
  infoUser: user,
  score: player.score,
});

export default connect(mapStateToProps)(Header);
