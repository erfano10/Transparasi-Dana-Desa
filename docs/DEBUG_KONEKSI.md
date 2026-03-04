# Debug Koneksi - Data Berbeda dengan Spreadsheet

## Langkah 1: Buka File Test

1. Buka file `test-connection.html` di browser
2. URL dari `app.js` akan otomatis ter-load
3. Klik tombol **"Test getDesa"**
4. Lihat hasilnya

## Kemungkinan Hasil:

### ✅ Hasil 1: Status "success" dengan data dari spreadsheet
```json
{
  "status": "success",
  "message": "Success",
  "data": {
    "id_desa": 1,
    "nama_desa": "Desa Anda",
    ...
  }
}
```

**Artinya:** Koneksi berhasil! Data sudah benar dari spreadsheet.

**Solusi:** 
- Buka `index.html` di browser
- Tekan **Ctrl + Shift + Delete** untuk clear cache
- Pilih "Cached images and files"
- Clear data
- Refresh halaman dengan **Ctrl + F5**

---

### ❌ Hasil 2: Status "error" dengan pesan error
```json
{
  "status": "error",
  "message": "Sheet DATA_DESA tidak ditemukan"
}
```

**Artinya:** Nama sheet salah

**Solusi:**
1. Buka Google Spreadsheet
2. Pastikan nama sheet PERSIS: `DATA_DESA` (huruf besar semua)
3. Klik kanan tab sheet → Rename
4. Ketik: `DATA_DESA`
5. Test lagi

---

### ❌ Hasil 3: Error "Action tidak valid"
```json
{
  "status": "error",
  "message": "Action tidak valid: getDesa"
}
```

**Artinya:** Kode Apps Script belum update atau belum di-deploy ulang

**Solusi:**
1. Buka file `docs/APPS_SCRIPT_FIXED.gs`
2. Copy SEMUA kode
3. Buka Google Spreadsheet → Extensions → Apps Script
4. HAPUS semua kode lama
5. PASTE kode baru
6. Klik **Save** (Ctrl+S)
7. Klik **Deploy** → **Manage deployments**
8. Edit deployment → **New version**
9. Deploy
10. Test lagi

---

### ❌ Hasil 4: Error CORS atau Network Error

**Artinya:** Deployment setting salah atau URL salah

**Solusi:**
1. Buka Apps Script
2. Deploy → Manage deployments
3. Edit deployment
4. Pastikan:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Deploy dengan version baru
6. Copy URL baru
7. Paste ke `js/app.js` di bagian `SPREADSHEET_URL`
8. Save file
9. Test lagi

---

## Langkah 2: Cek Console Browser

1. Buka `index.html` di browser
2. Tekan **F12**
3. Tab **Console**
4. Refresh halaman (F5)
5. Lihat pesan di console

### Pesan yang Diharapkan:
```
Fetching data from: https://script.google.com/...?action=getDesa
Response status: 200
Response data: {status: "success", ...}
✅ Data berhasil diambil dari spreadsheet
```

### Jika Muncul:
```
❌ Error dari Apps Script: ...
⚠️ Menggunakan dummy data sebagai fallback
```

**Artinya:** Ada error dari Apps Script, tapi website tetap jalan pakai dummy data

**Solusi:** Lihat pesan error-nya, lalu ikuti solusi di atas sesuai error

---

## Langkah 3: Test URL Langsung di Browser

1. Copy URL Apps Script Anda
2. Tambahkan `?action=getDesa` di akhir
3. Contoh:
   ```
   https://script.google.com/macros/s/AKfycbxxx.../exec?action=getDesa
   ```
4. Paste di address bar browser
5. Tekan Enter

### Hasil yang Diharapkan:
Browser akan menampilkan JSON seperti ini:
```json
{
  "status": "success",
  "message": "Success",
  "data": {
    "id_desa": 1,
    "nama_desa": "Desa Anda",
    "kecamatan": "Kecamatan Anda",
    "kabupaten": "Kabupaten Anda",
    "tahun": 2024,
    "total_anggaran": 1500000000
  }
}
```

### Jika Muncul Error:
Screenshot error-nya dan cek solusi di atas

---

## Langkah 4: Cek Data di Spreadsheet

Pastikan struktur data benar:

### Sheet DATA_DESA

**Baris 1 (Header):**
| A | B | C | D | E | F |
|---|---|---|---|---|---|
| id_desa | nama_desa | kecamatan | kabupaten | tahun | total_anggaran |

**Baris 2 (Data):**
| A | B | C | D | E | F |
|---|---|---|---|---|---|
| 1 | Desa Sukamaju | Kecamatan Makmur | Kabupaten Sejahtera | 2024 | 1500000000 |

**PENTING:**
- Kolom A, E, F harus berisi ANGKA (bukan text)
- Tidak ada spasi di depan/belakang text
- Tidak ada baris kosong antara header dan data

### Sheet PROGRAM_DANA_DESA

**Baris 1 (Header):**
| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| id_program | id_desa | nama_program | kategori | anggaran | realisasi | tanggal_mulai | tanggal_selesai | status | keterangan |

**Baris 2+ (Data):**
| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 1 | Pembangunan Jalan | Infrastruktur | 500000000 | 450000000 | 2024-01-15 | 2024-06-30 | Proses | Jalan 2 km |

**PENTING:**
- Kolom A, B, E, F harus ANGKA
- Kolom D (kategori) harus: Infrastruktur / Sosial / Pendidikan / Kesehatan
- Kolom G, H (tanggal) format: YYYY-MM-DD
- Kolom I (status) harus: Perencanaan / Proses / Selesai

---

## Checklist Debugging

Centang setiap langkah yang sudah dilakukan:

- [ ] Nama sheet sudah benar: `DATA_DESA` dan `PROGRAM_DANA_DESA`
- [ ] Ada data di baris 2 (setelah header)
- [ ] Format data sudah benar (angka, tanggal, kategori, status)
- [ ] Apps Script sudah update dengan kode dari `APPS_SCRIPT_FIXED.gs`
- [ ] Apps Script sudah di-save
- [ ] Deploy dengan version baru
- [ ] URL sudah di-copy dengan benar
- [ ] URL sudah di-paste ke `js/app.js`
- [ ] File `js/app.js` sudah di-save
- [ ] Test URL langsung di browser berhasil
- [ ] Test dengan `test-connection.html` berhasil
- [ ] Browser cache sudah di-clear
- [ ] Console browser tidak ada error merah

---

## Masih Bermasalah?

Jika sudah mengikuti semua langkah tapi masih bermasalah:

1. Screenshot hasil dari `test-connection.html`
2. Screenshot Console browser (F12 → Console)
3. Screenshot Network tab (F12 → Network → request ke script.google.com)
4. Screenshot struktur data di Spreadsheet
5. Kirim semua screenshot untuk analisa lebih lanjut
