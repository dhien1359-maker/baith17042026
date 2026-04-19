import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import tất cả màn hình
import Splash from './screens/Splash';
import Onboard from './screens/Onboard';
import SignIn from './screens/SignIn';
import Number from './screens/Number';
import Verification from './screens/Verification';
import SelectLocation from './screens/SelectLocation';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

import Home from './screens/Home';
import Explore from './screens/Explore';
import ProductDetail from './screens/ProductDetail';
import Beverages from './screens/Beverages';
import Favourite from './screens/Favourite';
import Cart from './screens/Cart';
import Search from './screens/Search';
import Filter from './screens/Filter';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const EmptyScreen = () => <View style={{ flex: 1, backgroundColor: 'white' }} />;

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#53B175', 
        tabBarInactiveTintColor: '#181725',
        tabBarStyle: { height: 70, paddingBottom: 10 },
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Shop') iconName = '🛒';
          else if (route.name === 'Explore') iconName = '🔍';
          else if (route.name === 'Cart') iconName = '🛍️';
          else if (route.name === 'Favourite') iconName = '❤️';
          else iconName = '👤';
          return <Text style={{ color, fontSize: 24 }}>{iconName}</Text>;
        },
      })}
    >
      <Tab.Screen name="Shop" component={Home} />
      {/* TRẢ LẠI MÀN EXPLORE CHO TAB ĐÁY */}
      <Tab.Screen name="Explore" component={Explore} /> 
      <Tab.Screen name="Cart" component={Cart} /> 
      <Tab.Screen name="Favourite" component={Favourite} />
      <Tab.Screen name="Account" component={EmptyScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboard" component={Onboard} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Number" component={Number} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="SelectLocation" component={SelectLocation} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MainApp" component={MainTabs} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Beverages" component={Beverages} />
        
        {/* ĐƯA MÀN SEARCH RA NGOÀI ĐÂY */}
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Filter" component={Filter} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}