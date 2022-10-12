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
    theAnswerIsCorrect: false,
    rightAnswer: '',
  };

  async componentDidMount() {
    this.loadingData();
  }

  createButtons = () => {
    const { question, index } = this.state;
    let currentAnswersRandomized = [];
    const wrongAnswers = question[index].incorrect_answers;
    const answers = [
      question[index].correct_answer,
      ...wrongAnswers,
    ];

    currentAnswersRandomized = this.randomizeArray(answers);
    this.setState({
      currentAnswersRandomized,
      rightAnswer: question[index].correct_answer });
  };

  handlerClick = () => {
    this.setState({ theAnswerIsCorrect: true });
  };

  loadingData = async () => {
    const TOKEN_INVALID = 3;
    const { infoUser, clearLogin, history } = this.props;
    const token = localStorage.getItem('token');
    const questions = await fetchQuestions(token);
    if (questions.response_code === TOKEN_INVALID) {
      localStorage.clear(infoUser);
      clearLogin({ name: '', email: '' });
      history.push('/');
    }
    this.setState({
      question: questions.results, loading: false }, () => this.createButtons());
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
    const { loading, question, currentAnswersRandomized,
      rightAnswer, theAnswerIsCorrect } = this.state;
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
              { currentAnswersRandomized.map((Answer, indexWrong) => (
                Answer === rightAnswer ? (
                  <button
                    type="button"
                    key={ Answer }
                    data-testid="correct-answer"
                    name="CorrectAnswer"
                    onClick={ this.handlerClick }
                    style={ {
                      border: theAnswerIsCorrect && '3px solid rgb(6, 240, 15)',
                    } }
                  >
                    {Answer}
                  </button>
                ) : (
                  <button
                    type="button"
                    key={ Answer }
                    data-testid={ `wrong-answer-${indexWrong}` }
                    name="CorrectAnswer"
                    onClick={ this.handlerClick }
                    style={ {
                      border: theAnswerIsCorrect && '3px solid red',
                    } }
                  >
                    {Answer}
                  </button>
                )
              )) }
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
  history: PropTypes.shape.isRequired,
  // score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
