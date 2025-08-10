import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
  where,
  getDocs
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';

// Types
export interface User {
  id: string;
  fullName: string;
  phoneNumber: string;
  balance: number;
  role: 'admin' | 'player';
  isOnline: boolean;
  lastActivity: Date;
  createdAt: Date;
}

export interface BettingActivity {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  betType: string;
  amount: number;
  totalBetAmount: number;
  server: string;
  seri: number;
  timestamp: Date;
  status: string;
  balance: number;
  adminControlled?: boolean;
  result?: number;
  betCount?: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  image?: string;
  sender: 'user' | 'admin';
  timestamp: Date;
  userId?: string;
  userName?: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: Date;
  processedAt?: Date;
  processedBy?: string;
}

export interface ServerTimer {
  server1: {
    timeLeft: number;
    seri: number;
    isActive: boolean;
  };
  server2: {
    timeLeft: number;
    seri: number;
    isActive: boolean;
  };
  nextResults: {
    server1: number;
    server2: number;
  };
  lastUpdated: Date;
}

// User Management
export const createUser = async (userData: Omit<User, 'id' | 'createdAt'>) => {
  try {
    const userRef = doc(collection(db, 'users'));
    const newUser = {
      ...userData,
      createdAt: serverTimestamp(),
      lastActivity: serverTimestamp()
    };
    await setDoc(userRef, newUser);
    return userRef.id;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } : null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

export const updateUser = async (userId: string, updates: Partial<User>) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...updates,
      lastActivity: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    await deleteDoc(doc(db, 'users', userId));
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Real-time listeners
export const subscribeToUsers = (callback: (users: User[]) => void) => {
  const usersQuery = query(collection(db, 'users'), orderBy('lastActivity', 'desc'));
  return onSnapshot(usersQuery, (snapshot) => {
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as User[];
    callback(users);
  });
};

// Betting Activities
export const createBettingActivity = async (activityData: Omit<BettingActivity, 'id' | 'timestamp'>) => {
  try {
    const activityRef = doc(collection(db, 'bettingActivities'));
    const newActivity = {
      ...activityData,
      timestamp: serverTimestamp()
    };
    await setDoc(activityRef, newActivity);
    return activityRef.id;
  } catch (error) {
    console.error('Error creating betting activity:', error);
    throw error;
  }
};

export const updateBettingActivity = async (activityId: string, updates: Partial<BettingActivity>) => {
  try {
    await updateDoc(doc(db, 'bettingActivities', activityId), updates);
  } catch (error) {
    console.error('Error updating betting activity:', error);
    throw error;
  }
};

export const subscribeToBettingActivities = (callback: (activities: BettingActivity[]) => void) => {
  const activitiesQuery = query(
    collection(db, 'bettingActivities'), 
    orderBy('timestamp', 'desc'),
    limit(100)
  );
  return onSnapshot(activitiesQuery, (snapshot) => {
    const activities = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as BettingActivity[];
    callback(activities);
  });
};

// Chat Messages
export const sendChatMessage = async (messageData: Omit<ChatMessage, 'id' | 'timestamp'>) => {
  try {
    const messageRef = doc(collection(db, 'chatMessages'));
    const newMessage = {
      ...messageData,
      timestamp: serverTimestamp()
    };
    await setDoc(messageRef, newMessage);
    return messageRef.id;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

export const subscribeToChatMessages = (userId: string, callback: (messages: ChatMessage[]) => void) => {
  const messagesQuery = query(
    collection(db, 'chatMessages'),
    where('userId', '==', userId),
    orderBy('timestamp', 'asc')
  );
  return onSnapshot(messagesQuery, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ChatMessage[];
    callback(messages);
  });
};

// Image Upload
export const uploadImage = async (file: File, path: string) => {
  try {
    const imageRef = ref(storage, path);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Withdrawal Requests
export const createWithdrawalRequest = async (withdrawalData: Omit<WithdrawalRequest, 'id' | 'timestamp'>) => {
  try {
    const withdrawalRef = doc(collection(db, 'withdrawalRequests'));
    const newWithdrawal = {
      ...withdrawalData,
      timestamp: serverTimestamp()
    };
    await setDoc(withdrawalRef, newWithdrawal);
    return withdrawalRef.id;
  } catch (error) {
    console.error('Error creating withdrawal request:', error);
    throw error;
  }
};

export const updateWithdrawalRequest = async (withdrawalId: string, updates: Partial<WithdrawalRequest>) => {
  try {
    await updateDoc(doc(db, 'withdrawalRequests', withdrawalId), {
      ...updates,
      processedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating withdrawal request:', error);
    throw error;
  }
};

export const subscribeToWithdrawalRequests = (callback: (withdrawals: WithdrawalRequest[]) => void) => {
  const withdrawalsQuery = query(
    collection(db, 'withdrawalRequests'), 
    orderBy('timestamp', 'desc')
  );
  return onSnapshot(withdrawalsQuery, (snapshot) => {
    const withdrawals = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as WithdrawalRequest[];
    callback(withdrawals);
  });
};

// Server Timers
export const updateServerTimers = async (timers: ServerTimer) => {
  try {
    await setDoc(doc(db, 'gameState', 'serverTimers'), {
      ...timers,
      lastUpdated: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating server timers:', error);
    throw error;
  }
};

export const subscribeToServerTimers = (callback: (timers: ServerTimer) => void) => {
  return onSnapshot(doc(db, 'gameState', 'serverTimers'), (doc) => {
    if (doc.exists()) {
      callback(doc.data() as ServerTimer);
    }
  });
};

// Broadcast Messages
export const sendBroadcastMessage = async (message: string, sender: string) => {
  try {
    await addDoc(collection(db, 'broadcasts'), {
      message,
      sender,
      timestamp: serverTimestamp(),
      isActive: true
    });
  } catch (error) {
    console.error('Error sending broadcast message:', error);
    throw error;
  }
};

export const subscribeToBroadcasts = (callback: (broadcasts: any[]) => void) => {
  const broadcastsQuery = query(
    collection(db, 'broadcasts'),
    where('isActive', '==', true),
    orderBy('timestamp', 'desc'),
    limit(10)
  );
  return onSnapshot(broadcastsQuery, (snapshot) => {
    const broadcasts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(broadcasts);
  });
};

// CS Announcements
export const updateCSAnnouncement = async (announcement: string) => {
  try {
    await setDoc(doc(db, 'gameState', 'csAnnouncement'), {
      message: announcement,
      lastUpdated: serverTimestamp(),
      isActive: announcement.trim() !== ''
    });
  } catch (error) {
    console.error('Error updating CS announcement:', error);
    throw error;
  }
};

export const subscribeToCSAnnouncement = (callback: (announcement: string) => void) => {
  return onSnapshot(doc(db, 'gameState', 'csAnnouncement'), (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback(data.isActive ? data.message : '');
    } else {
      callback('');
    }
  });
};
