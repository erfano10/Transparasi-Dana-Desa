# 🚀 Quick Deploy Guide

## Ringkasan Cepat: GitHub → Vercel

### 1️⃣ Upload ke GitHub (Pilih salah satu)

#### Cara Termudah: Upload Manual
1. Buka [github.com](https://github.com) → Login
2. Klik **"+"** → **"New repository"**
3. Nama: `sistem-transparansi-dana-desa`
4. Klik **"Create repository"**
5. Klik **"uploading an existing file"**
6. **Drag & drop semua file** dari folder project
7. Klik **"Commit changes"**

#### Cara via Git (Jika sudah install Git)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/sistem-transparansi-dana-desa.git
git push -u origin main
```
*Ganti `USERNAME` dengan username GitHub Anda*

---

### 2️⃣ Deploy ke Vercel

1. Buka [vercel.com](https://vercel.com)
2. Login dengan **GitHub**
3. Klik **"Add New..."** → **"Project"**
4. Pilih repository **`sistem-transparansi-dana-desa`**
5. Klik **"Import"**
6. Framework: **"Other"**
7. Klik **"Deploy"**
8. Tunggu 1-2 menit ✅

**Website Anda sudah online!** 🎉

URL: `https://sistem-transparansi-dana-desa.vercel.app`

---

### 3️⃣ Update Apps Script (PENTING!)

Agar website di Vercel bisa akses Google Spreadsheet:

1. Buka Google Spreadsheet
2. **Extensions** → **Apps Script**
3. **Ganti semua kode** dengan kode dari file `Code.gs` (yang sudah saya update)
4. **Save** (Ctrl+S)
5. **Deploy** → **Manage deployments**
6. Edit → **New version** → **Deploy**

---

### 4️⃣ Test Website

1. Buka URL Vercel Anda
2. Cek apakah data muncul
3. Test admin panel
4. Jika data tidak muncul, buka Console (F12) dan lihat error

---

## 🔄 Update Website Nanti

Setiap kali ada perubahan:

1. Edit file di GitHub (atau push via Git)
2. Vercel otomatis deploy ulang
3. Website langsung update!

---

## 📞 Butuh Bantuan?

Baca panduan lengkap di **`DEPLOY.md`**

---

**Selamat! Website transparansi dana desa Anda sudah online! 🏛️**
