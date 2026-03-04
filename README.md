# 🏛️ Sistem Transparansi Dana Desa Wonokerso

Website transparansi dana desa yang modern, responsif, dan terintegrasi dengan Google Spreadsheet sebagai database.

**Desa Wonokerso, Kecamatan Pakisaji, Kabupaten Malang - Tahun 2026**

## ✨ Fitur Utama

### 📊 Dashboard
- Total anggaran, realisasi, dan sisa anggaran
- Ringkasan program terbaru
- Visualisasi data real-time

### 📋 Data Program
- Daftar lengkap program dana desa
- Filter berdasarkan kategori dan status
- Pencarian program
- Detail program lengkap

### 📈 Grafik & Visualisasi
- Distribusi anggaran per kategori (Pie Chart)
- Perbandingan anggaran vs realisasi (Bar Chart)
- Status pelaksanaan program (Doughnut Chart)
- Persentase realisasi per kategori

### 🔐 Admin Panel
- Login sederhana
- Tambah program baru dari web
- Hapus program
- Data otomatis masuk ke Google Spreadsheet

## 🚀 Quick Start

### Opsi 1: Deploy ke Vercel (Recommended)

Website bisa online dalam 5 menit!

1. **Upload ke GitHub** (drag & drop file)
2. **Deploy ke Vercel** (klik import)
3. **Update Apps Script** (tambah CORS support)

📖 **Panduan lengkap:** `QUICK_DEPLOY.md` atau `DEPLOY.md`

### Opsi 2: Jalankan Lokal

### 1. Setup Google Spreadsheet

1. Buat Google Spreadsheet baru
2. Buat 2 sheet:
   - `DATA_DESA` (info desa)
   - `PROGRAM_DANA_DESA` (data program)
3. Isi struktur data sesuai panduan

📖 **Panduan lengkap:** `docs/GOOGLE_APPS_SCRIPT.md`

### 2. Setup Google Apps Script

1. Di Spreadsheet: Extensions → Apps Script
2. Copy kode dari file `Code.gs`
3. Save dan Deploy sebagai Web App
4. Copy URL deployment

📖 **Panduan lengkap:** `docs/GOOGLE_APPS_SCRIPT.md`

### 3. Konfigurasi Website

1. Buka file `js/app.js`
2. Ganti `SPREADSHEET_URL` dengan URL Apps Script Anda
3. Save file

### 4. Buka Website

1. Buka `index.html` di browser
2. Data akan otomatis dimuat dari spreadsheet

## 📁 Struktur Project

```
sistem-transparansi-dana-desa/
├── index.html              # Dashboard utama
├── program.html            # Halaman data program
├── grafik.html             # Halaman visualisasi grafik
├── detail.html             # Detail program
├── admin.html              # Admin panel
├── test-connection.html    # Tool untuk test koneksi
├── js/
│   └── app.js             # Logic aplikasi
├── docs/
│   ├── GOOGLE_APPS_SCRIPT.md    # Setup Apps Script
│   ├── AKTIVASI_ADMIN.md        # Panduan admin panel
│   ├── DEBUG_KONEKSI.md         # Troubleshooting
│   ├── LANGKAH_PERBAIKAN.md     # Perbaikan error
│   └── TROUBLESHOOTING.md       # FAQ
├── Code.gs                 # Kode Google Apps Script
└── README.md              # File ini
```

## 🎨 Teknologi

- **Frontend:** HTML5, TailwindCSS, JavaScript
- **Charts:** Chart.js
- **Icons:** Font Awesome
- **Backend:** Google Apps Script
- **Database:** Google Spreadsheet

## 🔐 Login Admin

**Default credentials:**
- Username: `admin`
- Password: `admin123`

📖 **Cara ganti password:** `docs/AKTIVASI_ADMIN.md`

## 📖 Dokumentasi

| Dokumen | Deskripsi |
|---------|-----------|
| `docs/GOOGLE_APPS_SCRIPT.md` | Setup Google Apps Script & Spreadsheet |
| `docs/AKTIVASI_ADMIN.md` | Cara menggunakan admin panel |
| `docs/DEBUG_KONEKSI.md` | Troubleshooting koneksi |
| `docs/LANGKAH_PERBAIKAN.md` | Perbaikan error umum |
| `docs/TROUBLESHOOTING.md` | FAQ dan solusi masalah |

