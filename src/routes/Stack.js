import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ItemList from "../screens/ItemList";
import Scanner from "../screens/ScannerExpo";
import Drawer from './Drawer'

const Stack = createStackNavigator();

export default (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="CollectList"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="CollectList" component={Drawer} />
        <Stack.Screen name="ItemList" component={ItemList} />
        <Stack.Screen name="Scanner" component={Scanner} />
      </Stack.Navigator>
    </View>
  );
};
