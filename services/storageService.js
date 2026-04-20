import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage implementation that works on both web and native
const storage = {
  getItem: async (key) => {
    if (Platform.OS === 'web') {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        return null;
      }
    }
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.error('AsyncStorage getItem error:', e);
      return null;
    }
  },
  setItem: async (key, value) => {
    if (Platform.OS === 'web') {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.error('localStorage setItem error:', e);
      }
      return;
    }
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error('AsyncStorage setItem error:', e);
    }
  },
  removeItem: async (key) => {
    if (Platform.OS === 'web') {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error('localStorage removeItem error:', e);
      }
      return;
    }
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error('AsyncStorage removeItem error:', e);
    }
  },
  multiRemove: async (keys) => {
    for (const key of keys) {
      await storage.removeItem(key);
    }
  }
};

// Keys for AsyncStorage
const STORAGE_KEYS = {
  USER: 'user',
  CART: 'cart',
  ORDERS: 'orders',
};

// User Authentication Functions
export const saveUser = async (user) => {
  try {
    const jsonValue = JSON.stringify(user);
    await storage.setItem(STORAGE_KEYS.USER, jsonValue);
  } catch (e) {
    console.error('Error saving user:', e);
  }
};

export const getUser = async () => {
  try {
    const jsonValue = await storage.getItem(STORAGE_KEYS.USER);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error getting user:', e);
    return null;
  }
};

export const removeUser = async () => {
  try {
    await storage.removeItem(STORAGE_KEYS.USER);
  } catch (e) {
    console.error('Error removing user:', e);
  }
};

// Cart Functions
export const saveCart = async (cartItems) => {
  try {
    const jsonValue = JSON.stringify(cartItems);
    await storage.setItem(STORAGE_KEYS.CART, jsonValue);
  } catch (e) {
    console.error('Error saving cart:', e);
  }
};

export const getCart = async () => {
  try {
    const jsonValue = await storage.getItem(STORAGE_KEYS.CART);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error getting cart:', e);
    return [];
  }
};

export const clearCart = async () => {
  try {
    await storage.removeItem(STORAGE_KEYS.CART);
  } catch (e) {
    console.error('Error clearing cart:', e);
  }
};

// Orders Functions
export const saveOrder = async (order) => {
  try {
    const existingOrders = await getOrders();
    const newOrders = [...existingOrders, { ...order, id: Date.now().toString(), timestamp: new Date().toISOString() }];
    const jsonValue = JSON.stringify(newOrders);
    await storage.setItem(STORAGE_KEYS.ORDERS, jsonValue);
  } catch (e) {
    console.error('Error saving order:', e);
  }
};

export const getOrders = async () => {
  try {
    const jsonValue = await storage.getItem(STORAGE_KEYS.ORDERS);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error getting orders:', e);
    return [];
  }
};

export const clearOrders = async () => {
  try {
    await storage.removeItem(STORAGE_KEYS.ORDERS);
  } catch (e) {
    console.error('Error clearing orders:', e);
  }
};

// Clear all data (for logout)
export const clearAllData = async () => {
  try {
    await storage.multiRemove([STORAGE_KEYS.USER, STORAGE_KEYS.CART]);
  } catch (e) {
    console.error('Error clearing all data:', e);
  }
};