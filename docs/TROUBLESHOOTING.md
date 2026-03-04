# Troubleshooting Guide

## Error: "Action tidak valid"

### Penyebab
- URL Google Apps Script salah
- Parameter tidak terkirim dengan benar
- Apps Script belum di-deploy dengan benar

### Solusi Lengkap

#### Langkah 1: Deploy Ulang Apps Script

1. Buka Google Spreadsheet Anda
2. Klik **Extensions** > **Apps Script**
3. Pastikan semua kode sudah di-paste dengan benar
4. Klik **Save** (ikon disk)
5. Klik **Deploy** > **Manage deployments**
6. Jika sudah ada deployment:
   - Klik ikon **pensil** (Edit)
   - Ubah **Version** menjadi "New version"
   - Klik **Deploy**
7. Jika belum ada deployment:
   - Klik **Deploy** > **New deployment**
   - Klik ikon **gear** > Pilih **Web app**
   - Isi:
     - Description: "API Dana Desa v1"
     - Execute as: **Me** (email Anda)
     - Who has access: **Anyone**
   - Klik **Deploy**
8. **COPY URL yang muncul** - Harus berbentuk:
   ```
   https://script.google.com/macros/s/AKfycbxxx.../exec
   ```

#### Langkah 2: Authorize Script

Saat pertama kali deploy, Google akan minta authorization:

1. Klik **Authorize access**
2. Pilih akun Google Anda
3. Klik **Advanced** (jika muncul warning)
4. Klik **Go to [Project Name] (unsafe)**
5. Klik **Allow**

#### Langkah 3: Update URL di Website

1. Buka file `js/app.js`
2. Cari baris:
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
4. Save file

#### Langkah 4: Test URL

Buka browser dan akses URL ini:
```
https://script.google.com/macros/s/[YOUR_SCRIPT_ID]/exec?action=getDesa
```

Harusnya muncul response JSON seperti:
```json
{
  "status": "success",
  "message": "Success",
  "data": {
    "id_desa": 1,
    "nama_desa": "Desa Sukamaju",
    ...
  }
}
```

## Error: Data Tidak Muncul

### Cek Nama Sheet

Pastikan nama sheet di Spreadsheet PERSIS seperti ini:
- `DATA_DESA` (huruf besar semua)
- `PROGRAM_DANA_DESA` (huruf besar semua)

### Cek Struktur Data

#### Sheet DATA_DESA harus punya kolom (baris 1):
```
id_desa | nama_desa | kecamatan | kabupaten | tahun | total_anggaran
```

#### Sheet PROGRAM_DANA_DESA harus punya kolom (baris 1):
```
id_program | id_desa | nama_program | kategori | anggaran | realisasi | tanggal_mulai | tanggal_selesai | status | keterangan
```

### Cek Data di Baris 2

Pastikan ada data di baris 2 (baris pertama setelah header)

## Error: CORS / Cross-Origin

Jika muncul error CORS di console browser:

### Solusi:
1. Pastikan deployment setting "Who has access" = **Anyone**
2. Re-deploy dengan version baru
3. Clear browser cache (Ctrl + Shift + Delete)
4. Refresh halaman (Ctrl + F5)

## Error: Authorization Required

### Solusi:
1. Buka Apps Script
2. Klik **Deploy** > **Manage deployments**
3. Edit deployment
4. Pastikan "Execute as" = **Me**
5. Pastikan "Who has access" = **Anyone**
6. Deploy ulang

## Testing Step by Step

### Test 1: Cek Apps Script
```
https://script.google.com/macros/s/[SCRIPT_ID]/exec?action=getDesa
```
Harus return JSON dengan status success

### Test 2: Cek Console Browser
1. Buka website (index.html)
2. Tekan F12
3. Lihat tab Console
4. Cari error merah
5. Screenshot dan analisa

### Test 3: Cek Network Tab
1. Buka website
2. Tekan F12
3. Tab Network
4. Refresh halaman
5. Cari request ke script.google.com
6. Klik request tersebut
7. Lihat Response

## Contoh URL yang BENAR vs SALAH

### ✅ BENAR:
```
https://script.google.com/macros/s/AKfycbxxx.../exec
```

### ❌ SALAH:
```
https://script.google.com/home/projects/xxx
https://script.googleusercontent.com/...
https://docs.google.com/spreadsheets/...
```

## Masih Bermasalah?

1. Pastikan Spreadsheet tidak dalam mode "Private"
2. Coba buka URL Apps Script di Incognito/Private browsing
3. Cek apakah ada typo di nama sheet
4. Pastikan ada data di baris 2 (setelah header)
5. Coba deploy ulang dengan version baru
