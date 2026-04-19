import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function ProductDetail({ route, navigation }) {
  // Lấy dữ liệu sản phẩm được truyền từ màn Home hoặc Beverages
  // Nếu không có (do chạy test trực tiếp), dùng quả Táo làm mặc định
  const { item } = route.params || {};
  
  const product = item || {
    name: 'Naturel Red Apple',
    quantity: '1kg, Priceg', // Ở màn Home mình dùng trường quantity, ở Beverages dùng size
    size: '1kg, Price',
    price: '4.99',
    image: require('../assets/Red Apple.png')
  };

  // State để tăng giảm số lượng (tương tác vui vui cho giống thật)
  const [qty, setQty] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Header: Nút Back và Share */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 24, color: '#181725' }}>{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Text style={{ fontSize: 22, color: '#181725' }}>📤</Text> 
        </TouchableOpacity>
      </View>

      {/* Dùng ScrollView để nội dung có thể cuộn nếu dài */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* 2. Ảnh sản phẩm to bự */}
        <View style={styles.imageContainer}>
          <Image source={product.image} style={styles.productImage} resizeMode="contain" />
        </View>

        <View style={styles.content}>
          {/* 3. Tên sản phẩm & Nút tim (Yêu thích) */}
          <View style={styles.titleRow}>
            <Text style={styles.productName}>{product.name}</Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 24, color: '#7C7C7C' }}>♡</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.productSize}>{product.size || product.quantity}</Text>

          {/* 4. Bộ chọn số lượng & Giá tiền */}
          <View style={styles.priceRow}>
            <View style={styles.qtyContainer}>
              <TouchableOpacity onPress={() => qty > 1 && setQty(qty - 1)}>
                <Text style={styles.qtyBtn}>—</Text>
              </TouchableOpacity>
              <View style={styles.qtyBox}>
                <Text style={styles.qtyText}>{qty}</Text>
              </View>
              <TouchableOpacity onPress={() => setQty(qty + 1)}>
                <Text style={[styles.qtyBtn, { color: '#53B175' }]}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.productPrice}>${product.price}</Text>
          </View>

          {/* Đường kẻ ngang */}
          <View style={styles.divider} />

          {/* 5. Cụm Accordion (Product Detail) */}
          <View style={styles.accordionHeader}>
            <Text style={styles.accordionTitle}>Product Detail</Text>
            <Text style={styles.accordionIcon}>˅</Text>
          </View>
          <Text style={styles.description}>
            Apples Are Nutritious. Apples May Be Good For Weight Loss. Apples May Be Good For Your Heart. As Part Of A Healthful And Varied Diet.
          </Text>

          <View style={styles.divider} />

          {/* 6. Cụm Nutritions */}
          <View style={styles.accordionHeader}>
            <Text style={styles.accordionTitle}>Nutritions</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.badge}><Text style={styles.badgeText}>100gr</Text></View>
              <Text style={styles.accordionIcon}>›</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* 7. Cụm Review */}
          <View style={styles.accordionHeader}>
            <Text style={styles.accordionTitle}>Review</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#F3603F', fontSize: 18, marginRight: 10 }}>★★★★★</Text>
              <Text style={styles.accordionIcon}>›</Text>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* 8. Footer: Nút Add to Basket (Ghim ở đáy màn hình) */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.basketBtn}>
          <Text style={styles.basketBtnText}>Add To Basket</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10 },
  iconBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  
  imageContainer: { alignItems: 'center', justifyContent: 'center', height: 250, backgroundColor: '#F2F3F2', borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
  productImage: { width: '70%', height: '70%' },
  
  content: { paddingHorizontal: 20, paddingTop: 20 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productName: { fontSize: 24, fontWeight: 'bold', color: '#181725', flex: 1 },
  productSize: { fontSize: 16, color: '#7C7C7C', marginTop: 5, marginBottom: 20 },
  
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  qtyContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { fontSize: 24, color: '#B3B3B3', fontWeight: 'bold', paddingHorizontal: 15 },
  qtyBox: { borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 15, width: 45, height: 45, justifyContent: 'center', alignItems: 'center' },
  qtyText: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  productPrice: { fontSize: 24, fontWeight: 'bold', color: '#181725' },
  
  divider: { height: 1, backgroundColor: '#E2E2E2', marginVertical: 15 },
  
  accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  accordionTitle: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  accordionIcon: { fontSize: 20, color: '#181725', fontWeight: 'bold' },
  description: { fontSize: 14, color: '#7C7C7C', lineHeight: 22, marginTop: 10 },
  
  badge: { backgroundColor: '#EBEBEB', borderRadius: 5, paddingVertical: 3, paddingHorizontal: 8, marginRight: 15 },
  badgeText: { color: '#7C7C7C', fontSize: 12, fontWeight: 'bold' },
  
  footer: { position: 'absolute', bottom: 20, left: 20, right: 20 },
  basketBtn: { backgroundColor: '#53B175', borderRadius: 15, paddingVertical: 18, alignItems: 'center' },
  basketBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});