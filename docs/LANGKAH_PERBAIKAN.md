# Langkah Perbaikan - Data Tidak Muncul

## Masalah yang Mungkin Terjadi:
1. Nama sheet tidak sesuai
2. Format data di spreadsheet salah
3. Apps Script belum di-authorize dengan benar
4. URL tidak update di website

---

## LANGKAH 1: Cek Nama Sheet di Spreadsheet

Buka Google Spreadsheet Anda, pastikan nama sheet PERSIS seperti ini:

### Sheet 1: `DATA_DESA`
- Nama harus huruf besar semua
- Tidak ada spasi di depan/belakang

### Sheet 2: `PROGRAM_DANA_DESA`
- Nama harus huruf besar semua
- Tidak ada spasi di depan/belakang

**Cara rename sheet:**
1. Klik kanan pada tab sheet di bawah
2. Pilih "Rename"
3. Ketik nama yang benar
4. Tekan Enter

---

## LANGKAH 2: Cek Format Data

### Sheet DATA_DESA

**Baris 1 (Header):**
```
id_desa | nama_desa | kecamatan | kabupaten | tahun | total_anggaran
```

**Baris 2 (Data):**
```
1 | Desa Sukamaju | Kecamatan Makmur | Kabupaten Sejahtera | 2024 | 1500000000
```

**PENTING:**
- Kolom `id_desa` harus angka (1, 2, 3, ...)
- Kolom `tahun` harus angka (2024)
- Kolom `total_anggaran` harus angka tanpa titik/koma (1500000000)

### Sheet PROGRAM_DANA_DESA

**Baris 1 (Header):**
```
id_program | id_desa | nama_program | kategori | anggaran | realisasi | tanggal_mulai | tanggal_selesai | status | keterangan
```

**Baris 2 (Contoh Data):**
```
1 | 1 | Pembangunan Jalan Desa | Infrastruktur | 500000000 | 450000000 | 2024-01-15 | 2024-06-30 | Proses | Jalan sepanjang 2 km
```

**PENTING:**
- `id_program` harus angka (1, 2, 3, ...)
- `id_desa` harus angka (1)
- `kategori` harus salah satu dari: Infrastruktur, Sosial, Pendidikan, Kesehatan
- `anggaran` dan `realisasi` harus angka tanpa titik/koma
- `tanggal_mulai` dan `tanggal_selesai` format: YYYY-MM-DD (contoh: 2024-01-15)
- `status` harus salah satu dari: Perencanaan, Proses, Selesai

---

## LANGKAH 3: Update Apps Script

1. Buka Google Spreadsheet
2. Klik **Extensions** → **Apps Script**
3. **HAPUS SEMUA kode yang ada**
4. Buka file `docs/APPS_SCRIPT_FIXED.gs` yang baru saya buat
5. **COPY SEMUA** kode dari file tersebut
6. **PASTE** ke Apps Script Editor
7. Klik **Save** (ikon disk atau Ctrl+S)

---

## LANGKAH 4: Test Apps Script

Sebelum deploy, test dulu apakah script bisa baca data:

1. Di Apps Script Editor, pilih function `testGetDesa` dari dropdown
2. Klik **Run** (tombol play ▶)
3. Jika diminta authorization, klik **Review permissions** → **Allow**
4. Lihat hasil di **Execution log** (bawah)
5. Harusnya muncul data desa Anda

Lakukan hal yang sama untuk `testGetPrograms`

---

## LANGKAH 5: Deploy Ulang

1. Klik **Deploy** → **Manage deployments**
2. Klik ikon **pensil** (Edit) pada deployment yang ada
3. Ubah **Version** → **New version**
4. Pastikan:
   - **Execute as:** Me (email@gmail.com)
   - **Who has access:** Anyone
5. Klik **Deploy**
6. **COPY URL** yang muncul (harus berakhiran `/exec`)

---

## LANGKAH 6: Update URL di Website

1. Buka file `js/app.js`
2. Cari baris ini di bagian atas:
```javascript
const CONFIG = {
    SPREADSHEET_URL: 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE',
};
```

3. Ganti dengan URL yang baru di-copy:
```javascript
const CONFIG = {
    SPREADSHEET_URL: 'https://script.google.com/macros/s/AKfycbxxx.../exec',
};
```

4. **Save** file

---

## LANGKAH 7: Test di Browser

### Test 1: Test URL Langsung

Buka browser, paste URL ini (ganti dengan URL Anda):
```
https://script.google.com/macros/s/[YOUR_SCRIPT_ID]/exec?action=getDesa
```

**Hasil yang diharapkan:**
```json
{
  "status": "success",
  "message": "Success",
  "data": {
    "id_desa": 1,
    "nama_desa": "Desa Sukamaju",
    "kecamatan": "Kecamatan Makmur",
    "kabupaten": "Kabupaten Sejahtera",
    "tahun": 2024,
    "total_anggaran": 1500000000
  }
}
```

### Test 2: Test Get Programs

```
https://script.google.com/macros/s/[YOUR_SCRIPT_ID]/exec?action=getPrograms
```

**Hasil yang diharapkan:**
```json
{
  "status": "success",
  "message": "Success",
  "data": [
    {
      "id_program": 1,
      "nama_program": "Pembangunan Jalan Desa",
      ...
    }
  ]
}
```

### Test 3: Buka Website

1. Buka `index.html` di browser
2. Tekan **F12** untuk buka Developer Tools
3. Lihat tab **Console**
4. Refresh halaman (Ctrl+F5)
5. Lihat apakah ada error merah

---

## LANGKAH 8: Clear Cache Browser

Kadang browser masih pakai data lama:

1. Tekan **Ctrl + Shift + Delete**
2. Pilih **Cached images and files**
3. Klik **Clear data**
4. Refresh halaman (Ctrl+F5)

---

## Jika Masih Bermasalah

### Cek Console Browser:

1. Buka website
2. Tekan F12
3. Tab Console
4. Screenshot error yang muncul
5. Kirim screenshot tersebut

### Cek Network Tab:

1. Buka website
2. Tekan F12
3. Tab Network
4. Refresh halaman
5. Cari request ke `script.google.com`
6. Klik request tersebut
7. Lihat tab **Response**
8. Screenshot response-nya

---

## Checklist Troubleshooting

- [ ] Nama sheet sudah benar: `DATA_DESA` dan `PROGRAM_DANA_DESA`
- [ ] Ada data di baris 2 (setelah header)
- [ ] Format angka tidak pakai titik/koma
- [ ] Format tanggal: YYYY-MM-DD
- [ ] Apps Script sudah di-save
- [ ] Test function berhasil di Apps Script
- [ ] Deploy dengan version baru
- [ ] URL sudah di-copy dengan benar (ada `/exec`)
- [ ] URL sudah di-paste ke `js/app.js`
- [ ] File `js/app.js` sudah di-save
- [ ] Browser cache sudah di-clear
- [ ] Test URL langsung di browser berhasil
