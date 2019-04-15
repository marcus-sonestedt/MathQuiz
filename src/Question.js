import React, { Component } from 'react';
import './Question.css'

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer:
        props.mode === "+" ? props.x + props.y :
          props.mode === "-" ? props.x - props.y :
            props.mode === "*" ? props.x * props.y :
              undefined,
      correct: null,
      helpText: ""
    }
  }

  checkAnswer(value) {
    const correct = value === this.state.answer.toString();
    this.setState({ correct: correct });
    if (correct) {
      setTimeout(2000, () => this.onCorrect());
    }
  }

  help() {
    this.setState({ helpText: this.state.answer });
  }

  render() {
    let answerClass =
      this.state.correct === true ? "correct" :
        this.state.correct === false ? "incorrect" :
          "";

    return (
      <div className="Question">
        <p className="Question-q">Vad är {this.props.x} {this.props.mode} {this.props.y} ?</p>
        <span>Svar:</span>
        <input className={"Question-a " + answerClass} type="text"
          onChange={inp => this.checkAnswer(inp.value)}
          value={this.state.helpText} />
        <p><button className="Question-helpButton"
          onClick={() => this.help()}>Hjälp!</button>
        </p>
      </div>
    );
  }
}

export default Question;
