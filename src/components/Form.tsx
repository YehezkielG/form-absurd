import { User, Mail, VenusAndMars, IdCard, CreditCard, Calendar, LockKeyhole, MessageSquare, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import ProofHuman from "./ProofHuman";
import TicTacToe from "./TTC";
import MemoryMatch from "./MemoryMatch";
import LinearAlgebra from "./LinearAlgebra";
import Sudoku from "./Sudoku";
import Chess from "./Chess";

export default function Form() {
    const [challenge, setChallenge] = useState(0);
    const [showChallenge, setShowChallenge] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [nameUnlocked, setNameUnlocked] = useState(false);
    const [emailUnlocked, setEmailUnlocked] = useState(false);
    const [genderUnlocked, setGenderUnlocked] = useState(false);
    const [studentIdUnlocked, setStudentIdUnlocked] = useState(false);
    const [paymentUnlocked, setPaymentUnlocked] = useState(false);
    const [messageUnlocked, setMessageUnlocked] = useState(false);

    const [cardNumber, setCardNumber] = useState("");
    const [validThru, setValidThru] = useState("");
    const [cvc, setCvc] = useState("");
    const [message, setMessage] = useState("");

    const allUnlocked =
        nameUnlocked && emailUnlocked && genderUnlocked &&
        studentIdUnlocked && paymentUnlocked && messageUnlocked;

    // Additional state for challenge 6 variant moves
    const [moveLimit, setMoveLimit] = useState<number | null>(null);
    const [movesUsed, setMovesUsed] = useState(0);
    const [showTryAgain, setShowTryAgain] = useState(false);

    const submitEnabled = allUnlocked;

    const handleChallengeSolved = () => {
        const unlock = () => {
            if (challenge === 1) setNameUnlocked(true);
            if (challenge === 2) setEmailUnlocked(true);
            if (challenge === 3) setGenderUnlocked(true);
            if (challenge === 4) setStudentIdUnlocked(true);
            if (challenge === 5) setPaymentUnlocked(true);
            if (challenge === 6) setMessageUnlocked(true);
            // Reset move tracking for challenge 6
            setMoveLimit(null);
            setMovesUsed(0);
            setShowTryAgain(false);
            setShowChallenge(false);
        };
        // Variable delay based on challenge number; challenge 1 has longer delay
        const delays: Record<number, number> = {1: 1500, 2: 800, 3: 800, 4: 800, 5: 800, 6: 800};
        const delay = delays[challenge] || 800;
        setTimeout(unlock, delay);
    };

    const openChallenge = (number: number) => {
        setChallenge(number);
        // For challenge 6, decide move limit variant (2 or 3 moves)
        if (number === 6) {
            const limit = Math.random() < 0.5 ? 2 : 3;
            setMoveLimit(limit);
            setMovesUsed(0);
            setShowTryAgain(false);
        }
        setShowChallenge(true);
    };

    const formatCardNumber = (value: string) => {
        const digits = value.replace(/\D/g, "").slice(0, 16);
        return digits.replace(/(\d{4})(?=\d)/g, "$1-");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!submitEnabled) return;
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bureau-success" role="status">
                <div className="success-topline"><span>BERKAS / PENGADUAN</span><span>STATUS: DITERIMA</span></div>
                <div className="success-body">
                    <div className="success-seal"><CheckCircle2 size={30} /></div>
                    <p className="success-kicker">SELURUH TAHAPAN BERHASIL DILEWATI</p>
                    <h1>Pengaduan Anda<br /><em>resmi tercatat.</em></h1>
                    <p className="success-copy">Enam tantangan sudah dituntaskan hanya untuk menyampaikan satu keluhan. Berkas kini diteruskan ke meja berikutnya—meja yang mana, sedang dikonfirmasi.</p>
                    <div className="process-steps" aria-label="Enam tahapan selesai">
                        {[1, 2, 3, 4, 5, 6].map(step => <span key={step} className="process-step"><CheckCircle2 size={14} /><small>TAHAP {step}</small></span>)}
                    </div>
                    <div className="receipt-card">
                        <div><span>STATUS SAAT INI</span><b><i /> Diterima di loket</b></div>
                        <div><span>LANGKAH BERIKUTNYA</span><b>Verifikasi → disposisi → rapat koordinasi</b></div>
                        <div><span>ESTIMASI KABAR</span><b>Silakan menunggu. Mohon tidak menanyakan estimasi.</b></div>
                    </div>
                    <p className="success-disclaimer">Ini simulasi satire. Pengaduan tidak dikirim ke instansi mana pun.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="bureau-form flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-xl">
                <p className="form-overline">PERSYARATAN PEMOHON / FORM-08</p>
                <h2 className="text-2xl font-bold text-gray-800">Formulir pengaduan</h2>
                <p className="mb-2 text-sm text-gray-500">Lengkapi data berikut. Setiap kolom memiliki prosedur pembukaannya sendiri.</p>

                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" placeholder="Nama lengkap" aria-label="Nama lengkap" readOnly={!nameUnlocked}
                        onFocus={() => !nameUnlocked && openChallenge(1)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 pl-10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>

                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="email" placeholder="Email aktif untuk kabar selanjutnya" aria-label="Email" readOnly={!emailUnlocked}
                        onFocus={() => !emailUnlocked && openChallenge(2)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 pl-10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>

                <div className="relative" onClick={() => !genderUnlocked && openChallenge(3)}>
                    <VenusAndMars className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <select disabled={!genderUnlocked}
                        className={`w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 pl-10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${!genderUnlocked ? "pointer-events-none" : ""}`}>
                        <option value="">- pilih jenis kelamin</option>
                        {genderUnlocked && <>
                            <option value="male">Laki-laki</option>
                            <option value="female">Perempuan</option>
                            <option value="prefer not to say">Tidak ingin menyebutkan</option>
                        </>}
                    </select>
                </div>

                <div className="relative">
                    <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input placeholder="NIM / NIK pemohon" aria-label="NIM atau NIK pemohon" readOnly={!studentIdUnlocked}
                        onFocus={() => !studentIdUnlocked && openChallenge(4)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 pl-10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>

                <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Nomor kartu pembayaran"
                        aria-label="Nomor kartu pembayaran"
                        value={cardNumber}
                        readOnly={!paymentUnlocked}
                        onFocus={() => !paymentUnlocked && openChallenge(5)}
                        onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 pl-10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <div className="flex gap-2">
                    <div className="relative w-full">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="month"
                            value={validThru}
                            readOnly={!paymentUnlocked}
                            onFocus={() => !paymentUnlocked && openChallenge(5)}
                            onChange={e => setValidThru(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 pl-10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div className="relative w-full">
                        <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={3}
                            placeholder="CVC"
                            value={cvc}
                            readOnly={!paymentUnlocked}
                            onFocus={() => !paymentUnlocked && openChallenge(5)}
                            onChange={e => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 pl-10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                </div>

                <p className="text-xs text-red-400">
                    Wajib untuk verifikasi administrasi. (Kami juga tidak tahu kenapa.)
                </p>

                <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                    <textarea
                        placeholder="Ceritakan pengaduan Anda di sini…"
                        aria-label="Isi pengaduan"
                        rows={3}
                        value={message}
                        readOnly={!messageUnlocked}
                        onFocus={() => !messageUnlocked && openChallenge(6)}
                        onChange={e => setMessage(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 pl-10 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        // Display remaining moves for challenge 6
                        // Optional visual cue for moves left
                        data-moves-left={challenge === 6 && moveLimit !== null ? moveLimit - movesUsed : undefined}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!submitEnabled}
                    className="rounded-lg bg-blue-600 p-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                    Kirim pengaduan
                </button>
            </form>

            {showChallenge && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-md">
        {challenge === 1 && <ProofHuman onSuccess={handleChallengeSolved} />}
        {challenge === 2 && <TicTacToe onSuccess={handleChallengeSolved} />}
        {challenge === 3 && <MemoryMatch onSuccess={handleChallengeSolved} />}
        {challenge === 4 && <LinearAlgebra onSuccess={handleChallengeSolved} />}
        {challenge === 5 && <Sudoku onSuccess={handleChallengeSolved} />}
        {challenge === 6 && (
            <div className="relative">
                <Chess
                    onSuccess={handleChallengeSolved}
                    onMove={() => {
                        setMovesUsed(prev => {
                            const newCount = prev + 1;
                            if (moveLimit && newCount >= moveLimit) {
                                setShowTryAgain(true);
                            }
                            return newCount;
                        });
                    }}
                />
                {showTryAgain && (
                    <button
                        onClick={() => {
                            // Reset and retry challenge 6
                            setShowChallenge(false);
                            setShowTryAgain(false);
                            openChallenge(6);
                        }}
                        className="mt-4 rounded bg-red-500 p-2 text-white hover:bg-red-600"
                    >
                        Try Again
                    </button>
                )}
            </div>
        )}
    </div>
)}
        </>
    );
}
