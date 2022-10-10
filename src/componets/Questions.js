import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../API/fetchApi';

class Questions extends Component {
  state = {
    questions: [],
  };

  async componentDidMount() {
    const { infoUser } = this.props;
    const token = localStorage.getItem(infoUser.email);
    const questions = await fetchQuestions(token);
    this.setState({ questions: questions.results });
  }

  render() {
    const { questions } = this.state;
    return (
      {}
    );
  }
}

const mapStateToProps = ({ user }) => ({
  infoUser: user,
});

export default connect(mapStateToProps)(Questions);
