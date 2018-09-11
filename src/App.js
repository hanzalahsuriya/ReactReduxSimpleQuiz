import React, { Component } from 'react';
import './App.css';
import AuthorQuiz from './AuthorQuiz';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <AuthorQuiz {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    turnData: state.turnData,
    highlight: state.highlight,
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    onAnswerSelected: ((answer) => {
      dispatch({ type: 'ANSWER_SELECTED', answer })
    }),
    onContinue: (() => {
      dispatch({ type: 'CONTINUE' })
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
