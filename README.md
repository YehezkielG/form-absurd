# Ruang Pengaduan 

> Masalah sehari-hari seharusnya mudah disampaikan. Di sini, bahkan untuk membuka formulir saja ada prosedurnya.

**Ruang Pengaduan** adalah project satire berbentuk formulir pengaduan masyarakat. Pengunjung mengetuk pintu ruang birokrasi, memilih masalah yang dekat dengan kehidupan sehari-hari, lalu menghadapi serangkaian persyaratan dan tantangan sebelum bisa mengirim pengaduan.

Project ini dibuat sebagai tugas desain formulir menggunakan React. Ceritanya menyindir proses pengaduan yang terasa berbelit: keluhan sederhana diikuti data yang tidak relevan, tantangan berlapis, dan status tindak lanjut yang serba tidak pasti.

## Alur aplikasi

1. Pengunjung melihat pintu **Ruang Pengaduan**.
2. Setelah pintu diklik, aplikasi menanyakan masalah sehari-hari yang ingin diadukan.
3. Pengunjung memilih topik dan mengambil nomor antrean untuk masuk ke formulir.
4. Kolom formulir terbuka satu per satu setelah pengunjung menyelesaikan enam tantangan.
5. Setelah formulir dikirim, aplikasi menampilkan tanda terima pengaduan dan status proses yang bernuansa satire.

Enam tantangan memakai komponen berikut:

| Kolom yang dibuka | Tantangan |
| --- | --- |
| Nama | Verifikasi manusia |
| Email | Tic-tac-toe |
| Jenis kelamin | Memory match |
| NIM/NIK | Soal aljabar linear |
| Data pembayaran | Sudoku |
| Isi pengaduan | Catur |

## Menjalankan project

Pastikan Node.js dan npm sudah terpasang. Dari folder project, jalankan:

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan Vite di terminal.

### Konfigurasi verifikasi manusia

Tantangan pertama memakai Cloudflare Turnstile. Atur site key Turnstile pada file `.env` di root project:

```env
VITE_TURNSTILE_SITE_KEY=site-key-anda
```

Gunakan site key yang diizinkan untuk domain lokal saat development. Variabel berawalan `VITE_` tersedia di browser, jadi isikan site key publik, bukan secret key.

Perintah lain yang tersedia:

```bash
npm run build   # memeriksa TypeScript dan membuat build produksi di dist/
npm run preview # melihat build produksi secara lokal
npm run lint    # menjalankan ESLint
```

## Teknologi

- React dan TypeScript
- Vite
- Tailwind CSS
- Lucide React untuk ikon
- `chess.js` dan `react-chessboard` untuk tantangan catur
- React Turnstile untuk komponen verifikasi manusia

## Struktur utama

```text
src/
├── App.tsx                 # Lobby, pintu, pertanyaan awal, dan alur masuk
├── global.css              # Gaya lobby, formulir, dialog, dan layar selesai
├── main.tsx                # Entry point React
└── components/
    ├── Form.tsx            # Form pengaduan dan pengaturan tantangan
    ├── ProofHuman.tsx      # Tantangan verifikasi manusia
    ├── TTC.tsx             # Tantangan tic-tac-toe
    ├── MemoryMatch.tsx     # Tantangan memory match
    ├── LinearAlgebra.tsx   # Tantangan aljabar linear
    ├── Sudoku.tsx          # Tantangan Sudoku
    └── Chess.tsx           # Tantangan catur
```

## Catatan

Project ini adalah simulasi front-end untuk tujuan pembelajaran dan satire. Data formulir tidak dikirim ke server atau instansi pemerintah.
