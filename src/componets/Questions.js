import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../API/fetchApi';
import { actionLogin, actionScore } from '../Redux/actions';

class Questions extends React.Component {
  state = {
    question: [],
    currentAnswersRandomized: [],
    loading: true,
    index: 0,
  };

  async componentDidMount() {
    this.loadingData();
  }

  handlerClick = (event) => {
    const { name } = event.target;
    if (name === 'CorrectAnswer') {
      console.log('Acertou!');
    } else {
      console.log('Erroooooou!');
    }
  };

  loadingData = async () => {
    const TOKEN_INVALID = 3;
    let currentAnswersRandomized = [];
    const { infoUser, clearLogin, history } = this.props;
    const token = localStorage.getItem(infoUser.email);
    const questions = await fetchQuestions(token);
    if (questions.response_code === TOKEN_INVALID) {
      localStorage.clear(infoUser);
      clearLogin({ name: '', email: '' });
      history.push('/');
    }
    this.setState({
      question: questions.results, loading: false }, () => {
      const { question, index } = this.state;
      const wrongAnswers = question[index].incorrect_answers
        .map((answers, indexWrong) => (
          <button
            type="button"
            key={ answers }
            data-testid={ `wrong-answer-${indexWrong}` }
            name="wrongAnswers"
            onClick={ this.handlerClick }
          >
            {answers}
          </button>));
      const answers = [
        <button
          type="button"
          key={ question[index].correct_answer }
          data-testid="correct-answer"
          name="CorrectAnswer"
          onClick={ this.handlerClick }
        >
          {question[index].correct_answer}
        </button>,
        ...wrongAnswers,
      ];
      currentAnswersRandomized = this.randomizeArray(answers);
      this.setState({ currentAnswersRandomized });
    });
  };

  randomizeArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  render() {
    const { loading, question, currentAnswersRandomized } = this.state;
    console.log(currentAnswersRandomized);
    return (
      loading ? <p>loading</p>
        : (
          <div>
            <h4 data-testid="question-category">
              {question[0].category}
            </h4>
            <h4 data-testid="question-text">
              {question[0].question}
            </h4>
            <div data-testid="answer-options">
              { currentAnswersRandomized.map((Answer) => Answer) }
            </div>
          </div>

        ));
  }
}

const mapStateToProps = (state) => ({
  infoUser: state.user,
  score: state.game.score,
  questionsState: state.game.question,
});

const mapDispatchToProps = (dispatch) => ({
  clearLogin: (object) => dispatch(actionLogin(object)),
  setScore: (object) => dispatch(actionScore(object)),
});

Questions.propTypes = {
  infoUser: PropTypes.objectOf(Object).isRequired,
  clearLogin: PropTypes.func.isRequired,
  // setScore: PropTypes.func.isRequired,
  history: PropTypes.objectOf().isRequired,
  // score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
