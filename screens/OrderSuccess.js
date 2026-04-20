import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderSuccess({ navigation, route }) {
  const total = route.params?.total ?? 0;

  const handleTrackOrder = () => {
    navigation.navigate('Orders');
  };

  const handleBackHome = () => {
    navigation.navigate('MainApp', { screen: 'Shop' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.circleIcon}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
        <Text style={styles.title}>Your Order has been accepted</Text>
        <Text style={styles.subtitle}>
          Your items has been placed and is on its way to being processed.
        </Text>
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Order Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleTrackOrder}>
          <Text style={styles.primaryBtnText}>Track Order</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={handleBackHome}>
          <Text style={styles.secondaryBtnText}>Back to home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', justifyContent: 'space-between' },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 25, paddingTop: 40 },
  circleIcon: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#E6F6EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkMark: { fontSize: 72, color: '#53B175', fontWeight: '700' },
  title: { fontSize: 24, fontWeight: '700', color: '#181725', textAlign: 'center', marginBottom: 16 },
  subtitle: { fontSize: 16, color: '#7C7C7C', textAlign: 'center', lineHeight: 24, paddingHorizontal: 8 },
  totalCard: {
    backgroundColor: '#F6F8F9',
    borderRadius: 18,
    marginTop: 30,
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
  },
  totalLabel: { fontSize: 14, color: '#7C7C7C', marginBottom: 8 },
  totalValue: { fontSize: 28, fontWeight: '700', color: '#181725' },
  actions: { paddingHorizontal: 20, paddingBottom: 30 },
  primaryBtn: { backgroundColor: '#53B175', borderRadius: 16, paddingVertical: 16, alignItems: 'center', marginBottom: 14 },
  primaryBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },
  secondaryBtn: { borderWidth: 1, borderColor: '#53B175', borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  secondaryBtnText: { color: '#53B175', fontSize: 16, fontWeight: '700' },
});
