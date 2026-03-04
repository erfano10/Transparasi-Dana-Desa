#!/bin/bash

echo "========================================"
echo "Upload ke GitHub - Sistem Transparansi Dana Desa"
echo "Desa Wonokerso, Kecamatan Pakisaji, Kabupaten Malang"
echo "========================================"
echo ""

echo "[1/6] Inisialisasi Git..."
git init

echo ""
echo "[2/6] Menambahkan semua file..."
git add .

echo ""
echo "[3/6] Commit pertama..."
git commit -m "Initial commit: Sistem Transparansi Dana Desa Wonokerso"

echo ""
echo "[4/6] Masukkan username GitHub Anda:"
read -p "Username GitHub: " username

echo ""
echo "[5/6] Menambahkan remote repository..."
git remote add origin https://github.com/$username/sistem-transparansi-dana-desa.git

echo ""
echo "[6/6] Upload ke GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "========================================"
echo "Selesai! File sudah ter-upload ke GitHub"
echo "========================================"
echo ""
echo "Langkah selanjutnya:"
echo "1. Buka https://vercel.com"
echo "2. Login dengan GitHub"
echo "3. Import repository: sistem-transparansi-dana-desa"
echo "4. Klik Deploy"
echo ""
