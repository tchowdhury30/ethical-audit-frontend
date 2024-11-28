import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CompanyDetailScreen from '../components/company_detail';
import PopularSeeAll from '../components/popular';
import BoycottSeeAll from '../components/boycott';
import BackButton from '../components/back_button';
import Homepage from '../components/homepage';
import ProductDetailScreen from '../components/product_detail';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Homepage"
        component={Homepage}
        options={({}) => ({
          headerShown: false,
        })}
      />

      {/* todo: change back button icon & font */}
      <Stack.Screen name="CompanyDetail"
        component={CompanyDetailScreen}
        options={({ navigation }) => ({
          headerLeft: () => <BackButton navigation={navigation} />,
          title: `Company Overall`,
          headerTitleStyle: {
            fontSize: 14.5,
            fontWeight: 'normal',
        }})}
      />

      <Stack.Screen name="PopularSeeAll"
        component={PopularSeeAll}
        options={({ route, navigation }) => ({
          title: `Ethical ${route.params.category} Companies`,
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleStyle: {
            fontSize: 14.5,
            fontWeight: 'normal',
          }})}
        />

      <Stack.Screen name="BoycottSeeAll"
        component={BoycottSeeAll}
        options={({ navigation }) => ({
          title: `Non-Ethical Companies`,
          headerLeft: () => <BackButton navigation={navigation} />,
          headerTitleStyle: {
            fontSize: 14.5,
            fontWeight: 'normal',
          }})}
        />

      <Stack.Screen name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={({ navigation }) => ({
          headerLeft: () => < BackButton navigation={navigation} />,
          title: `Company Details`,
          headerTitleStyle: {
            fontSize: 14.5,
            fontWeight: 'normal',
        }})}
      />

    </Stack.Navigator>
  );
};

export default HomeStack;
