import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../componets/Header';

class Feedback extends Component {
  render() {
    const referenceScore = 3;
    const { rightQuestionsGlobal, score, history } = this.props;
    return (
      <div data-testid="feedback-text">
        <Header testID="feedback-total-score" />
        {(rightQuestionsGlobal < referenceScore)
          ? <h2 data-testid="feedback-text">Could be better...</h2>
          : <h2 data-testid="feedback-text">Well Done!</h2>}
        <div>
          <h2
            data-testid="feedback-total-question"
          >
            {rightQuestionsGlobal}
          </h2>
          <h2
            data-testid="header-score"
          >
            {score}
          </h2>
        </div>
        <div>
          <button
            data-testid="btn-play-again"
            type="submit"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>
          <button
            data-testid="btn-ranking"
            type="submit"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  rightQuestionsGlobal: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape.isRequired,
};

const mapStateToProps = (state) => ({
  rightQuestionsGlobal: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
