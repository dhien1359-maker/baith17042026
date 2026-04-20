import React, { createContext, useState, useEffect } from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Trạng thái user của bạn
  const [appState, setAppState] = useState(AppState.currentState);
  
  // Thời gian hết hạn: Ví dụ 15 phút (tính bằng milliseconds)
  const EXPIRATION_TIME = 15 * 60 * 1000; 

  // Hàm đăng xuất
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('userToken'); // Xóa token đăng nhập nếu có
    await AsyncStorage.removeItem('last_active_time');
  };

  // Hàm kiểm tra thời gian hết hạn khi app khởi động lại hoàn toàn
  const checkSessionOnStart = async () => {
    try {
      const lastActiveTime = await AsyncStorage.getItem('last_active_time');
      if (lastActiveTime) {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - parseInt(lastActiveTime, 10);

        if (timeDiff > EXPIRATION_TIME) {
          // Quá hạn -> Xóa phiên đăng nhập
          logout();
        }
      }
    } catch (error) {
      console.log('Lỗi kiểm tra session:', error);
    }
  };

  useEffect(() => {
    // 1. Kiểm tra ngay khi app vừa được bật lên (khởi động từ đầu)
    checkSessionOnStart();

    // 2. Lắng nghe sự thay đổi khi app chuyển qua lại giữa Background và Foreground
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (
        appState.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App từ background quay lại màn hình chính -> Kiểm tra thời gian
        const lastActiveTime = await AsyncStorage.getItem('last_active_time');
        if (lastActiveTime) {
          const currentTime = new Date().getTime();
          const timeDiff = currentTime - parseInt(lastActiveTime, 10);

          if (timeDiff > EXPIRATION_TIME) {
            logout(); // Đăng xuất nếu quá giờ
          }
        }
      } else if (nextAppState === 'background' || nextAppState === 'inactive') {
        // App bị ẩn xuống hoặc thoát ra -> Lưu lại thời gian hiện tại
        const currentTime = new Date().getTime().toString();
        await AsyncStorage.setItem('last_active_time', currentTime);
      }

      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  // Các hàm khác của bạn (login, register...)
  const login = async (userData) => {
    setUser(userData);
    // Nhớ cập nhật thời gian hoạt động ngay khi đăng nhập thành công
    const currentTime = new Date().getTime().toString();
    await AsyncStorage.setItem('last_active_time', currentTime);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};