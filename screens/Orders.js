import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getOrders } from '../services/storageService';
import { AuthContext } from '../AuthContext';

export default function Orders({ navigation }) {
  const [orders, setOrders] = useState([]);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const savedOrders = await getOrders();
        setOrders(savedOrders.reverse()); // Hiển thị đơn mới nhất trước
      } catch (error) {
        console.error('Error loading orders:', error);
        Alert.alert('Lỗi', 'Không thể tải danh sách đơn hàng.');
      }
    };
    loadOrders();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đăng xuất',
          style: 'destructive',
          onPress: async () => {
            await logout();
            // Reset navigation stack về màn Login sau khi logout
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
  };

  const renderOrder = ({ item }) => (
    <View style={styles.orderContainer}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Đơn hàng #{item.id.slice(-6)}</Text>
        <Text style={styles.orderDate}>{new Date(item.timestamp).toLocaleString()}</Text>
      </View>
      <View style={styles.orderItems}>
        {item.items.map((product, index) => (
          <View key={index} style={styles.orderItem}>
            <Text style={styles.itemName}>{product.name}</Text>
            <Text style={styles.itemQty}>x{product.cartQty}</Text>
            <Text style={styles.itemPrice}>${(product.price * product.cartQty).toFixed(2)}</Text>
          </View>
        ))}
      </View>
      <View style={styles.orderTotal}>
        <Text style={styles.totalText}>Tổng cộng: ${item.total.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>
      <View style={styles.divider} />

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Chưa có đơn hàng nào</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={renderOrder}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          contentContainerStyle={{ paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20 },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backBtnText: { fontSize: 24, color: '#181725', lineHeight: 24 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  divider: { height: 1, backgroundColor: '#E2E2E2', marginHorizontal: 20 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#7C7C7C' },
  orderContainer: {
    backgroundColor: '#F8F8F8',
    margin: 15,
    borderRadius: 10,
    padding: 15,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderId: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  orderDate: { fontSize: 14, color: '#7C7C7C' },
  orderItems: { marginBottom: 10 },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemName: { flex: 1, fontSize: 14, color: '#181725' },
  itemQty: { fontSize: 14, color: '#53B175', marginHorizontal: 10 },
  itemPrice: { fontSize: 14, fontWeight: 'bold', color: '#181725' },
  orderTotal: {
    borderTopWidth: 1,
    borderTopColor: '#E2E2E2',
    paddingTop: 10,
    alignItems: 'flex-end',
  },
  totalText: { fontSize: 16, fontWeight: 'bold', color: '#53B175' },
  logoutContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  logoutBtn: {
    backgroundColor: '#FF0000',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  logoutBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});