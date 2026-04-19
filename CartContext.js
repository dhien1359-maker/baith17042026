import React, { createContext, useState } from 'react';

// 1. Tạo ra cái Nhà kho
export const CartContext = createContext();

// 2. Tạo ra người quản lý Nhà kho (Provider)
export const CartProvider = ({ children }) => {
  // Biến lưu trữ danh sách hàng trong giỏ
  const [cartItems, setCartItems] = useState([]);

  // Hàm thêm đồ vào giỏ
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Kiểm tra xem món này đã có trong giỏ chưa
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Có rồi thì cộng thêm 1
        return prevItems.map(item =>
          item.id === product.id ? { ...item, cartQty: item.cartQty + 1 } : item
        );
      }
      // Chưa có thì thêm mới vào giỏ với số lượng là 1
      return [...prevItems, { ...product, cartQty: 1 }];
    });
    // Báo hiệu một câu cho vui khi bấm nút
    alert(`Đã thêm ${product.name} vào giỏ hàng! 🛒`);
  };

  // Cấp phát dữ liệu và hàm cho toàn bộ App sử dụng
  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};