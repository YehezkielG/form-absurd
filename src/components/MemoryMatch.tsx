import { useState } from "react";

type Card = {
    id: number;
    value: string;
    matched: boolean;
};

const values = ["●", "■", "▲", "◆"];

const createCards = (): Card[] =>
    [...values, ...values]
        .sort(() => Math.random() - 0.5)
        .map((value, index) => ({
            id: index,
            value,
            matched: false,
        }));

interface MemoryMatchProps {
    onSuccess: () => void;
}

function MemoryMatch({ onSuccess }: MemoryMatchProps) {
    const [cards, setCards] = useState<Card[]>(createCards);
    const [selected, setSelected] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [locked, setLocked] = useState(false);

    const handleCardClick = (index: number) => {
        if (
            locked ||
            selected.includes(index) ||
            cards[index].matched
        ) {
            return;
        }

        const newSelected = [...selected, index];
        setSelected(newSelected);

        if (newSelected.length !== 2) return;

        setLocked(true);
        setMoves((prev) => prev + 1);

        const [first, second] = newSelected;

        if (cards[first].value === cards[second].value) {
            setTimeout(() => {
                setCards((prev) =>
                    prev.map((card, index) =>
                        index === first || index === second
                            ? { ...card, matched: true }
                            : card
                    )
                );

                setSelected([]);
                setLocked(false);

                const matchedCount =
                    cards.filter((card) => card.matched).length + 2;

                if (matchedCount === cards.length) {
                    setTimeout(onSuccess, 700);
                }
            }, 400);
        } else {
            setTimeout(() => {
                setSelected([]);
                setLocked(false);
            }, 700);
        }
    };

    const resetGame = () => {
        setCards(createCards());
        setSelected([]);
        setMoves(0);
        setLocked(false);
    };

    return (
        <div className="w-[440px] max-w-[90vw] rounded-2xl bg-white p-7 shadow-2xl">
            <p className="mb-1 text-sm text-gray-400">
                Challenge 3
            </p>

            <h2 className="text-2xl font-semibold text-gray-900">
                Memory Match
            </h2>

            <p className="mt-1 mb-6 text-sm text-gray-500">
                Match all pairs to continue.
            </p>

            <div className="mx-auto grid w-[280px] grid-cols-4 gap-2">
                {cards.map((card, index) => {
                    const isVisible =
                        selected.includes(index) || card.matched;

                    return (
                        <button
                            key={card.id}
                            onClick={() => handleCardClick(index)}
                            className={`flex h-16 items-center justify-center rounded-xl border text-xl transition ${
                                isVisible
                                    ? "border-gray-200 bg-gray-50 text-gray-900"
                                    : "border-gray-200 bg-white text-transparent hover:bg-gray-50"
                            }`}
                        >
                            {isVisible ? card.value : "?"}
                        </button>
                    );
                })}
            </div>

            <div className="mt-5 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    Moves: {moves}
                </p>

                <button
                    onClick={resetGame}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    Restart
                </button>
            </div>
        </div>
    );
}

export default MemoryMatch;