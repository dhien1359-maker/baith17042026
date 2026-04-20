import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, AuthContext } from './AuthContext';
import { CartProvider } from './CartContext';

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
import Account from './screens/Account';
import Search from './screens/Search';
import Filter from './screens/Filter';
import Orders from './screens/Orders';
import OrderSuccess from './screens/OrderSuccess';
import OrderFailed from './screens/OrderFailed';

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
          else if (route.name === 'Account') iconName = '👤';
          return <Text style={{ color, fontSize: 24 }}>{iconName}</Text>;
        },
      })}
    >
      <Tab.Screen name="Shop" component={Home} />
      <Tab.Screen name="Explore" component={Explore} /> 
      <Tab.Screen name="Cart" component={Cart} /> 
      <Tab.Screen name="Favourite" component={Favourite} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const initialRouteName = user ? 'MainApp' : 'Splash';

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
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
      <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
      <Stack.Screen name="OrderFailed" component={OrderFailed} />
      <Stack.Screen name="Orders" component={Orders} />
      
      {/* ĐƯA MÀN SEARCH RA NGOÀI ĐÂY */}
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Filter" component={Filter} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}