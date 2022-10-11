import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuestions } from '../API/fetchApi';
import { actionLogin, actionScore } from '../Redux/actions';

class Questions extends React.Component {
  state = {
    questions: [],
    currentQuestionIndex: 6,
    currentAnswersRandomized: [],
  };

  async componentDidMount() {
    this.loadingData();
  }

  loadingData = async () => {
    const { infoUser, clearLogin } = this.props;
    const token = localStorage.getItem(infoUser.email);
    if (token === 'INVALID_TOKEN') {
      localStorage.clear(infoUser);
      clearLogin({ name: '', email: '' });
      (<Redirect to="/" />);
    }
    const questions = await fetchQuestions(token);
    this.setState({ questions: questions.results }, () => this.questionOpen());
  };

  questionOpen = () => {
    this.setState(
      { currentQuestionIndex: 0 },
      () => this.butonsOptions(),
    );
  };

  randomizeArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  butonsOptions = () => {
    const { questions, currentQuestionIndex } = this.state;
    const currentQuestion = { ...questions[currentQuestionIndex] };
    if (currentQuestion.type === 'multiple') {
      const questionsCorrect = {
        answer: currentQuestion.correct_answer,
        testId: 'correct-answer',
        status: 'CorrectAnswer',
      };
      const questionsIncorrect = currentQuestion.incorrect_answers
        .map((e, index) => ({
          answer: e, testId: `incorrect-answer-${index}`, status: 'IncorrectAnswer',
        }));

      const newArray = [questionsCorrect, ...questionsIncorrect];
      const newArrayRandomized = [...this.randomizeArray(newArray)];
      this.setState({ currentAnswersRandomized: newArrayRandomized });
    }
  };

  handlerClick = (event) => {
    const { name } = event.target;
    const { setScore, score } = this.props;
    if (name === 'CorrectAnswer') {
      console.log('Acertou!');
      setScore({ score: score + 1 });
    } else {
      console.log('Erroooooou!');
    }
  };

  renderQuestion = () => {
    const { questions, currentQuestionIndex, currentAnswersRandomized } = this.state;
    const currentQuestion = { ...questions[currentQuestionIndex] };

    return (
      <div>
        <h4 data-testid="question-category">
          {currentQuestion.category}
        </h4>
        <h4 data-testid="question-text">
          {currentQuestion.question}
        </h4>
        <div datatype="answer-options">
          {currentAnswersRandomized[0]
            ? currentAnswersRandomized.map((e) => (
              <button
                name={ e.status }
                key={ e.answer }
                data-testId={ e.testId }
                type="submit"
                onClick={ this.handlerClick }
              >
                { e.answer }
              </button>
            )) : (<h2> Carregando... </h2>)}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <div>
          {this.renderQuestion()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  infoUser: state.user,
  score: state.game.score,
});

const mapDispatchToProps = (dispatch) => ({
  clearLogin: (object) => dispatch(actionLogin(object)),
  setScore: (object) => dispatch(actionScore(object)),
});

Questions.propTypes = {
  infoUser: PropTypes.objectOf(Object).isRequired,
  clearLogin: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
