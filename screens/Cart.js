import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Import dữ liệu từ data.js
import { productData } from '../data';

export default function Cart() {
  // Lấy những sản phẩm đang có trong giỏ hàng và đưa vào State để dễ thao tác
  const initialCart = productData.filter(item => item.inCart);
  const [cartItems, setCartItems] = useState(initialCart);

  // Hàm tăng số lượng
  const increaseQty = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, cartQty: item.cartQty + 1 } : item
    ));
  };

  // Hàm giảm số lượng (nếu = 1 thì không cho giảm nữa)
  const decreaseQty = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id && item.cartQty > 1 ? { ...item, cartQty: item.cartQty - 1 } : item
    ));
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Tính tổng tiền
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.cartQty), 0);

  // Giao diện cho từng món hàng trong giỏ
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
      
      <View style={styles.itemInfo}>
        <View style={styles.titleRow}>
          <Text style={styles.itemName}>{item.name}</Text>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Text style={styles.removeIcon}>✕</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.itemSize}>{item.size}</Text>
        
        <View style={styles.priceRow}>
          {/* Cụm Tăng/Giảm số lượng */}
          <View style={styles.qtyContainer}>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => decreaseQty(item.id)}>
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.cartQty}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => increaseQty(item.id)}>
              <Text style={[styles.qtyBtnText, { color: '#53B175' }]}>+</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.itemPrice}>${(item.price * item.cartQty).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>
      <View style={styles.divider} />

      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Nút Thanh Toán */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutBtnText}>Go to Checkout</Text>
          <View style={styles.totalBadge}>
            <Text style={styles.totalBadgeText}>${totalAmount.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { alignItems: 'center', paddingVertical: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  divider: { height: 1, backgroundColor: '#E2E2E2', marginHorizontal: 20 },
  
  itemContainer: { flexDirection: 'row', paddingVertical: 20, paddingHorizontal: 20, alignItems: 'center' },
  itemImage: { width: 70, height: 70, marginRight: 20 },
  itemInfo: { flex: 1 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  removeIcon: { fontSize: 18, color: '#B3B3B3', fontWeight: 'bold' },
  itemSize: { fontSize: 14, color: '#7C7C7C', marginBottom: 15 },
  
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  qtyContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 35, height: 35, borderRadius: 12, borderWidth: 1, borderColor: '#E2E2E2', justifyContent: 'center', alignItems: 'center' },
  qtyBtnText: { fontSize: 20, color: '#B3B3B3', fontWeight: 'bold' },
  qtyText: { fontSize: 16, fontWeight: 'bold', color: '#181725', marginHorizontal: 15 },
  itemPrice: { fontSize: 18, fontWeight: 'bold', color: '#181725' },

  footer: { position: 'absolute', bottom: 20, left: 20, right: 20 },
  checkoutBtn: { backgroundColor: '#53B175', borderRadius: 15, paddingVertical: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  checkoutBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'center', marginLeft: 40 },
  totalBadge: { backgroundColor: '#489E67', borderRadius: 5, paddingVertical: 4, paddingHorizontal: 8, marginRight: 15 },
  totalBadgeText: { color: 'white', fontSize: 14, fontWeight: 'bold' }
});