import React, { useState } from 'react'; // ĐÃ THÊM: Import useState
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Image } from 'react-native';

export default function SelectLocation({ navigation }) {
  // ĐÃ THÊM: State để hứng chữ mà bạn sẽ gõ vào 2 ô input
  const [zone, setZone] = useState('');
  const [area, setArea] = useState('');

  // ĐÃ THÊM: Hàm xử lý gộp địa chỉ và chuyển trang
  const handleSubmit = () => {
    // Nếu có gõ chữ thì ghép lại, không gõ gì thì lấy mặc định
    const userLocation = (zone || area) ? `${zone}, ${area}` : 'Dhaka, Banasree';
    
    // Gửi cái userLocation này sang màn Login
    navigation.navigate('Login', { location: userLocation });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={{ fontSize: 24 }}>{'<'}</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Image 
          source={require('../assets/map.jpg')} 
          style={styles.mapIcon}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Select Your Location</Text>
        <Text style={styles.subtitle}>Switch on your location to stay in tune with what's happening in your area</Text>
        
        <Text style={styles.label}>Your Zone</Text>
        {/* ĐÃ SỬA: Gắn state vào để ô text biết bạn đang gõ cái gì */}
        <TextInput 
          style={styles.input} 
          placeholder="Banasree" 
          value={zone}
          onChangeText={setZone}
        />
        
        <Text style={styles.label}>Your Area</Text>
        {/* ĐÃ SỬA: Gắn state vào để ô text biết bạn đang gõ cái gì */}
        <TextInput 
          style={styles.input} 
          placeholder="Types of your area" 
          value={area}
          onChangeText={setArea}
        />
        
        {/* ĐÃ SỬA: Đổi hành động bấm nút thành gọi hàm handleSubmit */}
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 25 },
  backBtn: { marginTop: 20, marginBottom: 10 },
  content: { flex: 1, justifyContent: 'center' },
  mapIcon: { width: 225, height: 170, alignSelf: 'center', marginBottom: 30 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#181725', textAlign: 'center', marginBottom: 15 },
  subtitle: { fontSize: 16, color: '#7C7C7C', textAlign: 'center', marginBottom: 40 },
  label: { fontSize: 16, color: '#7C7C7C', fontWeight: 'bold', marginBottom: 10 },
  input: { borderBottomWidth: 1, borderColor: '#E2E2E2', paddingBottom: 10, fontSize: 18, color: '#181725', marginBottom: 30 },
  btn: { backgroundColor: '#53B175', borderRadius: 15, paddingVertical: 18, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});