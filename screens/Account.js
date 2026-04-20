import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../AuthContext';

const menuItems = [
  { id: 'orders', label: 'Orders' },
  { id: 'details', label: 'My Details' },
  { id: 'address', label: 'Delivery Address' },
  { id: 'payment', label: 'Payment Methods' },
  { id: 'promo', label: 'Promo Code' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'help', label: 'Help' },
  { id: 'about', label: 'About' },
];

export default function Account({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const displayName = user?.name || 'Afsar Hossen';
  const displayEmail = user?.email || 'imshuvo97@gmail.com';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Account</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitials}>{displayName.split(' ').map(n => n[0]).join('').slice(0, 2)}</Text>
          </View>
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{displayName}</Text>
              <Text style={styles.editIcon}>✎</Text>
            </View>
            <Text style={styles.email}>{displayEmail}</Text>
          </View>
        </View>

        <View style={styles.menuCard}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => {
                if (item.id === 'orders') {
                  navigation.navigate('Orders');
                }
              }}
            >
              <Text style={styles.menuText}>{item.label}</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F7' },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#181725', marginBottom: 20 },
  profileCard: { backgroundColor: 'white', borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 20, elevation: 4 },
  avatarPlaceholder: { width: 70, height: 70, borderRadius: 22, marginRight: 15, backgroundColor: '#53B175', justifyContent: 'center', alignItems: 'center' },
  avatarInitials: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  profileInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  editIcon: { marginLeft: 10, fontSize: 16, color: '#53B175' },
  email: { fontSize: 14, color: '#7C7C7C' },
  menuCard: { backgroundColor: 'white', borderRadius: 20, paddingVertical: 10, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 20, elevation: 4 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  menuText: { fontSize: 16, color: '#181725' },
  menuArrow: { fontSize: 18, color: '#7C7C7C' },
  logoutBtn: { marginTop: 25, backgroundColor: '#fff', borderRadius: 18, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 20, elevation: 4 },
  logoutText: { fontSize: 16, fontWeight: 'bold', color: '#53B175' },
});
