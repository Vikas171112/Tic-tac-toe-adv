import React, { useState } from "react";
const initialBoard = () => Array(9).fill(null);
function Tictacttoe() {
  const [board, setBoard] = useState(initialBoard());
  const [isXNext, setisXNext] = useState(true);

  const WinningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 5],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
  ];
  //   check whether the next player is x or not this sets our first player to be x
  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < WinningPattern.length; i++) {
      const [a, b, c] = WinningPattern[[i]];
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
  };

  const handleClick = (index) => {
    //check the winner
    const winner = calculateWinner(board);
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "x" : "0";
    setBoard(newBoard);
    setisXNext(!isXNext);
  };
  const getStatusMessage = () => {
    const winner = calculateWinner(board);
    if (winner) return `player ${winner} wins!`;
    if (!board.includes(null)) return `its a draw!`;
    return `Player ${isXNext ? "x" : "o"} turn`;
  };
  const resetGame = () => {
    setBoard(initialBoard());
    setisXNext(true);
  };

  return (
    <div className="game max-w-[calc(3*100px)] m-auto ">
      <div className="status  text-2xl flex justify-between  mt-10 mb-5">
        {getStatusMessage()}
        <button
          onClick={resetGame}
          className="reset-button text-white bg-slate-800 px-8 py-4"
        >
          Reset
        </button>
      </div>
      <div className="board grid  grid-cols-3 gap-1 ">
        {board.map((b, index) => {
          return (
            <button
              className="cell px-8 py-8 bg-gray-700 mx-2 my-2"
              onClick={() => handleClick(index)}
              disabled={b !== null}
              key={index}
            >
              {board[index]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Tictacttoe;
