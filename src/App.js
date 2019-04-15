import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Question from './Question.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operators: ["+", "-", "*"],
      sizes: new Map([['lilla', [1, 5]], ['stora', [5, 9]]]),
      questions: null,
      questionOrder: Array(0),
      currentQ: null,
    }
  }

  shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  startGame = (op, min, max) => {
    let qs = new Map();
    let c = 1;

    for (var x = min; x <= max; ++x) {
      for (var y = min; y <= max; ++y) {
        const a =
          op === "+" ? x + y :
            op === "-" ? x - y :
              op === "*" ? x * y :
                undefined;

        if (a < 0)
          continue;

        const t = `Vad är ${x} ${op} ${y} ?`;
        const q = <Question question={t} answer={a}
          onCorrect={this.showNextQuestion} />;

        qs.set(c++, q);
      }
    }

    const qo = Array(qs.size);
    for (var i = 0; i < qs.size; ++i)
      qo[i] = i + 1;

    this.shuffleArray(qo);

    this.setState({
      questions: qs,
      questionOrder: qo,
      currentQ: 1,
    });
  }

  showNextQuestion = () => {
    let nextQ = this.state.currentQ + 1;

    if (nextQ > this.state.questions.size) {
      alert("Klart!");
      nextQ = null;
    }

    this.setState({ currentQ: nextQ });
  }

  renderStart() {
    return (
      <div className="App-start">
        {this.state.operators.map(op =>
          <div key={op}>
            {Array.from(this.state.sizes.entries()).map(e => {
              let k = e[0], v = e[1];
              return (
                <span key={k}>
                  <button className="App-startButton"
                    onClick={() => this.startGame(op, v[0], v[1])}>
                    Träna {k} {op} !
                  </button>
                  &nbsp;
                </span>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  renderQuestion() {
    const qKey = this.state.questionOrder[this.state.currentQ - 1];
    return (
      <div className="App-run" key={this.state.currentQ}>
        <p>Fråga {this.state.currentQ} of {this.state.questions.size}:</p>
        {this.state.questions.get(qKey)}
      </div>
    );
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <h1>Matteträning!</h1>
          {this.state.currentQ === null
            ? this.renderStart()
            : this.renderQuestion()}
          <p>Utvecklat av Marcus Sonestedt</p>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default App;
