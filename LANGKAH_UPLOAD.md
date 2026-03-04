# 📤 Langkah Upload ke GitHub - Desa Wonokerso

## ✅ Persiapan

Data desa sudah diubah menjadi:
- **Nama Desa:** Desa Wonokerso
- **Kecamatan:** Kecamatan Pakisaji
- **Kabupaten:** Kabupaten Malang
- **Tahun:** 2026

---

## 🔧 Langkah 1: Update Data di Google Spreadsheet

**PENTING:** Ubah data di spreadsheet dulu!

1. Buka Google Spreadsheet Anda
2. Pilih sheet **`DATA_DESA`**
3. Edit **Baris 2** menjadi:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| 1 | Desa Wonokerso | Kecamatan Pakisaji | Kabupaten Malang | 2026 | 1500000000 |

4. **Save** (Ctrl+S)

---

## 📦 Langkah 2: Buat Repository di GitHub

1. Buka [github.com](https://github.com)
2. **Login** ke akun Anda
3. Klik tombol **"+"** di pojok kanan atas
4. Pilih **"New repository"**
5. Isi form:
   - **Repository name:** `sistem-transparansi-dana-desa`
   - **Description:** `Sistem Transparansi Dana Desa Wonokerso, Kecamatan Pakisaji, Kabupaten Malang`
   - Pilih **Public** (agar bisa deploy gratis di Vercel)
   - ❌ JANGAN centang "Add a README file"
   - ❌ JANGAN centang "Add .gitignore"
6. Klik **"Create repository"**

**Jangan tutup halaman ini!** Anda akan butuh URL repository.

---

## 🚀 Langkah 3: Upload File (Pilih Salah Satu)

### Opsi A: Upload Manual (PALING MUDAH)

1. Di halaman repository yang baru dibuat
2. Klik link **"uploading an existing file"**
3. **Drag & drop SEMUA file dan folder** dari project ini
4. Tunggu sampai semua file ter-upload
5. Scroll ke bawah
6. Klik **"Commit changes"**

**Selesai!** Lanjut ke Langkah 4.

---

### Opsi B: Via Script Otomatis (Windows)

1. **Double-click** file **`UPLOAD_GITHUB.bat`**
2. Masukkan **username GitHub** Anda saat diminta
3. Masukkan **password** (gunakan Personal Access Token)
4. Tunggu proses selesai

**Cara buat Personal Access Token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → Pilih "repo" → Generate
3. Copy token dan simpan (tidak bisa dilihat lagi!)

---

### Opsi C: Via Terminal/Command Prompt

**Windows (Command Prompt):**
```cmd
git init
git add .
git commit -m "Initial commit: Sistem Transparansi Dana Desa Wonokerso"
git remote add origin https://github.com/USERNAME/sistem-transparansi-dana-desa.git
git branch -M main
git push -u origin main
```

**Mac/Linux (Terminal):**
```bash
chmod +x upload-github.sh
./upload-github.sh
```

**Ganti `USERNAME`** dengan username GitHub Anda!

---

## 🌐 Langkah 4: Deploy ke Vercel

1. Buka [vercel.com](https://vercel.com)
2. Klik **"Sign Up"** atau **"Login"**
3. Pilih **"Continue with GitHub"**
4. Authorize Vercel

5. Di dashboard Vercel:
   - Klik **"Add New..."** → **"Project"**
   - Cari repository **`sistem-transparansi-dana-desa`**
   - Klik **"Import"**

6. Configure:
   - **Project Name:** `transparansi-desa-wonokerso` (atau nama lain)
   - **Framework Preset:** Other
   - **Root Directory:** . (default)
   - Klik **"Deploy"**

7. Tunggu 1-2 menit...

8. **Selesai!** 🎉 Website sudah online!

**URL Website:** `https://transparansi-desa-wonokerso.vercel.app`

---

## ⚙️ Langkah 5: Update Apps Script (PENTING!)

Agar website di Vercel bisa akses Google Spreadsheet:

1. Buka Google Spreadsheet
2. **Extensions** → **Apps Script**
3. **Hapus semua kode lama**
4. Buka file **`Code.gs`** di project ini
5. **Copy SEMUA kode**
6. **Paste** ke Apps Script Editor
7. **Save** (Ctrl+S)
8. **Deploy** → **Manage deployments**
9. Klik ikon **pensil** (Edit)
10. **Version:** New version
11. Klik **"Deploy"**
12. **Copy URL** yang muncul (jika berubah)

---

## 🧪 Langkah 6: Test Website

1. Buka URL Vercel Anda
2. Cek apakah muncul:
   - **Desa Wonokerso**
   - **Kecamatan Pakisaji**
   - **Kabupaten Malang**
   - **Tahun 2026**

3. Test fitur:
   - ✅ Dashboard menampilkan data
   - ✅ Data Program berfungsi
   - ✅ Grafik muncul
   - ✅ Admin panel bisa login
   - ✅ Bisa tambah program

4. Jika data tidak muncul:
   - Buka Console (F12)
   - Lihat error yang muncul
   - Pastikan Apps Script sudah di-update

---

## 🔄 Update Website Nanti

Jika ada perubahan:

### Via GitHub Web:
1. Buka repository di GitHub
2. Klik file yang ingin diedit
3. Klik ikon **pensil** (Edit)
4. Edit file
5. Scroll ke bawah → **Commit changes**
6. Vercel otomatis deploy ulang!

### Via Git:
```bash
# Edit file yang ingin diubah
git add .
git commit -m "Update: deskripsi perubahan"
git push
```

---

## 📊 Monitoring

### Vercel Dashboard:
- Lihat jumlah visitor
- Cek deployment history
- Monitor performance

### Google Apps Script:
- Extensions → Apps Script
- View → Execution log
- Lihat API calls dan error

---

## ✅ Checklist

- [ ] Data di spreadsheet sudah diubah ke Desa Wonokerso
- [ ] Repository dibuat di GitHub
- [ ] File ter-upload ke GitHub
- [ ] Project di-import ke Vercel
- [ ] Deployment berhasil
- [ ] Apps Script sudah di-update dengan CORS
- [ ] Website bisa diakses
- [ ] Data Desa Wonokerso muncul
- [ ] Semua fitur berfungsi

---

## 🎯 Hasil Akhir

Website Anda akan online di:
```
https://transparansi-desa-wonokerso.vercel.app
```

Atau custom domain jika Anda punya.

**Share URL ini** ke:
- Perangkat desa
- Masyarakat desa
- Website desa
- Media sosial

---

## 🐛 Troubleshooting

### Upload ke GitHub gagal
- Pastikan Git sudah terinstall
- Pastikan username & password benar
- Gunakan Personal Access Token, bukan password biasa

### Deploy Vercel gagal
- Cek build logs di Vercel
- Pastikan semua file ter-upload
- Coba deploy ulang

### Data tidak muncul
- Cek Console browser (F12)
- Pastikan Apps Script sudah di-update
- Test dengan `test-connection.html`

---

## 📞 Butuh Bantuan?

Jika ada masalah:
1. Cek file `DEPLOY.md` untuk panduan lengkap
2. Buka `test-connection.html` untuk diagnosa
3. Screenshot error dan analisa

---

**Selamat! Sistem Transparansi Dana Desa Wonokerso siap online! 🏛️**
