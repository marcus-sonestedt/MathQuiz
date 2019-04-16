import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './Game.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operators: ["+", "-", "*"],
      sizes: new Map([['lilla', [1, 5]], ['stora', [5, 9]]]),
      game: null,
    }
  }

  newGame = (op, min, max) => {
    this.setState({
      game: <Game op={op} min={min} max={max} onDone={this.onGameDone}/>
    });
  }

  onGameDone = () => {
    alert("Klart!");
    this.setState({ game: null });
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
                    onClick={() => this.newGame(op, v[0], v[1])}>
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

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <h1>Matteträning!</h1>
          {this.state.game || this.renderStart()}
          <p>Utvecklat av Marcus Sonestedt</p>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default App;
