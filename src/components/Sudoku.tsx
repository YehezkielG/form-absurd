import { useState } from "react";

interface SudokuProps {
    onSuccess: () => void;
}

type Board = number[][];

const baseBoard: Board = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, 1, 4, 3],
    [4, 3, 2, 1],
];

const shuffle = <T,>(array: T[]): T[] => {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
};

const generateSolution = (): Board => {
    let board = baseBoard.map(row => [...row]);

    // Randomize numbers
    const numbers = shuffle([1, 2, 3, 4]);

    board = board.map(row =>
        row.map(value => numbers[value - 1])
    );

    // Shuffle rows inside each 2-row block
    if (Math.random() > 0.5) {
        [board[0], board[1]] = [board[1], board[0]];
    }

    if (Math.random() > 0.5) {
        [board[2], board[3]] = [board[3], board[2]];
    }

    // Shuffle the two row blocks
    if (Math.random() > 0.5) {
        [board[0], board[1], board[2], board[3]] = [
            board[2],
            board[3],
            board[0],
            board[1],
        ];
    }

    // Shuffle columns inside each 2-column block
    if (Math.random() > 0.5) {
        board = board.map(row => {
            [row[0], row[1]] = [row[1], row[0]];
            return row;
        });
    }

    if (Math.random() > 0.5) {
        board = board.map(row => {
            [row[2], row[3]] = [row[3], row[2]];
            return row;
        });
    }

    // Shuffle the two column blocks
    if (Math.random() > 0.5) {
        board = board.map(row => [
            row[2],
            row[3],
            row[0],
            row[1],
        ]);
    }

    return board;
};

const countSolutions = (board: Board): number => {
    let count = 0;

    const solve = () => {
        if (count > 1) return;

        let emptyRow = -1;
        let emptyCol = -1;

        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (board[r][c] === 0) {
                    emptyRow = r;
                    emptyCol = c;
                    break;
                }
            }

            if (emptyRow !== -1) break;
        }

        if (emptyRow === -1) {
            count++;
            return;
        }

        for (let num = 1; num <= 4; num++) {
            const rowValid = board[emptyRow].every(
                value => value !== num
            );

            const colValid = board.every(
                row => row[emptyCol] !== num
            );

            const boxRow = Math.floor(emptyRow / 2) * 2;
            const boxCol = Math.floor(emptyCol / 2) * 2;

            let boxValid = true;

            for (let r = boxRow; r < boxRow + 2; r++) {
                for (let c = boxCol; c < boxCol + 2; c++) {
                    if (board[r][c] === num) {
                        boxValid = false;
                    }
                }
            }

            if (rowValid && colValid && boxValid) {
                board[emptyRow][emptyCol] = num;
                solve();
                board[emptyRow][emptyCol] = 0;
            }
        }
    };

    solve();

    return count;
};

const generatePuzzle = () => {
    while (true) {
        const solution = generateSolution();
        const puzzle = solution.map(row => [...row]);

        // Remove 7 cells
        const cells = shuffle(
            Array.from({ length: 16 }, (_, i) => i)
        );

        for (let i = 0; i < 7; i++) {
            const index = cells[i];
            const row = Math.floor(index / 4);
            const col = index % 4;

            puzzle[row][col] = 0;
        }

        const testBoard = puzzle.map(row => [...row]);

        if (countSolutions(testBoard) === 1) {
            return { puzzle, solution };
        }
    }
};

function Sudoku({ onSuccess }: SudokuProps) {
    const [game, setGame] = useState(generatePuzzle);
    const [board, setBoard] = useState(
        game.puzzle.map(row => [...row])
    );
    const [error, setError] = useState("");

    const handleChange = (
        row: number,
        col: number,
        value: string
    ) => {
        if (game.puzzle[row][col] !== 0) return;

        if (value !== "" && !["1", "2", "3", "4"].includes(value)) {
            return;
        }

        const newBoard = board.map(row => [...row]);

        newBoard[row][col] = value === "" ? 0 : Number(value);

        setBoard(newBoard);
        setError("");
    };

    const handleSubmit = () => {
        const complete = board.every(row =>
            row.every(cell => cell !== 0)
        );

        if (!complete) {
            setError("Complete the puzzle first.");
            return;
        }

        const correct = board.every((row, r) =>
            row.every(
                (cell, c) => cell === game.solution[r][c]
            )
        );

        if (!correct) {
            setError("Incorrect solution. Try again.");
            return;
        }

        setError("");

        setTimeout(() => {
            onSuccess();
        }, 700);
    };

    const restart = () => {
        const newGame = generatePuzzle();

        setGame(newGame);
        setBoard(
            newGame.puzzle.map(row => [...row])
        );
        setError("");
    };

    return (
        <div className="w-[440px] max-w-[90vw] rounded-2xl bg-white p-7 shadow-2xl">

            <p className="mb-1 text-sm text-gray-400">
                Challenge 5
            </p>

            <h2 className="text-2xl font-semibold text-gray-900">
                Sudoku
            </h2>

            <p className="mt-1 mb-6 text-sm text-gray-500">
                Complete the puzzle to continue.
            </p>

            <div className="mx-auto grid w-[280px] grid-cols-4 overflow-hidden rounded-xl border border-gray-300">

                {board.map((row, r) =>
                    row.map((cell, c) => {
                        const fixed = game.puzzle[r][c] !== 0;

                        return (
                            <input
                                key={`${r}-${c}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={cell === 0 ? "" : cell}
                                disabled={fixed}
                                onChange={e =>
                                    handleChange(
                                        r,
                                        c,
                                        e.target.value
                                    )
                                }
                                className={`
                                    h-[70px] w-full text-center text-xl
                                    outline-none
                                    border-gray-200
                                    ${c % 2 === 0 ? "border-r" : ""}
                                    ${r % 2 === 0 ? "border-b" : ""}
                                    ${
                                        fixed
                                            ? "bg-gray-100 font-semibold text-gray-700"
                                            : "bg-white text-gray-900 focus:bg-gray-50"
                                    }
                                `}
                            />
                        );
                    })
                )}

            </div>

            {error && (
                <p className="mt-3 text-center text-sm text-red-500">
                    {error}
                </p>
            )}

            <div className="mt-5 flex gap-3">

                <button
                    onClick={restart}
                    className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    New Puzzle
                </button>

                <button
                    onClick={handleSubmit}
                    className="flex-1 rounded-lg bg-blue-600 p-2.5 font-medium text-white transition hover:bg-blue-700"
                >
                    Submit
                </button>

            </div>

            <p className="mt-4 text-center text-xs text-gray-400">
                Fill every empty cell with 1–4.
            </p>

        </div>
    );
}

export default Sudoku;