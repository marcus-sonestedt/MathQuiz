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
      currentQ: null,
    }
  }

  startGame(mode, min, max) {
    let qs = new Map();
    let c = 1;

    for (var x = min; x <= max; ++x) {
      for (var y = min; y <= max; ++y) {
        qs.set(c++, <Question mode={mode} x={x} y={y}
          onCorrect={() => this.showNextQuestion()} />);
      }
    }

    this.setState({
      questions: qs,
      currentQ: 1,
    });
  }

  showNextQuestion() {
    const nextQ = this.state.currentQ + 1;
    if (nextQ <= this.state.questions.size)
      this.setState({ currentQ: nextQ });
    else {
      alert("Klart!");
      this.setState({ currentQ: null });
    }
  }

  renderStart() {
    return (
      <div className="App-start">
        {this.state.operators.map(op =>
          <div key={op}>
            {Array.from(this.state.sizes.entries()).map(e => {
              let k = e[0], v=e[1];
              return (
                <span key={k}>
                  <button className="App-startButton"
                    onClick={() => this.startGame(op, v[0], v[1])}>
                    Träna {k} {op} !
                  </button>
                  &nbsp;
                </span>);
            }
            )}
          </div>
        )}
      </div>
    );
  }

  renderQuestion() {
    return (
      <div className="App-run">
        <p>Fråga {this.state.currentQ} of {this.state.questions.size}:</p>
        {this.state.questions.get(this.state.currentQ)}
      </div>
    );
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <h1>Mattequiz!</h1>
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
