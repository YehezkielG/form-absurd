import { useState } from "react";
import { ArrowRight, Building2, FileQuestion, Landmark, X } from "lucide-react";
import Form from "./components/Form";

const dailyIssues = [
  "Jalan berlubang atau trotoar yang tiba-tiba menghilang",
  "Sampah belum diangkut, selokan mampet, atau banjir langganan",
  "Layanan publik yang meminta berkas tambahan untuk mengurus berkas",
  "Masalah sehari-hari lainnya yang entah harus dilaporkan ke mana",
];

export default function App() {
  const [questionOpen, setQuestionOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState("");
  const [insideOffice, setInsideOffice] = useState(false);

  return (
    <main className="bureau-page">
      <header className="bureau-topbar">
        <a className="bureau-brand" href="#awal"><span className="bureau-brand-icon"><Landmark size={18} /></span><span>RUANG <b>PENGADUAN</b></span></a>
        <span className="bureau-topnote"><span className="office-light" /> PELAYANAN TERBUKA — SELAMA JAM KERJA</span>
        <span className="bureau-reference">RUANG PENGADUAN / 001</span>
      </header>

      {!insideOffice ? (
        <section className="bureau-lobby" id="awal">
          <div className="lobby-copy">
            <p className="bureau-eyebrow"><span /> SELAMAT DATANG DI PUSAT PENGADUAN</p>
            <h1>Masalahnya sehari-hari.<br /><em>Prosesnya?</em> Tidak selalu.</h1>
            <p className="lobby-description">Jalan berlubang, sampah tak terangkut, atau urusan yang berputar-putar. Sampaikan keluhan Anda di sini—setelah melewati prosedur pembukaan pintu.</p>
            <div className="lobby-notice"><FileQuestion size={18} /><span><b>Sebelum masuk</b><br />Siapkan kesabaran. Berkas pendukung akan diminta pada tahap berikutnya.</span></div>
          </div>

          <div className="door-area">
            <div className="office-sign"><Building2 size={14} /><span>GEDUNG PELAYANAN TERPADU</span><small>“Terpadu” dalam tanda kutip tidak termasuk.</small></div>
            <button className="office-door" onClick={() => setQuestionOpen(true)} aria-label="Ketuk pintu ruang pengaduan">
              <span className="door-number">08</span>
              <span className="door-plaque"><small>RUANG</small><b>PENGADUAN</b><small>KETUK / KLIK UNTUK MASUK</small></span>
              <span className="door-handle" />
              <span className="door-knock">KLIK PINTU <ArrowRight size={13} /></span>
            </button>
            <div className="door-threshold" />
            <p className="door-caption">LOKET 08 <span>•</span> PENGADUAN MASYARAKAT</p>
          </div>
        </section>
      ) : (
        <section className="office-inside">
          <div className="inside-heading"><div><p className="bureau-eyebrow"><span /> ANDA BERHASIL MASUK</p><h1>Formulir pengaduan <em>warga</em></h1><p>Keluhan sederhana, persyaratan berlapis. Silakan mulai dari kolom pertama.</p><p className="selected-topic"><b>Topik aduan:</b> {selectedIssue}</p></div><div className="inside-stamp"><Building2 size={18} /><span>LOKET<br /><b>08</b></span></div></div>
          <Form />
          <p className="inside-footnote">PENGADUAN ANDA AKAN DIPROSES SESUAI ALUR YANG BERLAKU. ALUR DAPAT BERUBAH TANPA PEMBERITAHUAN.</p>
        </section>
      )}

      <footer className="bureau-footer"><span>REPUBLIK FORMULIR YANG BELUM SELESAI</span><span>AMBIL NOMOR ANTREAN ANDA. NOMOR ANTREAN SEDANG DIPERIKSA.</span></footer>

      {questionOpen && (
        <div className="question-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setQuestionOpen(false); }}>
          <section className="question-dialog" role="dialog" aria-modal="true" aria-labelledby="question-title">
            <button className="dialog-close" onClick={() => setQuestionOpen(false)} aria-label="Tutup"><X size={18} /></button>
            <div className="dialog-kicker"><span>PERTANYAAN AWAL</span><span>SEBELUM LOKET BERIKUTNYA</span></div>
            <div className="dialog-icon"><FileQuestion size={20} /></div>
            <h2 id="question-title">Apa yang ingin Anda adukan?</h2>
            <p className="dialog-description">Pilih masalah yang paling dekat dengan keseharian. Ini membantu kami menentukan meja yang tepat untuk meneruskan Anda.</p>
            <div className="issue-options">
              {dailyIssues.map(issue => <button key={issue} type="button" className={`issue-option ${selectedIssue === issue ? "issue-selected" : ""}`} onClick={() => setSelectedIssue(issue)}><span className="radio-dot" />{issue}</button>)}
            </div>
            <button className="queue-button" disabled={!selectedIssue} onClick={() => { setQuestionOpen(false); setInsideOffice(true); }}>Ambil nomor antrean <ArrowRight size={16} /></button>
            <p className="dialog-footnote">Perkiraan waktu tunggu: bergantung pada banyak faktor, termasuk faktor.</p>
          </section>
        </div>
      )}
    </main>
  );
}
