# 🚀 Deploy Guide - Player Dashboard ke Netlify

## 📋 Persiapan Deploy

### 1. GitHub Repository
Repository sudah siap dengan:
- ✅ Git initialized
- ✅ Files committed
- ✅ README.md updated
- ✅ Firebase setup guide

### 2. Build Test
```bash
npm run build
```
Pastikan build berhasil tanpa error.

## 🌐 Deploy ke Netlify

### Opsi 1: GitHub Integration (Recommended)
1. **Push ke GitHub**:
   ```bash
   git remote add origin https://github.com/username/player-dashboard.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect ke Netlify**:
   - Login ke [Netlify](https://netlify.com)
   - Klik "New site from Git"
   - Pilih GitHub repository
   - Settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
     - Node version: 18

3. **Environment Variables** (jika diperlukan):
   - Site settings > Environment variables
   - Add Firebase config jika menggunakan env variables

### Opsi 2: Manual Deploy
1. **Build project**:
   ```bash
   npm run build
   ```

2. **Drag & Drop**:
   - Buka [Netlify](https://netlify.com)
   - Drag folder `dist/` ke Netlify deploy area

## 🔧 Konfigurasi Netlify

File `netlify.toml` sudah dikonfigurasi:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

## 🔥 Firebase Setup Setelah Deploy

1. **Update Firebase Config**:
   - Edit `src/services/firebase.ts`
   - Masukkan config Firebase yang benar
   - Commit dan push perubahan

2. **Test Deployment**:
   - Akses URL Netlify
   - Test login/register
   - Test chat dan betting features

## 📱 Custom Domain (Opsional)

1. **Netlify Dashboard**:
   - Site settings > Domain management
   - Add custom domain
   - Update DNS records

2. **SSL Certificate**:
   - Otomatis enabled oleh Netlify
   - Force HTTPS redirect

## 🔄 Auto Deploy

Setiap push ke GitHub branch `main` akan trigger auto deploy ke Netlify.

## 🎯 URL Final

Setelah deploy berhasil:
- **Netlify URL**: `https://app-name.netlify.app`
- **Custom Domain**: `https://yourdomain.com` (jika ada)

## 🔗 Sync dengan Admin Dashboard

Admin Dashboard (localhost:3001) akan sync real-time dengan Player Dashboard yang sudah di-deploy menggunakan Firebase.

## ✅ Checklist Deploy

- [ ] Firebase project created & configured
- [ ] Build test passed (`npm run build`)
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Netlify site connected
- [ ] Deploy successful
- [ ] Firebase config updated
- [ ] Features tested on live site
- [ ] Admin dashboard sync tested
