import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack'
import CollectList from '../screens/CollectList'
import Scanner from '../screens/Scanner'
import ScannerExpo from '../screens/ScannerExpo'
import ItemList from '../screens/ItemList'

const Stack = createStackNavigator()

export default (props) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="CollectList"
            screenOptions={{headerShown:false}}
        >
          <Stack.Screen name="CollectList" component={CollectList} />
          <Stack.Screen name="ItemList" component={ItemList} />
          <Stack.Screen name="Scanner" component={ScannerExpo}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};
