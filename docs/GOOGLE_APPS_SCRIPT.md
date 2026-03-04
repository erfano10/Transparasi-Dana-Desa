# Google Apps Script - Setup Guide

## Langkah 1: Buat Google Spreadsheet

1. Buka Google Drive
2. Buat Spreadsheet baru dengan nama "Database Dana Desa"
3. Buat 2 Sheet dengan struktur berikut:

### Sheet 1: DATA_DESA
|   id_desa | nama_desa | kecamatan | kabupaten | tahun | total_anggaran |
|---------|-----------|-----------|-----------|-------|----------------|
| 1 | Desa Sukamaju | Kecamatan Makmur | Kabupaten Sejahtera | 2024 | 1500000000 |

### Sheet 2: PROGRAM_DANA_DESA
| id_program | id_desa | nama_program | kategori | anggaran | realisasi | tanggal_mulai | tanggal_selesai | status | keterangan |
|------------|---------|--------------|----------|----------|-----------|---------------|-----------------|--------|------------|
| 1 | 1 | Pembangunan Jalan | Infrastruktur | 500000000 | 450000000 | 2024-01-15 | 2024-06-30 | Proses | Jalan 2 km |

## Langkah 2: Buat Google Apps Script

1. Di Spreadsheet, klik **Extensions** > **Apps Script**
2. Hapus kode default
3. Copy-paste kode berikut:

```javascript
// Web App untuk API
function doGet(e) {
  const action = e.parameter.action;
  
  try {500000000
    let result;
    
    switch(action) {
      case 'getDesa':
        result = getDesa();
        break;
      case 'getPrograms':
        result = getPrograms();
        break;
      case 'getProgram':
        result = getProgram(e.parameter.id);
        break;
      default:
        return createResponse(false, 'Action tidak valid');
    }
    
    return createResponse(true, 'Success', result);
  } catch(error) {
    return createResponse(false, error.toString());
  }
}

// POST untuk Create, Update, Delete
function doPost(e) {
  const action = e.parameter.action;
  const data = JSON.parse(e.postData.contents);
  
  try {
    let result;
    
    switch(action) {
      case 'addProgram':
        result = addProgram(data);
        break;
      case 'updateProgram':
        result = updateProgram(data);
        break;
      case 'deleteProgram':
        result = deleteProgram(data.id);
        break;
      default:
        return createResponse(false, 'Action tidak valid');
    }
    
    return createResponse(true, 'Success', result);
  } catch(error) {
    return createResponse(false, error.toString());
  }
}

// Helper function untuk response
function createResponse(success, message, data = null) {
  const response = {
    status: success ? 'success' : 'error',
    message: message,
    data: data
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// Get data desa
function getDesa() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('DATA_DESA');
  const data = sheet.getRange(2, 1, 1, 6).getValues()[0];
  
  return {
    id_desa: data[0],
    nama_desa: data[1],
    kecamatan: data[2],
    kabupaten: data[3],
    tahun: data[4],
    total_anggaran: data[5]
  };
}

// Get all programs
function getPrograms() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('PROGRAM_DANA_DESA');
  const lastRow = sheet.getLastRow();
  
  if (lastRow < 2) return [];
  
  const data = sheet.getRange(2, 1, lastRow - 1, 10).getValues();
  
  return data.map(row => ({
    id_program: row[0],
    id_desa: row[1],
    nama_program: row[2],
    kategori: row[3],
    anggaran: row[4],
    realisasi: row[5],
    tanggal_mulai: row[6],
    tanggal_selesai: row[7],
    status: row[8],
    keterangan: row[9]
  }));
}

// Get single program
function getProgram(id) {
  const programs = getPrograms();
  return programs.find(p => p.id_program == id);
}

// Add new program
function addProgram(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('PROGRAM_DANA_DESA');
  const lastRow = sheet.getLastRow();
  const newId = lastRow > 1 ? sheet.getRange(lastRow, 1).getValue() + 1 : 1;
  
  sheet.appendRow([
    newId,
    data.id_desa || 1,
    data.nama_program,
    data.kategori,
    data.anggaran,
    data.realisasi,
    data.tanggal_mulai,
    data.tanggal_selesai,
    data.status,
    data.keterangan
  ]);
  
  return { id: newId, message: 'Program berhasil ditambahkan' };
}

// Update program
function updateProgram(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('PROGRAM_DANA_DESA');
  const lastRow = sheet.getLastRow();
  
  for (let i = 2; i <= lastRow; i++) {
    if (sheet.getRange(i, 1).getValue() == data.id_program) {
      sheet.getRange(i, 3, 1, 8).setValues([[
        data.nama_program,
        data.kategori,
        data.anggaran,
        data.realisasi,
        data.tanggal_mulai,
        data.tanggal_selesai,
        data.status,
        data.keterangan
      ]]);
      return { message: 'Program berhasil diupdate' };
    }
  }
  
  throw new Error('Program tidak ditemukan');
}

// Delete program
function deleteProgram(id) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('PROGRAM_DANA_DESA');
  const lastRow = sheet.getLastRow();
  
  for (let i = 2; i <= lastRow; i++) {
    if (sheet.getRange(i, 1).getValue() == id) {
      sheet.deleteRow(i);
      return { message: 'Program berhasil dihapus' };
    }
  }
  
  throw new Error('Program tidak ditemukan');
}
```

## Langkah 3: Deploy Web App

1. Klik **Deploy** > **New deployment**
2. Pilih type: **Web app**
3. Isi deskripsi: "API Dana Desa"
4. Execute as: **Me**
5. Who has access: **Anyone** (untuk akses publik)
6. Klik **Deploy**
7. Copy **Web app URL** yang muncul

## Langkah 4: Konfigurasi Website

1. Buka file `js/app.js`
2. Ganti `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` dengan URL yang di-copy
3. Contoh:
```javascript
const CONFIG = {
    SPREADSHEET_URL: 'https://script.google.com/macros/s/AKfycby.../exec',
};
```

## Langkah 5: Testing

1. Buka `index.html` di browser
2. Data akan otomatis dimuat dari Google Spreadsheet
3. Jika masih muncul dummy data, periksa:
   - URL Apps Script sudah benar
   - Deployment sudah aktif
   - Akses sudah diset ke "Anyone"

## Troubleshooting

### Error: "Script function not found"
- Pastikan semua function sudah di-save di Apps Script
- Re-deploy dengan versi baru

### Error: "Authorization required"
- Ubah "Who has access" menjadi "Anyone"
- Re-deploy

### Data tidak muncul
- Buka Console browser (F12)
- Lihat error di tab Console
- Pastikan nama Sheet sesuai: DATA_DESA dan PROGRAM_DANA_DESA

## Keamanan (Opsional)

Untuk menambah keamanan, tambahkan API Key:

```javascript
// Di Apps Script
const API_KEY = 'your-secret-key-here';

function doGet(e) {
  if (e.parameter.key !== API_KEY) {
    return createResponse(false, 'Unauthorized');
  }
  // ... rest of code
}
```

Lalu di `js/app.js`:
```javascript
const CONFIG = {
    SPREADSHEET_URL: 'https://script.google.com/macros/s/.../exec',
    API_KEY: 'your-secret-key-here'
};

async function fetchData(action, params = {}) {
    const url = new URL(CONFIG.SPREADSHEET_URL);
    url.searchParams.append('key', CONFIG.API_KEY);
    // ... rest of code
}
```
