import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
// ĐÃ FIX: Đổi import SafeAreaView sang thư viện mới cho hết cảnh báo vàng
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../AuthContext';

// ĐÃ THÊM: Khai báo thêm 'route' để nhận dữ liệu
export default function Login({ route, navigation }) {
  
  // ĐÃ THÊM: Mở kiện hàng lấy 'location' từ SelectLocation truyền sang
  const { location } = route.params || {};
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    await login({
      email: 'demo@nectar.com',
      location,
      loginTime: new Date().toISOString(),
    });
    navigation.navigate('MainApp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={require('../assets/logo.png')} 
        style={styles.logoIcon}
        resizeMode="contain"
      />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Enter your emails and password</Text>
      
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="user@email.com" keyboardType="email-address" />
      
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} secureTextEntry={true} placeholder="********" />
      
      <TouchableOpacity style={{alignItems: 'flex-end', marginBottom: 30}}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      
      {/* ĐÃ FIX: Sửa lại đoạn onPress này để xách theo location đi tiếp vào Home */}
      <TouchableOpacity 
        style={styles.btn} 
        onPress={handleLogin}
      >
        <Text style={styles.btnText}>Log In</Text>
      </TouchableOpacity>
      
      <Text style={styles.signupText}>
        Don't have an account? <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>Signup</Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 25, justifyContent: 'center' },
  logoIcon: { width: 50, height: 50, alignSelf: 'center', marginBottom: 40 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#181725', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#7C7C7C', marginBottom: 40 },
  label: { fontSize: 16, color: '#7C7C7C', fontWeight: 'bold', marginBottom: 10 },
  input: { borderBottomWidth: 1, borderColor: '#E2E2E2', paddingBottom: 10, fontSize: 18, color: '#181725', marginBottom: 30 },
  forgot: { color: '#181725', fontSize: 14 },
  btn: { backgroundColor: '#53B175', borderRadius: 15, paddingVertical: 18, alignItems: 'center', marginBottom: 20 },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  signupText: { textAlign: 'center', fontSize: 14, color: '#181725', fontWeight: '600' },
  signupLink: { color: '#53B175' }
});