## 🧪 Testing

### Test Koneksi
Buka `test-connection.html` untuk test koneksi ke Google Apps Script

### Test Manual
1. Buka Apps Script Editor
2. Run function `testGetDesa` atau `testGetPrograms`
3. Lihat hasil di Execution log

## 🎯 Cara Menambah Data

### Opsi 1: Via Admin Panel (Recommended)
1. Buka `admin.html`
2. Login dengan admin/admin123
3. Isi form dan submit
4. Data otomatis masuk ke spreadsheet

### Opsi 2: Edit Langsung di Spreadsheet
1. Buka Google Spreadsheet
2. Edit sheet `PROGRAM_DANA_DESA`
3. Refresh website untuk melihat perubahan

## 🔄 Update Data

Data di website akan otomatis update setiap kali:
- Halaman di-refresh
- Navigasi antar halaman
- Setelah tambah/hapus data via admin

## 🎨 Kustomisasi

### Ganti Warna
Edit di setiap file HTML bagian `tailwind.config`:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#10b981',    // Warna hijau utama
                secondary: '#059669',  // Warna hijau gelap
            }
        }
    }
}
```

### Ganti Logo/Nama
Edit di setiap file HTML bagian header

## 🐛 Troubleshooting

### Data tidak muncul?
1. Cek nama sheet: harus `DATA_DESA` dan `PROGRAM_DANA_DESA`
2. Cek URL di `js/app.js` sudah benar
3. Buka `test-connection.html` untuk diagnosa
4. Lihat Console browser (F12) untuk error

📖 **Panduan lengkap:** `docs/DEBUG_KONEKSI.md`

### Error di Apps Script?
1. Pastikan kode dari `Code.gs` sudah di-copy lengkap
2. Deploy dengan version baru
3. Test dengan function `testGetDesa`

📖 **Panduan lengkap:** `docs/LANGKAH_PERBAIKAN.md`

## 📱 Browser Support

- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Edge
- ✅ Safari
- ✅ Mobile browsers

## 🔒 Keamanan

- Data tersimpan di Google Spreadsheet (private)
- Apps Script berjalan di server Google
- Login admin sederhana (client-side)
- Untuk production, gunakan Google Authentication

## 📊 Format Data

### Sheet DATA_DESA
| Kolom | Tipe | Contoh |
|-------|------|--------|
| id_desa | Number | 1 |
| nama_desa | Text | Desa Sukamaju |
| kecamatan | Text | Kecamatan Makmur |
| kabupaten | Text | Kabupaten Sejahtera |
| tahun | Number | 2024 |
| total_anggaran | Number | 1500000000 |

### Sheet PROGRAM_DANA_DESA
| Kolom | Tipe | Contoh |
|-------|------|--------|
| id_program | Number | 1 |
| id_desa | Number | 1 |
| nama_program | Text | Pembangunan Jalan |
| kategori | Text | Infrastruktur |
| anggaran | Number | 500000000 |
| realisasi | Number | 450000000 |
| tanggal_mulai | Date | 2024-01-15 |
| tanggal_selesai | Date | 2024-06-30 |
| status | Text | Proses |
| keterangan | Text | Deskripsi program |

## 🎯 Roadmap

- [x] Dashboard dengan ringkasan
- [x] Tabel data program dengan filter
- [x] Grafik visualisasi
- [x] Detail program
- [x] Admin panel (tambah/hapus)
- [ ] Edit program via web
- [ ] Upload foto program
- [ ] Export laporan PDF
- [ ] Notifikasi email
- [ ] Google Authentication

## 📞 Support

Jika ada pertanyaan atau masalah:
1. Cek dokumentasi di folder `docs/`
2. Buka `test-connection.html` untuk diagnosa
3. Lihat Console browser (F12) untuk error detail

## 📄 License

Free to use untuk keperluan pemerintahan desa.

## 🙏 Credits

Dibuat dengan ❤️ untuk transparansi dana desa Indonesia.

---

**Selamat menggunakan Sistem Transparansi Dana Desa!** 🎉
