import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../API/fetchApi';
import { actionLogin, actionScore, chargeQuestions } from '../Redux/actions';

class Questions extends React.Component {
  state = {
    questions: [],
    currentAnswersRandomized: [],
    loading: true,
  };

  async componentDidMount() {
    this.loadingData();
  }

  loadingData = async () => {
    const TOKEN_INVALID = 3;
    const { infoUser, clearLogin, history } = this.props;
    const token = localStorage.getItem(infoUser.email);
    const questions = await fetchQuestions(token);
    if (questions.response_code === TOKEN_INVALID) {
      console.log('ERRO');
      localStorage.clear(infoUser);
      clearLogin({ name: '', email: '' });
      history.push('/');
    }
    /* chargeStateQuetsions(questions.results); */
    console.log(questions);
    this.setState({ questions: questions.results, loading: false });
    this.butonsOptions();
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
      this.setState({ currentAnswersRandomized: newArray });
    }
  };

  handlerClick = (event) => {
    const { name } = event.target;
    /*  const { setScore, score } = this.props; */
    if (name === 'CorrectAnswer') {
      console.log('Acertou!');
      /* setScore({ score: score + 1 }); */
    } else {
      console.log('Erroooooou!');
    }
  };

  // renderQuestion = () => {
  //   const { questions, currentAnswersRandomized } = this.state;
  //   const currentQuestion = { ...questions[0] };

  //   return (
  //     <div>
  //       <h4 data-testid="question-category">
  //         {currentQuestion.category}
  //       </h4>
  //       <h4 data-testid="question-text">
  //         {currentQuestion.question}
  //       </h4>
  //       <div datatype="answer-options">
  //         {currentAnswersRandomized[0]
  //           ? this.randomizeArray(currentAnswersRandomized).map((e) => (
  //             <button
  //               name={ e.status }
  //               key={ e.answer }
  //               data-testId={ e.testId }
  //               type="submit"
  //               onClick={ this.handlerClick }
  //             >
  //               { e.answer }
  //             </button>
  //           )) : (<h2> Carregando... </h2>)}
  //       </div>
  //     </div>
  //   );
  // };

  render() {
    const { loading, questions, currentAnswersRandomized } = this.state;
    console.log(questions);
    return (
    // <div>
    //   <div>
    //     {this.renderQuestion()}
    //   </div>
    // </div>

      loading ? <p>loading</p>
        : (<div>
          test
          <h4 data-testid="question-category">
            {questions.category}
          </h4>
          <h4 data-testid="question-text">
            {questions.question}
          </h4>
          </ div>),
          {/* {
            questions.map(() => (
              <div datatype="answer-options" key={ Math.random() }>
                {currentAnswersRandomized[0]
                  ? this.randomizeArray(currentAnswersRandomized).map((e) => (
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
            ))
          } */}
        /* </div> */
    );
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
  chargeStateQuetsions: (object) => dispatch(chargeQuestions(object)),
});

Questions.propTypes = {
  infoUser: PropTypes.objectOf(Object).isRequired,
  clearLogin: PropTypes.func.isRequired,
  // setScore: PropTypes.func.isRequired,
  /* chargeStateQuetsions: PropTypes.func.isRequired, */
  history: PropTypes.objectOf().isRequired,
  // score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
