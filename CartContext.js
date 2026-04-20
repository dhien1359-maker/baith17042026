import React, { createContext, useState, useEffect } from 'react';
import { saveCart, getCart } from './services/storageService';

// 1. Tạo ra cái Nhà kho
export const CartContext = createContext();

// 2. Tạo ra người quản lý Nhà kho (Provider)
export const CartProvider = ({ children }) => {
  // Biến lưu trữ danh sách hàng trong giỏ
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from AsyncStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await getCart();
        setCartItems(savedCart);
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCart();
  }, []);

  // Save cart to AsyncStorage whenever cartItems changes
  useEffect(() => {
    if (!isLoading) {
      saveCart(cartItems);
    }
  }, [cartItems, isLoading]);

  // Hàm thêm đồ vào giỏ với số lượng tùy chọn
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, cartQty: item.cartQty + quantity } : item
        );
      }
      return [...prevItems, { ...product, cartQty: quantity }];
    });
    alert(`Đã thêm ${product.name} vào giỏ hàng! 🛒`);
  };

  // Hàm tăng số lượng
  const increaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, cartQty: item.cartQty + 1 } : item
      )
    );
  };

  // Hàm giảm số lượng (nếu = 1 thì không cho giảm nữa)
  const decreaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === id && item.cartQty > 1 ? { ...item, cartQty: item.cartQty - 1 } : item
      )
    );
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  // Hàm xóa toàn bộ giỏ hàng
  const clearCart = () => {
    setCartItems([]);
  };

  // Cấp phát dữ liệu và hàm cho toàn bộ App sử dụng
  return (
    <CartContext.Provider value={{
      cartItems,
      setCartItems,
      addToCart,
      increaseQty,
      decreaseQty,
      removeItem,
      clearCart,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
};