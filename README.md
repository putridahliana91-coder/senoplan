# 🎮 Player Dashboard - Betting Platform

Platform betting online dengan fitur real-time sync menggunakan Firebase.

## 🚀 Fitur Utama

- **🔐 Login/Register**: Sistem otomatis dengan ID 4 digit
- **🎯 Betting**: Taruhan besar/kecil/angka untuk Server 1 & 2
- **💬 Chat Real-time**: Chat dengan admin + kirim foto
- **💰 Withdrawal**: Request penarikan saldo dengan status real-time
- **📊 History**: Riwayat betting dan withdrawal
- **📢 Broadcast**: Terima pengumuman dari admin
- **🔄 Auto Sync**: Sinkronisasi real-time dengan admin dashboard

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **Backend**: Firebase (Firestore + Storage + Auth)
- **Deployment**: Netlify/Vercel

## 📦 Installation

```bash
npm install
```

2. Konfigurasi Firebase:
   - Update `src/services/firebase.ts` dengan config Firebase Anda
   - Pastikan Firestore dan Storage sudah aktif

3. Build untuk production:
```bash
npm run build
```

4. Deploy ke Vercel/Netlify

## Login & Register
- **Register**: Auto-generate ID 4 digit
- **Login**: Gunakan ID yang sudah terdaftar
- **Validation**: Nama, nomor HP, password

## Struktur Firebase

### Collections (sama dengan AdminDashboard):
- `users` - Data player dan admin
- `bettingActivities` - Aktivitas betting real-time
- `chatMessages` - Pesan chat per user
- `withdrawalRequests` - Request penarikan saldo
- `broadcasts` - Pesan broadcast admin
- `gameState` - Server timers dan announcements

## Sinkronisasi Real-time
PlayerDashboard tersinkronisasi real-time dengan AdminDashboard melalui Firebase:
- Betting langsung muncul di admin
- Perubahan saldo dari admin langsung terlihat
- Chat real-time dengan admin
- Server timers tersinkronisasi
- Broadcast admin diterima real-time

## Deployment Configuration
- **Framework**: React (Vite)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18+

## Features Detail

### Betting System
- Server 1 & Server 2 dengan timer terpisah
- Betting types: Besar (5-9), Kecil (0-4), Angka spesifik
- Real-time odds dan hasil
- Auto celebration untuk menang

### Chat System
- Upload gambar via drag & drop
- Emoji support
- Timestamp setiap pesan
- Unread message indicator

### Withdrawal System
- Multiple bank support
- Custom bank name
- Real-time status tracking
- History lengkap

## Notes
- Dashboard ini UNTUK DEPLOYMENT ke server online
- Player access only (no admin features)
- Semua data tersinkronisasi dengan AdminDashboard lokal
- Auto logout jika account dihapus admin
