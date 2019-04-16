import React, { Component } from 'react';
import shuffleArray from './Util.js'
import Question from './Question.js'

class Game extends Component {
    constructor(props) {
        super(props);
        let [qs, qo] = this.generateQuestions(props.op, props.min, props.max);

        this.state = {
            questions: qs,
            questionOrder: qo,
            currentQ: 1
        };
    }

    generateQuestions = (op, min, max) => {
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

        shuffleArray(qo);

        return [qs, qo];
    }


    showNextQuestion = () => {
        let nextQ = this.state.currentQ + 1;

        if (nextQ <= this.state.questions.size) {
            this.setState({ currentQ: nextQ });
            return;
        }

        this.setState({ currentQ: null });
        this.props.onDone();
    }

    render () {
        const qKey = this.state.questionOrder[this.state.currentQ - 1];

        return (
            <div className="Game" key={this.state.currentQ}>
                <p>Fråga {this.state.currentQ} of {this.state.questions.size}:</p>
                {this.state.questions.get(qKey)}
            </div>
        );
    }
}

export default Game;
