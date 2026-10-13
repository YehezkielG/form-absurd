import { useState } from "react";

interface LinearAlgebraProps {
    onSuccess: () => void;
}

type Question = {
    a: number;
    b: number;
    c: number;
    d: number;
    x: number;
    y: number;
};

const generateQuestion = (): Question => {
    let a: number;
    let b: number;
    let c: number;
    let d: number;

    do {
        a = Math.floor(Math.random() * 5) - 2;
        b = Math.floor(Math.random() * 5) - 2;
        c = Math.floor(Math.random() * 5) - 2;
        d = Math.floor(Math.random() * 5) - 2;
    } while (a * d - b * c === 0);

    const x = Math.floor(Math.random() * 9) - 4;
    const y = Math.floor(Math.random() * 9) - 4;

    return {
        a,
        b,
        c,
        d,
        x,
        y,
    };
};

function LinearAlgebra({ onSuccess }: LinearAlgebraProps) {
    const [question, setQuestion] = useState(generateQuestion);
    const [xAnswer, setXAnswer] = useState("");
    const [yAnswer, setYAnswer] = useState("");
    const [round, setRound] = useState(1);
    const [error, setError] = useState("");

    const result1 =
        question.a * question.x +
        question.b * question.y;

    const result2 =
        question.c * question.x +
        question.d * question.y;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const x = Number(xAnswer);
        const y = Number(yAnswer);

        if (x !== question.x || y !== question.y) {
            setError("Incorrect. Check your calculations.");
            return;
        }

        if (round === 2) {
            setError("");

            setTimeout(() => {
                onSuccess();
            }, 600);

            return;
        }

        setQuestion(generateQuestion());
        setXAnswer("");
        setYAnswer("");
        setError("");
        setRound((prev) => prev + 1);
    };

    return (
        <div className="w-[440px] max-w-[90vw] rounded-2xl bg-white p-7 shadow-2xl">

            <p className="mb-1 text-sm text-gray-400">
                Challenge 4
            </p>

            <h2 className="text-2xl font-semibold text-gray-900">
                Linear Algebra
            </h2>

            <p className="mt-1 mb-6 text-sm text-gray-500">
                Solve the system of equations.
            </p>

            <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-6">

                <p className="mb-4 text-center text-sm text-gray-400">
                    Find x and y
                </p>

                <div className="flex items-center justify-center gap-4">

                    <div className="text-lg leading-8 text-gray-900">
                        <div>
                            {question.a}x + {question.b}y
                        </div>

                        <div>
                            {question.c}x + {question.d}y
                        </div>
                    </div>

                    <div className="text-lg text-gray-400">
                        =
                    </div>

                    <div className="text-lg leading-8 font-medium text-gray-900">
                        <div>{result1}</div>
                        <div>{result2}</div>
                    </div>

                </div>
            </div>

            <form onSubmit={handleSubmit}>

                <div className="flex gap-3">

                    <input
                        type="number"
                        value={xAnswer}
                        onChange={(e) => setXAnswer(e.target.value)}
                        placeholder="x"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <input
                        type="number"
                        value={yAnswer}
                        onChange={(e) => setYAnswer(e.target.value)}
                        placeholder="y"
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                </div>

                {error && (
                    <p className="mt-2 text-sm text-red-500">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="mt-4 w-full rounded-lg bg-blue-600 p-2.5 font-medium text-white transition hover:bg-blue-700"
                >
                    Submit
                </button>

            </form>

            <div className="mt-4 text-center text-xs text-gray-400">
                Problem {round} / 2
            </div>

        </div>
    );
}

export default LinearAlgebra;