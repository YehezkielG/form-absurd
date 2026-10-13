import { Turnstile } from "@marsidev/react-turnstile";

type ProofHumanProps = {
    onSuccess: (token: string) => void;
};

function ProofHuman({ onSuccess }: ProofHumanProps) {
    return (
        <div className="w-[400px] max-w-[90vw] rounded-2xl bg-white px-7 py-6 shadow-2xl">
            <p className="text-sm text-gray-400">
                Challenge 1
            </p>

            <h2 className="mt-1 text-2xl font-semibold text-gray-900">
                Are you human?
            </h2>

            <p className="mt-1 text-sm text-gray-500">
                Please verify that you are a human to continue.
            </p>

            <div className="mt-6 flex justify-center">
                <Turnstile
                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                    onSuccess={onSuccess}
                    options={{
                        theme: "light",
                        language: "en",
                    }}
                />
            </div>
        </div>
    );
}

export default ProofHuman;
