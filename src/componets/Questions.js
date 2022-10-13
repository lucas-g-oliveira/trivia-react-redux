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
    time: 30,
    disable: false,
    next: false,
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

  handlerClick = ({ target }) => {
    const { name } = target;
    const { setScore } = this.props;
    const { question, index, time } = this.state;
    const { difficulty } = question[index];
    this.setState({ theAnswerIsCorrect: true, next: true });
    if (name === 'correctAnswer') {
      setScore(difficulty, time);
    }
  };

  loadingData = async () => {
    const TOKEN_INVALID = 3;
    const magicNumberTimer = 1000;
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

    setInterval(() => {
      const { time } = this.state;
      if (time > 0) {
        this.setState({ time: time - 1 });
      } else {
        this.setState({ disable: true, next: true });
      }
    }, magicNumberTimer);
  };

  randomizeArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  nextClick = () => {
    const { index } = this.state;
    const { history } = this.props;
    const indexNumber = 4;
    if (index === indexNumber) {
      history.push('/feedback');
    } else {
      this.setState((prevState) => ({
        index: prevState.index + 1,
        disable: false,
        next: false,
        theAnswerIsCorrect: false,
      }));
    }
  };

  render() {
    const { loading, question, currentAnswersRandomized,
      rightAnswer, theAnswerIsCorrect, time, disable, next } = this.state;
    console.log(question);
    return (
      loading ? <p>loading</p>
        : (
          <div>
            <div>
              <p>Time:</p>
              <p>{time}</p>
            </div>
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
                    name="correctAnswer"
                    onClick={ this.handlerClick }
                    disabled={ disable }
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
                    name="wrongAnswer"
                    onClick={ this.handlerClick }
                    disabled={ disable }
                    style={ {
                      border: theAnswerIsCorrect && '3px solid red',
                    } }
                  >
                    {Answer}
                  </button>
                )
              )) }
            </div>
            {
              next && (
                <button
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.nextClick }
                >
                  Next
                </button>
              )
            }
          </div>

        ));
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearLogin: (object) => dispatch(actionLogin(object)),
  setScore: (difficulty, timer) => dispatch(actionScore(difficulty, timer)),
});

Questions.propTypes = {
  infoUser: PropTypes.objectOf(Object).isRequired,
  clearLogin: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
  history: PropTypes.shape.isRequired,
  // score: PropTypes.number.isRequired,
};

export default connect(null, mapDispatchToProps)(Questions);
