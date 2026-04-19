import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { productData } from '../data';

export default function Search({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(productData || []); 

  const windowWidth = Dimensions.get('window').width;
  const cardWidth = (windowWidth - 60) / 2;

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (!productData) return; 
    
    const newData = productData.filter(item => {
      const itemData = item.name ? item.name.toLowerCase() : '';
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredData(newData);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.card, { width: cardWidth }]}>
      <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
      <Text style={styles.cardName}>{item.name}</Text>
      <Text style={styles.cardSize}>{item.size}</Text>
      <View style={styles.cardBottom}>
        <Text style={styles.cardPrice}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.searchWrapper}>
          <Text style={{ fontSize: 18, marginRight: 10 }}>🔍</Text>
          <TextInput 
            placeholder="Search Store" 
            style={styles.searchInput} 
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus={true}
          />
          {searchQuery !== '' ? (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Text style={{ fontSize: 16, color: '#7C7C7C' }}>✕</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        
        <TouchableOpacity style={styles.filterBtn} onPress={() => navigation.navigate('Filter')}>
          <Text style={{ fontSize: 20 }}>🎛️</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50, color: '#7C7C7C', fontSize: 16 }}>
            No products found matching
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  headerRow: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 10, marginBottom: 20, alignItems: 'center' },
  searchWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F3F2', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 12, marginRight: 15 },
  searchInput: { flex: 1, fontSize: 16, color: '#181725', fontWeight: '600' },
  filterBtn: { width: 50, height: 50, backgroundColor: '#F2F3F2', borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  card: { height: 250, borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 18, padding: 15, marginBottom: 15, justifyContent: 'space-between' },
  cardImage: { width: '100%', height: 90, marginBottom: 10 },
  cardName: { fontSize: 16, fontWeight: 'bold', color: '#181725', marginBottom: 5 },
  cardSize: { fontSize: 14, color: '#7C7C7C', marginBottom: 10 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  cardPrice: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  addBtn: { backgroundColor: '#53B175', width: 45, height: 45, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
});