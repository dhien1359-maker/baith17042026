import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartContext } from '../CartContext';

// DỮ LIỆU SẢN PHẨM: Đã liên kết trực tiếp với file ảnh thật trong assets của bạn
const exclusiveOffers = [
  { id: '1', name: 'Organic Bananas', price: '4.99', quantity: '7pcs, Priceg', image: require('../assets/banana.jpg') },
  { id: '2', name: 'Red Apple', price: '4.99', quantity: '1kg, Priceg', image: require('../assets/Red Apple.png') },
];

const bestSellers = [
  { id: '3', name: 'Bell Pepper Red', price: '4.99', quantity: '1kg, Priceg', image: require('../assets/bellpepper.png') },
  { id: '4', name: 'Ginger', price: '4.99', quantity: '250gm, Priceg', image: require('../assets/ginger.png') },
];

// COMPONENT DÙNG CHUNG: Cụm tiêu đề "Exclusive Offer" và "See all"
const SectionTitle = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
  </View>
);

// COMPONENT DÙNG CHUNG: Ô sản phẩm đơn (Product Card)
const ProductCard = ({ item, onPress, onAddToCart }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
    <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
    <Text style={styles.cardName}>{item.name}</Text>
    <Text style={styles.cardQuantity}>{item.quantity}</Text>
    <View style={styles.cardBottom}>
      <Text style={styles.cardPrice}>${item.price}</Text>
      <TouchableOpacity style={styles.addBtn} onPress={onAddToCart}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>+</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

export default function Home({ route, navigation }) {
  const { addToCart } = useContext(CartContext);

  // ĐÃ THÊM: Mở kiện hàng lấy 'location'
  const { location } = route.params || {};
  
  // ĐÃ THÊM: Kiểm tra xem có location không, nếu có thì dùng, không thì hiện mặc định
  const displayLocation = location ? location : 'Dhaka, Banasree';

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Header: Logo + Vị trí */}
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={{width: 30, height: 30, tintColor: '#F8A44C'}} resizeMode="contain" />
        <View style={styles.locationWrapper}>
          <Text style={{ fontSize: 16 }}>📍</Text>
          {/* ĐÃ SỬA: Gắn biến displayLocation vào đây */}
          <Text style={styles.locationText}>{displayLocation}</Text> 
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 2. Thanh tìm kiếm */}
        <View style={styles.searchWrapper}>
          <Text style={{ color: '#181725', fontSize: 18, marginRight: 10 }}>🔍</Text>
          <TextInput placeholder="Search Store" style={styles.searchInput} placeholderTextColor="#7C7C7C" />
        </View>

        {/* 3. Banner Quảng cáo (Ảnh bạn vừa gửi) */}
        <View style={styles.bannerContainer}>
          <Image source={require('../assets/banner.jpg')} style={styles.bannerImage} resizeMode="cover" />
        </View>

        {/* 4. Danh sách Exclusive Offer */}
        <SectionTitle title="Exclusive Offer" />
        <FlatList
          data={exclusiveOffers}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onPress={() => navigation.navigate('ProductDetail', { item })}
              onAddToCart={() => addToCart(item, 1)}
            />
          )}
          contentContainerStyle={{ paddingLeft: 20, paddingBottom: 20 }}
        />

        {/* 5. Danh sách Best Selling */}
        <SectionTitle title="Best Selling" />
        <FlatList
          data={bestSellers}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              item={item}
              onPress={() => navigation.navigate('ProductDetail', { item })}
              onAddToCart={() => addToCart(item, 1)}
            />
          )}
          contentContainerStyle={{ paddingLeft: 20, paddingBottom: 20 }}
        />
        
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { alignItems: 'center', marginVertical: 10 },
  locationWrapper: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  locationText: { fontSize: 18, fontWeight: 'bold', color: '#4C4F4D', marginLeft: 5 },
  searchWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F3F2', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 12, marginHorizontal: 20, marginBottom: 20 },
  searchInput: { flex: 1, fontSize: 16, color: '#181725', fontWeight: '600' },
  
  // Style cho Banner
  bannerContainer: { marginHorizontal: 20, marginBottom: 20, borderRadius: 15, overflow: 'hidden', height: 115 },
  bannerImage: { width: '100%', height: '100%' },
  
  // Style cho Cụm Tiêu đề
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#181725' },
  seeAll: { fontSize: 16, color: '#53B175', fontWeight: '600' },
  
  // Style cho Thẻ Sản phẩm
  card: { width: 170, height: 250, borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 18, padding: 15, marginRight: 15, justifyContent: 'space-between' },
  cardImage: { width: '100%', height: 100, marginBottom: 10 },
  cardName: { fontSize: 16, fontWeight: 'bold', color: '#181725', marginBottom: 5 },
  cardQuantity: { fontSize: 14, color: '#7C7C7C', marginBottom: 15 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardPrice: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  addBtn: { backgroundColor: '#53B175', width: 45, height: 45, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
});