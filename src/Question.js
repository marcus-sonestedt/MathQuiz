import React, { Component } from 'react';
import './Question.css'

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: null,
      response: ""
    }
  }

  responseChanged = event => {
    const correct = event.target.value === this.props.answer.toString();

    if (correct) {
      setTimeout(() => this.props.onCorrect(), 1000);
    }

    this.setState({
      correct: correct,
      response: event.target.value,
    });
  }

  help = event => {
    this.setState({ response: this.props.answer });
    var ev = { target: { value: this.props.answer.toString() } };
    this.responseChanged(ev);
  }

  render = () => {
    let answerClass =
      this.state.correct === true ? "correct" :
        this.state.correct === false ? "incorrect" :
          "";

    return (
      <div className="Question" key={this.props.qiestion}>
        <p className="Question-q">{this.props.question}</p>
        <span>Svar:&nbsp;
        <input className={"Question-a " + answerClass}
            type="number" autoFocus="true"
            onChange={this.responseChanged}
            value={this.state.response}
            disabled={this.state.correct} />
        </span>
        <p><button className="Question-helpButton"
          onClick={e => this.help(e)}><b>Hjälp!</b></button>
        </p>
      </div>
    );
  }
}

export default Question;
