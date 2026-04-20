import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NumberScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNext = () => {
    if (phoneNumber.length >= 9) {
      navigation.navigate('Verification', { phoneNumber: '+84' + phoneNumber });
    } else {
      alert('Vui lòng nhập số điện thoại hợp lệ');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={{ fontSize: 24 }}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Enter your mobile number</Text>
      <Text style={styles.label}>Mobile Number</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.flag}>🇻🇳 +84</Text>
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          autoFocus={true}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          maxLength={10}
        />
      </View>
      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={[styles.fab, phoneNumber.length >= 9 && { backgroundColor: '#53B175' }]}
          onPress={handleNext}
          disabled={phoneNumber.length < 9}
        >
          <Text style={styles.fabText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 25 },
  backBtn: { marginTop: 20, marginBottom: 40 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#181725', marginBottom: 30 },
  label: { fontSize: 16, color: '#7C7C7C', marginBottom: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#E2E2E2', paddingBottom: 10 },
  flag: { fontSize: 18, marginRight: 10, color: '#181725' },
  input: { flex: 1, fontSize: 18, color: '#181725' },
  fabContainer: { flex: 1, justifyContent: 'center', alignItems: 'flex-end' },
  fab: { backgroundColor: '#53B175', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  fabText: { color: '#fff', fontSize: 24, fontWeight: 'bold' }
});