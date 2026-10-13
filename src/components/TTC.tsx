import { useState } from "react";

type Cell = "X" | "O" | null;

const winningLines: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinner(board: Cell[]): Cell | "draw" {
  for (const [a, b, c] of winningLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every(Boolean)) return "draw";

  return null;
}


function getBestMove(board: Cell[]): number | null {
    const emptyCells = board
        .map((cell, index) => (cell === null ? index : null))
        .filter((index): index is number => index !== null);

    if (emptyCells.length === 0) return null;

    // 1. 70% chance: play intelligently
    if (Math.random() < 0.7) {
        // Try to win
        for (const index of emptyCells) {
            board[index] = "O";

            if (getWinner(board) === "O") {
                board[index] = null;
                return index;
            }

            board[index] = null;
        }

        // Block player
        for (const index of emptyCells) {
            board[index] = "X";

            if (getWinner(board) === "X") {
                board[index] = null;
                return index;
            }

            board[index] = null;
        }

        // Prefer center
        if (board[4] === null) {
            return 4;
        }

        // Prefer corners
        const corners = [0, 2, 6, 8].filter(
            (index) => board[index] === null
        );

        if (corners.length > 0) {
            return corners[
                Math.floor(Math.random() * corners.length)
            ];
        }
    }

    // 30% chance: make a random move
    return emptyCells[
        Math.floor(Math.random() * emptyCells.length)
    ];
}

interface TicTacToeProps {
  onSuccess: () => void;
}

function TicTacToe({ onSuccess }: TicTacToeProps) {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [status, setStatus] = useState("Your turn");

  const handleClick = (index: number) => {
    if (board[index] || getWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = "X";

    const playerResult = getWinner(newBoard);

    if (playerResult === "X") {
      setBoard(newBoard);
      setStatus("You won.");

      setTimeout(() => {
        onSuccess();
      }, 800);

      return;
    }

    if (playerResult === "draw") {
      setBoard(newBoard);
      setStatus("Draw. Try again.");
      return;
    }

    setBoard(newBoard);
    setStatus("AI is thinking...");

    setTimeout(() => {
      const aiMove = getBestMove(newBoard);

      if (aiMove !== null) {
        newBoard[aiMove] = "O";
      }

      const aiResult = getWinner(newBoard);

      setBoard([...newBoard]);

      if (aiResult === "O") {
        setStatus("AI won. Try again.");
      } else if (aiResult === "draw") {
        setStatus("Draw. Try again.");
      } else {
        setStatus("Your turn");
      }
    }, 350);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setStatus("Your turn");
  };

  return (
    <div className="w-[440px] max-w-[90vw] rounded-2xl bg-white p-7 shadow-2xl">
      <p className="mb-1 text-sm text-gray-400">
        Challenge 2
      </p>

      <h2 className="text-2xl font-semibold text-gray-900">
        Beat the AI
      </h2>

      <p className="mt-1 mb-6 text-sm text-gray-500">
        Win a game of Tic-Tac-Toe to continue.
      </p>

      <div className="mx-auto grid w-67.5 grid-cols-3 overflow-hidden rounded-xl border border-gray-200">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="flex h-22.5 items-center justify-center border border-gray-200 text-3xl font-semibold transition hover:bg-gray-50"
          >
            {cell === "X" && (
              <span className="text-gray-900">×</span>
            )}

            {cell === "O" && (
              <span className="text-gray-400">○</span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {status}
        </p>

        {status !== "Your turn" && (
          <button
            onClick={resetGame}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

export default TicTacToe;