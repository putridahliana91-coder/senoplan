# 🔥 Firebase Setup Guide - Player Dashboard

## 📋 Langkah Setup Firebase

### 1. Buat Firebase Project
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Create a project"
3. Nama project: `betting-platform-seno`
4. Enable Google Analytics (opsional)

### 2. Enable Services

#### Firestore Database
1. Pilih "Firestore Database" di sidebar
2. Klik "Create database"
3. Pilih "Start in test mode"
4. Pilih lokasi: `asia-southeast1` (Singapore)

#### Storage
1. Pilih "Storage" di sidebar
2. Klik "Get started"
3. Pilih "Start in test mode"
4. Pilih lokasi: `asia-southeast1` (Singapore)

#### Authentication
1. Pilih "Authentication" di sidebar
2. Klik "Get started"
3. Tab "Sign-in method"
4. Enable "Anonymous" (untuk guest users)

### 3. Get Configuration
1. Pilih "Project settings" (gear icon)
2. Scroll ke "Your apps"
3. Klik "Web app" icon (`</>`)
4. App nickname: `player-dashboard`
5. Copy configuration object

### 4. Update Firebase Config

Edit file `src/services/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "AIza...", // Paste dari Firebase Console
  authDomain: "betting-platform-seno.firebaseapp.com",
  projectId: "betting-platform-seno",
  storageBucket: "betting-platform-seno.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### 5. Firestore Security Rules

Di Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if true;
    }
    
    // Betting activities
    match /bettingActivities/{activityId} {
      allow read, write: if true;
    }
    
    // Chat messages
    match /chatMessages/{messageId} {
      allow read, write: if true;
    }
    
    // Withdrawal requests
    match /withdrawalRequests/{requestId} {
      allow read, write: if true;
    }
    
    // Server timers
    match /serverTimers/{timerId} {
      allow read, write: if true;
    }
    
    // Broadcasts
    match /broadcasts/{broadcastId} {
      allow read, write: if true;
    }
  }
}
```

### 6. Storage Security Rules

Di Firebase Console > Storage > Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /chat-images/{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

## 🔄 Real-time Features

### Firestore Collections Structure:

```
📁 users/
  └── {userId}/
      ├── id: string
      ├── username: string
      ├── balance: number
      ├── role: "player"
      ├── createdAt: timestamp
      └── isActive: boolean

📁 bettingActivities/
  └── {activityId}/
      ├── userId: string
      ├── username: string
      ├── server: "server1" | "server2"
      ├── betType: "besar" | "kecil" | "angka"
      ├── betValue: string
      ├── amount: number
      ├── result: "win" | "lose" | "pending"
      └── timestamp: timestamp

📁 chatMessages/
  └── {messageId}/
      ├── userId: string
      ├── username: string
      ├── message: string
      ├── imageUrl?: string
      ├── isAdmin: boolean
      └── timestamp: timestamp

📁 withdrawalRequests/
  └── {requestId}/
      ├── userId: string
      ├── username: string
      ├── amount: number
      ├── bankAccount: string
      ├── status: "pending" | "approved" | "rejected"
      └── timestamp: timestamp

📁 serverTimers/
  └── server1/ | server2/
      ├── currentTime: number
      ├── isActive: boolean
      ├── winningNumber?: string
      └── lastUpdated: timestamp

📁 broadcasts/
  └── {broadcastId}/
      ├── message: string
      ├── type: "announcement" | "cs"
      ├── timestamp: timestamp
      └── isActive: boolean
```

## 🚀 Deploy Ready

Setelah setup Firebase:
1. Update konfigurasi di `firebase.ts`
2. Test di development: `npm run dev`
3. Build untuk production: `npm run build`
4. Deploy ke Netlify/Vercel

## 🔗 Sync dengan Admin Dashboard

Admin Dashboard (localhost:3001) akan menggunakan Firebase config yang sama untuk real-time sync.
