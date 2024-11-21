import React from "react";
import Square from "../Square/Square";
import "./Board.css";

const N = 3;

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [].constructor(N * N).fill(""),
      turn: false,
      winner: null,
      numClicks: 0,
    };
  }
  onSquareClick(i) {
    // clicking on a filled square doesn't change anything
    if (
      this.state.numClicks < N * N &&
      !this.state.winner &&
      this.state.values[i] === ""
    ) {
      const newValues = this.state.values.slice();
      newValues[i] = this.state.turn ? "X" : "O";
      const newWinner = this.checkWinner(i, newValues);
      this.setState({
        values: newValues,
        turn: !this.state.turn,
        winner: newWinner,
        numClicks: this.state.numClicks + 1,
      });
    }
  }

  checkWinner(square, values) {
    // check row
    let val = values[square];
    let row = Math.floor(square / N);
    let col = square % N;
    if (
      values.filter((v, i) => Math.floor(i / N) === row && v !== val).length ===
      0
    ) {
      return val;
    }
    // check column
    if (values.filter((v, i) => i % N === col && v !== val).length === 0) {
      return val;
    }
    // check left diagonal
    if (square % N === Math.floor(square / N)) {
      if (
        values.filter((v, i) => i % N === Math.floor(i / N) && v !== val)
          .length === 0
      ) {
        return val;
      }
    }
    // check right diagonal
    if ((square % N) + Math.floor(square / N) === N - 1) {
      if (
        values.filter(
          (v, i) => (i % N) + Math.floor(i / N) === N - 1 && v !== val
        ).length === 0
      ) {
        return val;
      }
    }
    return this.state.winner;
  }
  render() {
    return (
      <div className="board">
        <div class="winner">
          {this.state.winner
            ? `The winner is ${this.state.winner}!`
            : "No winner yet!"}
        </div>
        {this.state.values.slice(0, N).map((_, row) => (
          <div className="row" key={row}>
            {this.state.values.slice(0, N).map((_, col) => (
              <Square
                key={row * 3 + col}
                value={this.state.values[row * 3 + col]}
                onSquareClick={() => this.onSquareClick(row * 3 + col)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}
