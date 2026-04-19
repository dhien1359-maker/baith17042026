import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

export default function Splash({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => { navigation.navigate('Onboard'); }, 2500);
    return () => clearTimeout(timer);
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#53B175" />
      
      <View style={styles.textWrapper}>
        <Text style={styles.title}>nectar</Text>
        <Text style={styles.subtitle}>online groceries</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#53B175', justifyContent: 'center', alignItems: 'center' },
  textWrapper: { alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 60, color: '#fff', fontWeight: 'bold', letterSpacing: 2, marginBottom: -5 },
  subtitle: { fontSize: 16, color: '#fff', letterSpacing: 5, textAlign: 'center' }
});