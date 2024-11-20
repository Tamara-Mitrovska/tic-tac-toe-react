import { useState } from "react";
import Square from "../Square/Square";
import "./Board.css";

const N = 3;

export default function Board() {
  const [values, setValues] = useState([].constructor(N * N).fill(""));
  const [turn, setTurn] = useState(false);
  let onSquareClick = (i) => {
    // clicking on a filled square doesn't change anything
    if (values[i] === "") {
      const newValues = values.slice();
      newValues[i] = turn ? "X" : "O";
      setValues(newValues);
      setTurn(!turn);
    }
  };

  return (
    <div className="board">
      {[1, 2, 3].map((_, row) => (
        <div className="board__row" key={row}>
          {[1, 2, 3].map((_, col) => (
            <Square
              key={row * 3 + col}
              value={values[row * 3 + col]}
              onSquareClick={() => onSquareClick(row * 3 + col)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
