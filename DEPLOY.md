# 🚀 Panduan Deploy ke GitHub & Vercel

## Prasyarat

- Akun GitHub (gratis)
- Akun Vercel (gratis)
- Git terinstall di komputer

---

## 📦 Langkah 1: Upload ke GitHub

### A. Buat Repository di GitHub

1. Buka [github.com](https://github.com)
2. Login ke akun Anda
3. Klik tombol **"+"** di pojok kanan atas
4. Pilih **"New repository"**
5. Isi form:
   - **Repository name:** `sistem-transparansi-dana-desa`
   - **Description:** `Website transparansi dana desa`
   - **Public** atau **Private** (pilih sesuai kebutuhan)
   - ❌ **JANGAN** centang "Add a README file"
   - ❌ **JANGAN** centang "Add .gitignore"
6. Klik **"Create repository"**

### B. Upload dari Komputer

#### Opsi 1: Via Git Command Line (Recommended)

Buka terminal/command prompt di folder project, lalu jalankan:

```bash
# Inisialisasi git
git init

# Tambahkan semua file
git add .

# Commit pertama
git commit -m "Initial commit: Sistem Transparansi Dana Desa"

# Tambahkan remote repository (ganti USERNAME dengan username GitHub Anda)
git remote add origin https://github.com/USERNAME/sistem-transparansi-dana-desa.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

**Ganti `USERNAME`** dengan username GitHub Anda!

#### Opsi 2: Via GitHub Desktop (Mudah)

1. Download dan install [GitHub Desktop](https://desktop.github.com/)
2. Login dengan akun GitHub
3. Klik **File** → **Add Local Repository**
4. Pilih folder project Anda
5. Klik **Publish repository**
6. Pilih nama repository dan klik **Publish**

#### Opsi 3: Via Upload Manual (Paling Mudah)

1. Buka repository yang baru dibuat di GitHub
2. Klik **"uploading an existing file"**
3. Drag & drop semua file dan folder project
4. Scroll ke bawah, klik **"Commit changes"**

---

## 🌐 Langkah 2: Deploy ke Vercel

### A. Daftar/Login Vercel

1. Buka [vercel.com](https://vercel.com)
2. Klik **"Sign Up"** atau **"Login"**
3. Pilih **"Continue with GitHub"**
4. Authorize Vercel untuk akses GitHub

### B. Import Project

1. Di dashboard Vercel, klik **"Add New..."** → **"Project"**
2. Pilih **"Import Git Repository"**
3. Cari repository **`sistem-transparansi-dana-desa`**
4. Klik **"Import"**

### C. Configure Project

1. **Project Name:** `sistem-transparansi-dana-desa` (atau nama lain)
2. **Framework Preset:** Pilih **"Other"**
3. **Root Directory:** `.` (biarkan default)
4. **Build Command:** Kosongkan (tidak perlu build)
5. **Output Directory:** Kosongkan
6. Klik **"Deploy"**

### D. Tunggu Deployment

- Vercel akan otomatis deploy
- Proses biasanya 1-2 menit
- Setelah selesai, akan muncul confetti 🎉

### E. Akses Website

Vercel akan memberikan URL seperti:
```
https://sistem-transparansi-dana-desa.vercel.app
```

Atau custom domain jika Anda punya.

---

## ⚙️ Langkah 3: Konfigurasi Google Apps Script

**PENTING:** Setelah deploy, URL website berubah. Anda perlu update CORS di Apps Script.

### Update Apps Script untuk Vercel

1. Buka Google Spreadsheet
2. **Extensions** → **Apps Script**
3. Tambahkan function ini di atas semua function:

```javascript
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}
```

4. **Save** (Ctrl+S)
5. **Deploy** → **Manage deployments**
6. Edit → **New version** → **Deploy**

---

## 🔄 Update Konfigurasi Website

Setelah deploy ke Vercel, website sudah online tapi masih pakai URL Apps Script lama.

### Cara Update URL (Jika Perlu)

Jika Anda ganti URL Apps Script atau ada perubahan:

1. Edit file `js/app.js` di GitHub
2. Update `SPREADSHEET_URL`
3. Commit changes
4. Vercel akan otomatis re-deploy (auto-deploy)

---

## 🎯 Custom Domain (Opsional)

Jika punya domain sendiri (contoh: `transparansi-desa.com`):

1. Di Vercel dashboard, buka project
2. Klik tab **"Settings"**
3. Klik **"Domains"**
4. Klik **"Add"**
5. Masukkan domain Anda
6. Ikuti instruksi untuk setting DNS

---

## 🔄 Auto Deploy

Setiap kali Anda push perubahan ke GitHub:
- Vercel otomatis detect perubahan
- Otomatis build & deploy
- Website langsung update

**Cara update website:**
```bash
# Edit file yang ingin diubah
# Lalu commit dan push

git add .
git commit -m "Update: deskripsi perubahan"
git push
```

Tunggu 1-2 menit, website sudah update!

---

## 📊 Monitoring

### Vercel Dashboard
- Lihat analytics
- Cek deployment history
- Monitor performance

### Google Apps Script
- Lihat execution logs
- Monitor API calls
- Cek error logs

---

## 🐛 Troubleshooting

### Website tidak bisa akses Apps Script

**Solusi:**
1. Pastikan function `doOptions` sudah ditambahkan
2. Deploy Apps Script dengan version baru
3. Clear browser cache
4. Test dengan `test-connection.html`

### Deployment gagal di Vercel

**Solusi:**
1. Cek build logs di Vercel
2. Pastikan semua file sudah ter-upload ke GitHub
3. Coba deploy ulang

### Data tidak muncul setelah deploy

**Solusi:**
1. Buka Console browser (F12)
2. Cek error yang muncul
3. Pastikan URL Apps Script di `js/app.js` sudah benar
4. Test koneksi dengan `test-connection.html`

---

## ✅ Checklist Deployment

- [ ] Repository dibuat di GitHub
- [ ] Semua file ter-upload ke GitHub
- [ ] Project di-import ke Vercel
- [ ] Deployment berhasil (ada URL)
- [ ] Website bisa diakses
- [ ] Function `doOptions` ditambahkan di Apps Script
- [ ] Apps Script di-deploy ulang
- [ ] Test koneksi berhasil
- [ ] Data muncul di website
- [ ] Admin panel berfungsi

---

## 🎉 Selesai!

Website Anda sekarang sudah online dan bisa diakses dari mana saja!

**URL Website:** `https://[project-name].vercel.app`

**Share URL ini** ke masyarakat untuk transparansi dana desa! 🏛️
