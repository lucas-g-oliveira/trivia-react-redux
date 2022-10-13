import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <div>
        <h3
          data-testid="ranking-title"
        >
          Ranking
        </h3>
        <button
          data-testid="btn-go-home"
          type="submit"
          onClick={ () => history.push('/') }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Ranking;
