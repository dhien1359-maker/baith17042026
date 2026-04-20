import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderFailed({ navigation }) {
  const handleRetry = () => {
    navigation.goBack();
  };

  const handleBackHome = () => {
    navigation.navigate('MainApp', { screen: 'Shop' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.modalCard}>
          <TouchableOpacity style={styles.closeButton} onPress={handleBackHome}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>⚠️</Text>
          </View>
          <Text style={styles.title}>Oops! Order Failed</Text>
          <Text style={styles.subtitle}>Something went terribly wrong.</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={handleRetry}>
            <Text style={styles.retryBtnText}>Please Try Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.homeBtn} onPress={handleBackHome}>
            <Text style={styles.homeBtnText}>Back to home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(0,0,0,0.05)' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 18,
    right: 18,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: { fontSize: 18, color: '#7C7C7C' },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6F6EA',
    marginBottom: 24,
  },
  icon: { fontSize: 48 },
  title: { fontSize: 24, fontWeight: '700', color: '#181725', marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#7C7C7C', textAlign: 'center', marginBottom: 28, lineHeight: 24 },
  retryBtn: {
    width: '100%',
    backgroundColor: '#53B175',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  retryBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },
  homeBtn: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#53B175',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  homeBtnText: { color: '#53B175', fontSize: 16, fontWeight: '700' },
});
