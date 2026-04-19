import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CheckboxItem = ({ label, isSelected, onPress }) => (
  <TouchableOpacity style={styles.checkboxRow} onPress={onPress}>
    <View style={[styles.checkbox, isSelected ? styles.checkboxSelected : null]}>
      {isSelected ? <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>✓</Text> : null}
    </View>
    <Text style={[styles.checkboxLabel, isSelected ? { color: '#53B175' } : null]}>{label}</Text>
  </TouchableOpacity>
);

export default function Filter({ navigation }) {
  const [categories, setCategories] = useState({ 'Eggs': true, 'Noodles & Pasta': false, 'Chips & Crisps': false, 'Fast Food': false });
  const [brands, setBrands] = useState({ 'Individual Collection': false, 'Cocola': true, 'Ifad': false, 'Kazi Farmas': false });

  const toggleCategory = (cat) => setCategories({ ...categories, [cat]: !categories[cat] });
  const toggleBrand = (brand) => setBrands({ ...brands, [brand]: !brands[brand] });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#181725' }}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        {Object.keys(categories).map(cat => (
          <CheckboxItem key={cat} label={cat} isSelected={categories[cat]} onPress={() => toggleCategory(cat)} />
        ))}

        <Text style={styles.sectionTitle}>Brand</Text>
        {Object.keys(brands).map(brand => (
          <CheckboxItem key={brand} label={brand} isSelected={brands[brand]} onPress={() => toggleBrand(brand)} />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.applyBtnText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F3F2' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: 20 },
  closeBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  contentContainer: { backgroundColor: 'white', paddingHorizontal: 20, paddingBottom: 100 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#181725', marginTop: 30, marginBottom: 20 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkbox: { width: 24, height: 24, borderRadius: 8, borderWidth: 1.5, borderColor: '#B3B3B3', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  checkboxSelected: { backgroundColor: '#53B175', borderColor: '#53B175' },
  checkboxLabel: { fontSize: 16, color: '#181725' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white', padding: 20, paddingBottom: 30, borderTopWidth: 1, borderColor: '#E2E2E2' },
  applyBtn: { backgroundColor: '#53B175', borderRadius: 15, paddingVertical: 18, alignItems: 'center' },
  applyBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});