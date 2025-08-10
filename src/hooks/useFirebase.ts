import { useState, useEffect, useCallback } from 'react';
import {
  User,
  BettingActivity,
  ChatMessage,
  WithdrawalRequest,
  ServerTimer,
  subscribeToUsers,
  subscribeToBettingActivities,
  subscribeToChatMessages,
  subscribeToWithdrawalRequests,
  subscribeToServerTimers,
  subscribeToCSAnnouncement,
  subscribeToBroadcasts,
  createUser,
  updateUser,
  deleteUser,
  createBettingActivity,
  updateBettingActivity,
  sendChatMessage,
  createWithdrawalRequest,
  updateWithdrawalRequest,
  updateServerTimers,
  sendBroadcastMessage,
  updateCSAnnouncement,
  uploadImage
} from '../services/firebaseService';

// Hook for user management
export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToUsers((updatedUsers) => {
      setUsers(updatedUsers);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const addUser = useCallback(async (userData: Omit<User, 'id' | 'createdAt'>) => {
    try {
      return await createUser(userData);
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  }, []);

  const editUser = useCallback(async (userId: string, updates: Partial<User>) => {
    try {
      await updateUser(userId, updates);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }, []);

  const removeUser = useCallback(async (userId: string) => {
    try {
      await deleteUser(userId);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }, []);

  return {
    users,
    loading,
    addUser,
    editUser,
    removeUser
  };
};

// Hook for betting activities
export const useBettingActivities = () => {
  const [activities, setActivities] = useState<BettingActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToBettingActivities((updatedActivities) => {
      setActivities(updatedActivities);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const addBettingActivity = useCallback(async (activityData: Omit<BettingActivity, 'id' | 'timestamp'>) => {
    try {
      return await createBettingActivity(activityData);
    } catch (error) {
      console.error('Error adding betting activity:', error);
      throw error;
    }
  }, []);

  const updateActivity = useCallback(async (activityId: string, updates: Partial<BettingActivity>) => {
    try {
      await updateBettingActivity(activityId, updates);
    } catch (error) {
      console.error('Error updating betting activity:', error);
      throw error;
    }
  }, []);

  return {
    activities,
    loading,
    addBettingActivity,
    updateActivity
  };
};

// Hook for chat messages
export const useChatMessages = (userId: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = subscribeToChatMessages(userId, (updatedMessages) => {
      setMessages(updatedMessages);
      setLoading(false);
    });

    return unsubscribe;
  }, [userId]);

  const sendMessage = useCallback(async (messageData: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    try {
      return await sendChatMessage(messageData);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }, []);

  const uploadChatImage = useCallback(async (file: File, userId: string) => {
    try {
      const path = `chat-images/${userId}/${Date.now()}_${file.name}`;
      return await uploadImage(file, path);
    } catch (error) {
      console.error('Error uploading chat image:', error);
      throw error;
    }
  }, []);

  return {
    messages,
    loading,
    sendMessage,
    uploadChatImage
  };
};

// Hook for withdrawal requests
export const useWithdrawalRequests = () => {
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToWithdrawalRequests((updatedWithdrawals) => {
      setWithdrawals(updatedWithdrawals);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const addWithdrawalRequest = useCallback(async (withdrawalData: Omit<WithdrawalRequest, 'id' | 'timestamp'>) => {
    try {
      return await createWithdrawalRequest(withdrawalData);
    } catch (error) {
      console.error('Error creating withdrawal request:', error);
      throw error;
    }
  }, []);

  const updateWithdrawal = useCallback(async (withdrawalId: string, updates: Partial<WithdrawalRequest>) => {
    try {
      await updateWithdrawalRequest(withdrawalId, updates);
    } catch (error) {
      console.error('Error updating withdrawal request:', error);
      throw error;
    }
  }, []);

  return {
    withdrawals,
    loading,
    addWithdrawalRequest,
    updateWithdrawal
  };
};

// Hook for server timers
export const useServerTimers = () => {
  const [timers, setTimers] = useState<ServerTimer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToServerTimers((updatedTimers) => {
      setTimers(updatedTimers);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const updateTimers = useCallback(async (newTimers: ServerTimer) => {
    try {
      await updateServerTimers(newTimers);
    } catch (error) {
      console.error('Error updating server timers:', error);
      throw error;
    }
  }, []);

  return {
    timers,
    loading,
    updateTimers
  };
};

// Hook for broadcasts
export const useBroadcasts = () => {
  const [broadcasts, setBroadcasts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToBroadcasts((updatedBroadcasts) => {
      setBroadcasts(updatedBroadcasts);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const sendBroadcast = useCallback(async (message: string, sender: string) => {
    try {
      await sendBroadcastMessage(message, sender);
    } catch (error) {
      console.error('Error sending broadcast:', error);
      throw error;
    }
  }, []);

  return {
    broadcasts,
    loading,
    sendBroadcast
  };
};

// Hook for CS announcements
export const useCSAnnouncement = () => {
  const [announcement, setAnnouncement] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToCSAnnouncement((updatedAnnouncement) => {
      setAnnouncement(updatedAnnouncement);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const updateAnnouncement = useCallback(async (newAnnouncement: string) => {
    try {
      await updateCSAnnouncement(newAnnouncement);
    } catch (error) {
      console.error('Error updating CS announcement:', error);
      throw error;
    }
  }, []);

  return {
    announcement,
    loading,
    updateAnnouncement
  };
};
