import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
/* Screens */
import Profile from '../Screens/Profile';
import Settings from '../Screens/Settings';
import Home from '../Screens/Home';
import Notifications from '../Screens/Notifications';
/* Assets */
import colors from '../assets/colors';
/* Icons */
import { Ionicons } from '@expo/vector-icons';
/* Theme Related */
import themeContext from '../context/themeContext';
import { useContext } from 'react';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const theme = useContext(themeContext);
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: theme.white,
          height: 95,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          elevation: 15,
          shadowOffset: { width: 0, height: -2 },
          position: 'absolute',
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          marginBottom: 0,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let iconWrapperColor;

          if (route.name === 'Home') {
            iconName = 'home-sharp';
          } else if (route.name === 'Settings') {
            iconName = 'settings-sharp';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else if (route.name === 'Notifications') {
            iconName = 'notifications';
          }
          color = focused ? '#fff' : theme.iconGray;
          iconWrapperColor = focused ? theme.purple : theme.white;

          // Returning Icon for Tab
          return (
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: iconWrapperColor },
              ]}
            >
              <Ionicons name={iconName} size={30} color={color} />
            </View>
          );
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Profile' component={Profile} />
      <Tab.Screen name='Notifications' component={Notifications} />
      <Tab.Screen name='Settings' component={Settings} />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderRadius: 10,
  },
});
