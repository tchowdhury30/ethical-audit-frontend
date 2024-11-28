/* eslint-disable no-unused-vars */
import React from 'react';
import { LogBox, Text } from 'react-native';
import MainTabBar from './navigation/main_tab_bar';

// disable really annoying in app warnings
LogBox.ignoreAllLogs();

function App(props) {
  return <MainTabBar />;
}

export default App;
