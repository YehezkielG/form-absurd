import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

type Puzzle = {
  fen: string;
  moves: [string, string][];
  description: string;
};

const puzzles: Puzzle[] = [
  {
    fen: "r1bq2r1/b4pk1/p1pp1p2/1p2pP2/1P2P1PB/3P4/1PPQ2P1/R3K2R w - - 0 1",
    moves: [
      ["d2", "h6"],
      ["g7", "h6"],
      ["h4", "f6"],
    ],
    description: "Find the checkmate in 2.",
  },
  {
    fen: "3r2k1/5ppp/3Rp3/1q2P3/1r3P2/7P/2P3P1/6RK w - - 1 39",
    moves: [
      ["d6", "d8"],
      ["b5", "e8"],
      ["d8", "e8"],
    ],
    description: "Find the checkmate in 2.",
  },
];

interface ChessProps {
  onSuccess: () => void;
}

function ChessChallenge({ onSuccess }: ChessProps) {
  const [puzzle] = useState(
    () => puzzles[Math.floor(Math.random() * puzzles.length)]
  );
  const [game, setGame] = useState(() => new Chess(puzzle.fen));
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleMove = ({
    sourceSquare,
    targetSquare,
  }: {
    sourceSquare: string;
    targetSquare: string;
  }) => {
    if (completed || step === 1) return false;

    const expected = puzzle.moves[step];

    if (
      sourceSquare.toLowerCase() !== expected[0] ||
      targetSquare.toLowerCase() !== expected[1]
    ) {
      setError("That's not the correct move.");
      return false;
    }

    const nextGame = new Chess(game.fen());

    try {
      const move = nextGame.move({
        from: sourceSquare,
        to: targetSquare,
      });

      if (!move) {
        setError("Illegal move.");
        return false;
      }

      setGame(nextGame);
      setError("");

      // Player's first move → Black responds automatically
      if (step === 0) {
        setStep(1);

        setTimeout(() => {
          const responseGame = new Chess(nextGame.fen());
          const [blackFrom, blackTo] = puzzle.moves[1];

          try {
            responseGame.move({
              from: blackFrom,
              to: blackTo,
            });

            setGame(responseGame);
            setStep(2);
          } catch {
            setError("Puzzle error.");
          }
        }, 700);

        return true;
      }

      // Player's second move
      if (step === 2) {
        if (!nextGame.isCheckmate()) {
          setError("That's not checkmate.");
          return false;
        }

        setCompleted(true);
        setTimeout(onSuccess, 800);
        return true;
      }

      return true;
    } catch {
      setError("Illegal move.");
      return false;
    }
  };

  return (
    <div className="w-[440px] max-w-[90vw] rounded-2xl bg-white p-7 shadow-2xl">
      <p className="mb-1 text-sm text-gray-400">Challenge 6</p>

      <h2 className="text-2xl font-semibold text-gray-900">Chess</h2>

      <p className="mt-1 mb-6 text-sm text-gray-500">
        {puzzle.description}
      </p>

      <div className="mx-auto w-[360px] max-w-full overflow-hidden rounded-xl">
        <Chessboard
          options={{
            position: game.fen(),
            onPieceDrop: handleMove,
            boardWidth: 360,
            arePiecesDraggable: !completed && step !== 1,
            showNotation: true,
          }}
        />
      </div>

      {error && (
        <p className="mt-3 text-center text-sm text-red-500">{error}</p>
      )}

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {completed
            ? "Checkmate!"
            : step === 1
            ? "Black is thinking..."
            : `Your move · ${step === 0 ? "1" : "2"} / 2`}
        </p>

        <p className="text-xs text-gray-400">Mate in 2</p>
      </div>
    </div>
  );
}

export default ChessChallenge;