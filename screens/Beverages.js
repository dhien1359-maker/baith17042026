import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartContext } from '../CartContext';

// DỮ LIỆU ĐỒ UỐNG: Liên kết với file ảnh thực tế
const beveragesData = [
  { id: '1', name: 'Diet Coke', size: '355ml, Price', price: '1.99', image: require('../assets/DietCoke.png') },
  { id: '2', name: 'Sprite Can', size: '325ml, Price', price: '1.50', image: require('../assets/SpriteCan.png') },
  { id: '3', name: 'Apple & Grape\nJuice', size: '2L, Price', price: '15.99', image: require('../assets/Applegrape.png') },
  { id: '4', name: 'Orenge Juice', size: '2L, Price', price: '15.99', image: require('../assets/OrengeJuice.png') }, // Giữ nguyên tên file có chữ 'e' của bạn
  { id: '5', name: 'Coca Cola Can', size: '325ml, Price', price: '4.99', image: require('../assets/CocaColaCan.png') },
  { id: '6', name: 'Pepsi Can', size: '330ml, Price', price: '4.99', image: require('../assets/PepsiCan.png') },
];

export default function Beverages({ navigation }) {
  const { addToCart } = useContext(CartContext);
  const windowWidth = Dimensions.get('window').width;
  const cardWidth = (windowWidth - 60) / 2; // Căn đều 2 thẻ trên 1 hàng

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Header có nút Back và Filter */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 24, color: '#181725' }}>{'<'}</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Beverages</Text>
        
        <TouchableOpacity style={styles.headerBtn}>
          {/* Tạm dùng text thay icon filter */}
          <Text style={{ fontSize: 20, color: '#181725', fontWeight: 'bold' }}>≑</Text> 
        </TouchableOpacity>
      </View>

      {/* 2. Danh sách sản phẩm (Lưới 2 cột) */}
      <FlatList
        data={beveragesData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.card, { width: cardWidth }]}
            // Khi bấm vào sản phẩm sẽ truyền data qua màn ProductDetail
            onPress={() => navigation.navigate('ProductDetail', { item })}
          >
            <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
            <Text style={styles.cardName}>{item.name}</Text>
            <Text style={styles.cardSize}>{item.size}</Text>
            <View style={styles.cardBottom}>
              <Text style={styles.cardPrice}>${item.price}</Text>
              <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item, 1)}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>+</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  
  // Style Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 10, marginBottom: 20 },
  headerBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  
  // Style Thẻ Sản phẩm (Tương tự thẻ ở Home.js nhưng set height lại cho cân đối)
  card: { height: 250, borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 18, padding: 15, marginBottom: 15, justifyContent: 'space-between' },
  cardImage: { width: '100%', height: 90, marginBottom: 10 },
  cardName: { fontSize: 16, fontWeight: 'bold', color: '#181725', marginBottom: 5 },
  cardSize: { fontSize: 14, color: '#7C7C7C', marginBottom: 10 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  cardPrice: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  addBtn: { backgroundColor: '#53B175', width: 45, height: 45, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
});