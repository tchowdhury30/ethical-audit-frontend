import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
    StyleSheet, Image,
    View,
  } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NotifierWrapper } from 'react-native-notifier';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import About from '../components/about';
import Scanner from '../components/scanner';
import HomeStack from './home_stack';

const styles = StyleSheet.create({
    icon: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'left',
      textAlign: 'center',
      width: 25,
      height: 25,
      paddingTop: 20,
      marginTop: 15,
      marginBottom: 10,
    },
    scanIcon: {
        width: 25,
        height: 25,
    },
    scanContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor:'#7A00E6',
        paddingRight: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        shadowColor: '#7A00E6',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.50,
        shadowRadius: 12,
        elevation: 20,
        marginBottom: 20,
    }
  });

const Tab = createBottomTabNavigator();

const MainTabBar = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            <NotifierWrapper>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <Tab.Navigator
                            initialRouteName="Home"
                            screenOptions={({ route }) => ({
                                tabBarIcon: ({ focused, color, size }) => {
                                    if (route.name === 'Home') {
                                        return <Image source={require('../assets/images/home.png')} style={styles.icon} resizeMode="contain" />
                                    } else if (route.name === 'Scanner') {
                                        return <View style={styles.scanContainer}><Image source={require('../assets/images/scan.png')} style={styles.scanIcon} resizeMode="contain" /></View>
                                    } else if (route.name === 'About') {
                                        return <Image source={require('../assets/images/info.png')} style={styles.icon} resizeMode="contain" /> 
                                    }
                                },
                                tabBarActiveTintColor: '#7A00E6',
                                tabBarInactiveTintColor: 'grey',
                                headerShown: false,
                                tabBarStyle: { height: 80 },
                            })}
                        >
                            <Tab.Screen name="Home" component={HomeStack} />
                            <Tab.Screen name="Scanner" component={Scanner} />
                            <Tab.Screen name="About" component={About} />
                        </Tab.Navigator>
                    </NavigationContainer>
                </SafeAreaProvider>
            </NotifierWrapper>
        </GestureHandlerRootView>
    );
};

export default MainTabBar;
