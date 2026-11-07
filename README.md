# Absen Pegawai - PT. Rafasya Putra Ustanto

Aplikasi absensi (PWA) untuk HP, tablet, dan PC. Data tersimpan di Google Sheets lewat Google Apps Script.

## Isi
- `index.html` - aplikasi
- `manifest.json`, `sw.js`, `icons/` - agar bisa dipasang seperti aplikasi

## Cara upload ke GitHub Pages
1. Buat repository baru di GitHub (misalnya `absen-pegawai`).
2. Upload SEMUA isi folder ini (`index.html`, `manifest.json`, `sw.js`, `icons/`, `.nojekyll`) ke root repository.
3. Buka Settings > Pages > Source: `Deploy from a branch` > Branch: `main` / `(root)` > Save.
4. Tunggu 1-2 menit, alamat aplikasi: `https://USERNAME.github.io/absen-pegawai/`

## Pasang di perangkat
- Android/PC (Chrome/Edge): tombol "Pasang aplikasi" muncul di halaman login, atau lewat menu browser > Install app.
- iPhone/iPad (Safari): Bagikan > Tambahkan ke Layar Utama.

## Apps Script
Pakai `Code.gs` terbaru (fungsi `slipSemua` sudah masuk daftar `API_FUNGSI`).
Setelah mengganti kode: Deploy > Manage deployments > Edit (ikon pensil) > Version: New version > Deploy.
Akses harus "Anyone" (Siapa saja). URL `/exec` sudah terpasang di `index.html` (konstanta `API_URL`).
