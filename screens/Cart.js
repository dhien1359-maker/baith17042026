import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartContext } from '../CartContext';
import { saveOrder } from '../services/storageService';

export default function Cart({ navigation }) {
  const { cartItems, increaseQty, decreaseQty, removeItem, clearCart } = useContext(CartContext);
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const availableMoney = 100;

  // Tính tổng tiền
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.cartQty), 0);

  // Mở modal Checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Giỏ hàng trống', 'Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.');
      return;
    }
    setCheckoutVisible(true);
  };

  const handlePlaceOrder = async () => {
    if (totalAmount > availableMoney) {
      setCheckoutVisible(false);
      const rootNavigation = navigation.getParent ? navigation.getParent() : navigation;
      rootNavigation.navigate('OrderFailed');
      return;
    }

    const order = {
      items: cartItems,
      total: totalAmount,
      date: new Date().toLocaleString()
    };

    try {
      await saveOrder(order);
      clearCart();
      setCheckoutVisible(false);
      const rootNavigation = navigation.getParent ? navigation.getParent() : navigation;
      rootNavigation.navigate('OrderSuccess', { total: totalAmount });
    } catch (error) {
      setCheckoutVisible(false);
      const rootNavigation = navigation.getParent ? navigation.getParent() : navigation;
      rootNavigation.navigate('OrderFailed');
    }
  };

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
              <Text style={styles.qtyBtnText}>+</Text>
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
      <View style={styles.balanceBox}>
        <Text style={styles.balanceLabel}>Available balance</Text>
        <Text style={styles.balanceValue}>${availableMoney.toFixed(2)}</Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutBtnText}>Go to Checkout</Text>
          <View style={styles.totalBadge}>
            <Text style={styles.totalBadgeText}>${totalAmount.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal visible={checkoutVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <Pressable style={styles.overlayPress} onPress={() => setCheckoutVisible(false)} />
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Checkout</Text>
              <TouchableOpacity onPress={() => setCheckoutVisible(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.modalRow} onPress={() => {}}>
              <View>
                <Text style={styles.modalLabel}>Delivery</Text>
                <Text style={styles.modalValue}>Select Method</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalRow} onPress={() => {}}>
              <View>
                <Text style={styles.modalLabel}>Payment</Text>
                <Text style={styles.modalValue}>Credit card</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalRow} onPress={() => {}}>
              <View>
                <Text style={styles.modalLabel}>Promo Code</Text>
                <Text style={styles.modalValue}>Pick discount</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <View style={styles.modalRow}>
              <View>
                <Text style={styles.modalLabel}>Total Cost</Text>
              </View>
              <Text style={styles.modalValue}>${totalAmount.toFixed(2)}</Text>
            </View>

            <Text style={styles.modalNotice}>
              By placing an order you agree to our Terms And Conditions
            </Text>

            <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder}>
              <Text style={styles.placeOrderBtnText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  totalBadgeText: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  overlayPress: { flex: 1 },
  modalContainer: { backgroundColor: 'white', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20, paddingBottom: 30 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#181725' },
  closeIcon: { fontSize: 24, color: '#181725' },
  modalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  modalLabel: { fontSize: 16, color: '#181725', fontWeight: '600' },
  modalValue: { fontSize: 16, color: '#7C7C7C', marginTop: 4 },
  chevron: { fontSize: 24, color: '#7C7C7C' },
  modalNotice: { fontSize: 12, color: '#7C7C7C', lineHeight: 18, marginTop: 20, marginBottom: 20 },
  placeOrderBtn: { backgroundColor: '#53B175', borderRadius: 15, paddingVertical: 18, alignItems: 'center' },
  placeOrderBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  balanceBox: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F6F8F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: { fontSize: 14, color: '#7C7C7C' },
  balanceValue: { fontSize: 18, fontWeight: '700', color: '#181725' }
});