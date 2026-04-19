import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function SignIn({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/man_groceries.png')}
        style={styles.topImage}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <Text style={styles.title}>Get your groceries{'\n'}with nectar</Text>

        <TouchableOpacity
          style={styles.phoneInput}
          onPress={() => navigation.navigate('Number')}
        >
          <Text style={{ fontSize: 24, marginRight: 10 }}>🇻🇳</Text>
          <Text style={{ fontSize: 18, color: '#000' }}>+84</Text>
        </TouchableOpacity>

        <Text style={styles.or}>Or connect with social media</Text>

        <TouchableOpacity style={[styles.btn, styles.btnGoogle]}>
          <Text style={styles.btnText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.btnFacebook]}>
          <Text style={styles.btnText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  topImage: {
    width: '100%',
    height: 250,
    marginTop: -20,
  },
  content: {
    padding: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 30,
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E2E2E2',
    paddingBottom: 10,
    marginBottom: 40,
  },
  or: {
    textAlign: 'center',
    color: '#828282',
    marginBottom: 30,
  },
  btn: {
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 15,
  },
  btnGoogle: {
    backgroundColor: '#d1351d',
  },
  btnFacebook: {
    backgroundColor: '#1877F2',
  },
  btnText: {
    color: '#f2f2f2',
    fontSize: 18,
    fontWeight: 'bold',
  },
});