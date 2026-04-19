import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Import dữ liệu từ file data.js bạn vừa tạo
import { productData } from '../data';

export default function Favourite() {
  // Dùng Javascript array.filter() để chỉ lấy những sản phẩm có isFavorite = true
  const favoriteItems = productData.filter(item => item.isFavorite);

  // Giao diện cho từng dòng sản phẩm
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemSize}>{item.size}</Text>
      </View>
      <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      <Text style={styles.arrowIcon}>{'>'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Tiêu đề */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorurite</Text>
      </View>
      <View style={styles.divider} />

      {/* Danh sách */}
      <FlatList
        data={favoriteItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Nút Add All To Cart */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>Add All To Cart</Text>
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
  
  itemContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20, paddingHorizontal: 20 },
  itemImage: { width: 60, height: 60, marginRight: 20 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#181725', marginBottom: 5 },
  itemSize: { fontSize: 14, color: '#7C7C7C' },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#181725', marginRight: 15 },
  arrowIcon: { fontSize: 20, color: '#181725', fontWeight: 'bold' },

  footer: { position: 'absolute', bottom: 20, left: 20, right: 20 },
  addBtn: { backgroundColor: '#53B175', borderRadius: 15, paddingVertical: 18, alignItems: 'center' },
  addBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});