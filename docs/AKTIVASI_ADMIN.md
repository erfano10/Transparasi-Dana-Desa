# Aktivasi Fitur Admin Panel

Fitur admin panel sudah diaktifkan! Sekarang admin bisa input data dari web yang langsung masuk ke Google Spreadsheet.

## ✅ Fitur yang Sudah Aktif:

1. **Tambah Program Baru** - Input dari form web → Otomatis masuk ke spreadsheet
2. **Hapus Program** - Hapus dari web → Otomatis terhapus di spreadsheet
3. **Lihat Daftar Program** - Real-time dari spreadsheet
4. **Login Sederhana** - Username & password

---

## 🔐 Login Admin

**Default credentials:**
- Username: `admin`
- Password: `admin123`

**Cara ganti password:**
Buka file `admin.html`, cari baris ini dan ganti:
```javascript
if (username === 'admin' && password === 'admin123') {
```

Ganti dengan password baru:
```javascript
if (username === 'admin' && password === 'PASSWORD_BARU_ANDA') {
```

---

## 📝 Cara Menggunakan Admin Panel

### 1. Login

1. Buka `admin.html` di browser
2. Masukkan username: `admin`
3. Masukkan password: `admin123`
4. Klik **Login**

### 2. Tambah Program Baru

1. Setelah login, isi form:
   - **Nama Program**: Contoh "Pembangunan Jembatan"
   - **Kategori**: Pilih salah satu (Infrastruktur/Sosial/Pendidikan/Kesehatan)
   - **Anggaran**: Contoh 500000000 (tanpa titik/koma)
   - **Realisasi**: Contoh 250000000
   - **Tanggal Mulai**: Pilih dari kalender
   - **Tanggal Selesai**: Pilih dari kalender
   - **Status**: Pilih (Perencanaan/Proses/Selesai)
   - **Keterangan**: Deskripsi program (opsional)

2. Klik **Tambah Program**

3. Tunggu pesan konfirmasi: "✅ Program berhasil ditambahkan!"

4. **Refresh halaman** untuk melihat data terbaru

### 3. Hapus Program

1. Di tabel daftar program, klik ikon **🗑️ (trash)**
2. Konfirmasi penghapusan
3. Program akan terhapus dari spreadsheet
4. **Refresh halaman** untuk melihat perubahan

### 4. Edit Program

Untuk sementara, edit program dilakukan langsung di Google Spreadsheet:
1. Buka Google Spreadsheet
2. Edit data di sheet `PROGRAM_DANA_DESA`
3. Refresh website untuk melihat perubahan

---

## ⚙️ Cara Kerja Sistem

```
┌─────────────────────┐
│   Admin Panel       │
│   (admin.html)      │
└──────────┬──────────┘
           │ Input data
           ↓
┌─────────────────────┐
│ Google Apps Script  │ ← Menerima data
│   (Code.gs)         │
└──────────┬──────────┘
           │ Simpan
           ↓
┌─────────────────────┐
│ Google Spreadsheet  │ ← Data tersimpan
│ PROGRAM_DANA_DESA   │
└─────────────────────┘
```

---

## 🔧 Troubleshooting

### Problem: Data tidak masuk ke spreadsheet

**Solusi:**
1. Pastikan Apps Script sudah di-deploy dengan **version terbaru**
2. Pastikan deployment setting:
   - Execute as: **Me**
   - Who has access: **Anyone**
3. Cek Console browser (F12) untuk error

### Problem: Muncul error CORS

Ini normal karena browser security. Data tetap terkirim ke spreadsheet meskipun ada warning CORS.

**Cara cek apakah data masuk:**
1. Buka Google Spreadsheet
2. Lihat sheet `PROGRAM_DANA_DESA`
3. Cek apakah ada baris baru

### Problem: Tombol "Tambah Program" tidak merespon

**Solusi:**
1. Pastikan file `js/app.js` sudah di-save
2. Clear browser cache (Ctrl+Shift+Delete)
3. Refresh halaman (Ctrl+F5)
4. Cek Console browser (F12) untuk error

---

## 📊 Validasi Data

Sistem akan otomatis validasi:
- ✅ Semua field wajib diisi (kecuali keterangan)
- ✅ Anggaran dan realisasi harus angka
- ✅ Tanggal harus valid
- ✅ Kategori dan status harus sesuai pilihan

---

## 🔒 Keamanan

### Level 1: Login Sederhana (Sudah Aktif)
- Username & password di client-side
- Cocok untuk internal/demo

### Level 2: Session Storage (Opsional)
Login tersimpan di browser sampai logout

### Level 3: Google Authentication (Advanced)
Gunakan akun Google untuk login - perlu setup tambahan

---

## 📱 Mobile Friendly

Admin panel sudah responsive dan bisa diakses dari:
- ✅ Desktop/Laptop
- ✅ Tablet
- ✅ Smartphone

---

## 🎯 Tips Penggunaan

1. **Backup data**: Download spreadsheet secara berkala
2. **Konsisten**: Gunakan format yang sama untuk semua data
3. **Validasi**: Cek data di spreadsheet setelah input
4. **Refresh**: Selalu refresh halaman setelah tambah/hapus data
5. **Browser**: Gunakan Chrome/Firefox untuk hasil terbaik

---

## 🚀 Fitur Lanjutan (Opsional)

Jika ingin fitur tambahan:

### 1. Upload Foto Program
- Simpan foto di Google Drive
- Link foto di spreadsheet

### 2. Export ke PDF
- Generate laporan PDF
- Download langsung dari web

### 3. Notifikasi Email
- Email otomatis saat ada program baru
- Reminder untuk program yang akan selesai

### 4. Dashboard Analytics
- Grafik real-time
- Statistik lengkap

Beritahu jika ingin fitur-fitur ini diaktifkan!

---

## ✅ Checklist Setup Admin

- [ ] Login berhasil dengan admin/admin123
- [ ] Form tambah program muncul
- [ ] Bisa input data di form
- [ ] Klik "Tambah Program" muncul loading
- [ ] Muncul pesan sukses
- [ ] Data masuk ke spreadsheet
- [ ] Refresh halaman, data baru muncul di tabel
- [ ] Bisa hapus program
- [ ] Data terhapus dari spreadsheet

Jika semua checklist ✅, admin panel sudah siap digunakan!
